# coding: utf-8

# In[99]:

import pandas as pd
from pandas import Series
from pandas import DataFrame
import numpy as np
from sklearn import svm
from copy import deepcopy

import matplotlib   
import matplotlib.pyplot as plt


# In[33]:

#LocName:城市名字，cap:装机容量（MW）,eff：效率（0-100）
#P1:单个光伏板容量（W）,size:单个光伏板面积（平方米）
#X_type:安装类型，0代表固定式，1代表斜单轴，2代表双轴
#输出结果为（首年发电收益（万元））
def get_benefit(LocName,cap,eff,P1,size,X_type):
    row_temp=loc_info[loc_info['city'].isin([LocName])]
    [im,ep]=row_temp[['Im_fixed','elec_price']].values[0]
    X_dict={0:1.0,1:1.23,2:1.39}
    pv_num=cap*1000000/float(P1)
    pv_area=pv_num*size
    elec=pv_area*im*X_dict[X_type]*eff/100.0/3.6
    revenue_fy=elec*ep/10000.0
    return revenue_fy
## benefit(u'上海',10,18,300,1.95,0)

#LocName:城市名字，cap:装机容量（MW）,eff：效率（0-100）
#P1:单个光伏板容量（W）,Y1:单个光伏板价格（元）
#P2:单个逆变器容量（KW）,Y2：单个逆变器价格（万元）
#X_type:安装类型，0代表固定式，1代表斜单轴，2代表双轴
#输出结果为（总成本，（光伏组件成本，安装与施工成本，土地成本））
def get_cost(LocName,cap,eff,P1,Y1,X_type,P2=500,Y2=20.0):
    X = {0:0,1:0.88,2:1.84}
    lati = float(loc_info[loc_info['city'].isin([LocName])]['latitude'].values[0][:-1])
    Y3 = loc_info[loc_info['city'].isin([LocName])]['land_price'].values[0]
    la=list(area_df['latitude'])
    ef=list(area_df['efficiency'])
    z0=list(area_df['fixed'])
    z1=list(area_df['s_axis_oblique'])
    z2=list(area_df['d_axis'])
    z = {0:z0,1:z1,2:z2}
    la_combine=[]
    for i in range(len(la)):
        la_combine.append([la[i],ef[i]])
    la_x = la_combine
    y = z[X_type]
    clf = svm.SVR()
    clf.fit(la_x, y) 
    #SVR(C=1.0, cache_size=200, coef0=0.0, degree=3, epsilon=0.1, gamma='auto',kernel='rbf', max_iter=-1, shrinking=True, tol=0.001, verbose=False)
    A1 = clf.predict([[lati,eff]])[0]
    D1=round(cap*1000000.0/float(P1))*Y1/10000.0
    D2=round(cap*1000.0/float(P2))*Y2
    c1=0.68*(D1+D2)/0.56+0.12*(D1+D2)*X[X_type]/0.56
    c2=0.175*c1/0.68
    c3=cap*A1*Y3/10.0
    s=c1+c2+c3
    return (s,(c1,c2,c3))
## cost(u'上海',10.0,18.0,300.0,1450.0,2)
#get_cost(u'沱沱河',10.0,18.0,300.0,1450.0,0)
#get_cost(u'沱沱河',10.0,18.0,300.0,1450.0,1)
#get_cost(u'沱沱河',10.0,18.0,300.0,1450.0,2)

#LocName:城市名字
#输出结果为（【弃光风险指数，弃光率】，【GDP指数，用电量指数，弃光词频指数】）
def get_risk(LocName):
    row_temp=loc_info[loc_info['city'].isin([LocName])]
    gdp_ec_aw=row_temp[['GDP','elec_consumption','ab_words']].values[0]
    risk_ratio=row_temp[['ab_risk','ab_ratio']].values[0]
    return [risk_ratio,gdp_ec_aw]
## risk(u'上海')

def get_score(benefit,cost,risk,abandon_light):
    abandon_light_dict={-1:0.25,0:1,1:4}   ### consider abandon_light less==-1,normal==0,more==1
    abandon_light_coef=abandon_light_dict[abandon_light]
    score=benefit/float(cost)*(1-abandon_light_coef*risk[0]*risk[1])*400
    return score


# In[36]:




# In[37]:

def initial_score(city_list,cap,abandon_light,eff,P1,Y1,size,P2,Y2,X_type,loc_info):
    Score = []
    for city in city_list:
        CityBenefit=get_benefit(city,cap,eff,P1,size,X_type)
        CityCost=get_cost(city,cap,eff,P1,Y1,X_type,P2,Y2)[0]
        CityRisk=get_risk(city)[0]
        CityScore=get_score(CityBenefit,CityCost,CityRisk,abandon_light)
        Score.append(CityScore)
    score_df=DataFrame()
    score_df['city_name']=city_list
    score_df['Score']=Score
    
    X=list(loc_info['longitude'])
    Y=[float(i[:-1]) for i in list(loc_info['latitude'])]
    score_df['X']=X
    score_df['Y']=Y
    score_df=score_df.sort_values(by ='Score',ascending=False)
    return score_df
def cal_down_ratio(isdf,round_num):
    source_df=deepcopy(isdf)
    source_df.index=range(len(source_df['X']))
    xmax=list(source_df['X'])[round_num]
    ymax=list(source_df['Y'])[round_num]
    xms=Series([xmax]*len(source_df['X']))
    yms=Series([ymax]*len(source_df['Y']))
    distance=((source_df['X']-xms)*(source_df['X']-xms)+(source_df['Y']-yms)*(source_df['Y']-yms)).apply(np.sqrt)
    distance=distance/max(distance)

    beta=100000
    alpha=0.5

    betaSeires=Series([beta]*len(distance))
    ratioSeries=1-alpha*np.power(betaSeires,distance*(-1))
    ratioSeries=list(ratioSeries)
    ratioSeries[round_num]=1
    return ratioSeries
def show_top(score_Series,num):
    score_Series=score_Series.sort_values(by ='Score',ascending=False)
    show_x=list(score_Series['X'])[:num]
    show_y=list(score_Series['Y'])[:num]
    plt.scatter(show_x[1:],show_y[1:],c='b',s=50)
    plt.scatter([show_x[0]],[show_y[0]],c='r',s=50)
    plt.xlim(70,140)
    plt.ylim(15,55)
    
def final_score(city_list,cap,loc_num,abandon_light,eff,P1,Y1,size,P2,Y2,X_type,loc_info):
    #city_list=list(loc_info['city'])[:]
    loc_num=min([loc_num,len(city_list)])
    isdf=initial_score(city_list,cap,abandon_light,eff,P1,Y1,size,P2,Y2,X_type,loc_info)
    for i in range(loc_num):
        ratioSeries=cal_down_ratio(isdf[['X','Y']],i)
        isdf['decrease_ratio']=ratioSeries
        isdf['Score']=isdf['Score']*isdf['decrease_ratio']
        isdf=isdf.sort_values(by ='Score',ascending=False)
    out_cityname=list(isdf['city_name'])[:loc_num]
    out_XY=[[list(isdf['X'])[i],list(isdf['Y'])[i]] for i in range(loc_num)]
    return [out_cityname,out_XY]
    #show_top(isdf,15)


# In[ ]:

##############右侧可视化数据####################
def final_info(LocName,cap,loc_num,abandon_light,eff,P1,Y1,size,P2,Y2,X_type,loc_info,im365_df):
    all_info={}

    #区域基本信息：省份，名称，经度，纬度，海拔，属于几类资源区，现行上网电价为
    def basic_info(LocName):
        info_list=loc_info[loc_info['city'].isin([LocName])][['province','city','longitude','latitude','altitude','elec_price']].values[0]
        temp_f={0.65:1,0.75:2,0.85:3}
        info_dict={'province':info_list[0],'city':info_list[1],'longitude':u'%.2fE'%info_list[2],'latitude':info_list[3],'altitude':info_list[4],'resource_type':temp_f[info_list[5]],'elec_price':info_list[5]}
        return info_dict
    basic_info_dict=basic_info(LocName)
    all_info['basic_info']=basic_info_dict

    #辐照资源高于全国 x% 的区域
    #工业地价低于全国 y% 的区域
    #弃光率在 z %，处于合理水平 （高于5%则是出于高弃光率地区）
    def compare_info(LocName):
        im_local=loc_info[loc_info['city'].isin([LocName])]['Im_fixed'].values[0]
        land_price_local=loc_info[loc_info['city'].isin([LocName])]['land_price'].values[0]
        ab_ratio_local=loc_info[loc_info['city'].isin([LocName])]['ab_ratio'].values[0]
        GDP_local=loc_info[loc_info['city'].isin([LocName])]['GDP'].values[0]
        elec_consumption_local=loc_info[loc_info['city'].isin([LocName])]['elec_consumption'].values[0]
        temp_list=sorted(list(loc_info['Im_fixed']))
        x_ratio=temp_list.index(im_local)/360.0
        temp_list=sorted(list(loc_info['land_price']))
        y_ratio=1-temp_list.index(land_price_local)/360.0
        z_ratio=ab_ratio_local

        temp_list=sorted(list(loc_info['GDP']))
        g_ratio=temp_list.index(GDP_local)/360.0
        temp_list=sorted(list(loc_info['elec_consumption']))
        c_ratio=temp_list.index(elec_consumption_local)/360.0

        return [x_ratio*100.0,y_ratio*100.0,z_ratio*100.0,g_ratio*100.0,c_ratio*100.0]

    [x_ratio,y_ratio,z_ratio,g_ratio,c_ratio]=compare_info(LocName)
    all_info['radar']={'sunshine':x_ratio,'land_price':y_ratio,'abandon':100-3.0*z_ratio,'GDP':c_ratio}

    if x_ratio>80.0:
        x_info=u"该地辐照资源较好，发电收益较高，推荐选用，辐照资源高于全国%.2f%%的区域。"%x_ratio
    elif x_ratio>40.0:
        x_info=u"该地辐照资源一般，发电收益一般，可结合当地电价及补贴综合考虑，辐照资源高于全国%.2f%%的区域。"%x_ratio
    else:
        x_info=u"该地辐照资源偏弱，发电收益较低，请谨慎选用，若其他因素突出，仍可以选用，辐照资源低于全国%.2f%%的区域。"%(100.0-x_ratio)

    if y_ratio>80.0:
        y_info=u"该地工业用地地价较低，推荐选用，适宜建设大规模地面光伏电站，平均工业用地地价低于全国%.2f%%的区域。"%y_ratio
    elif y_ratio>40.0:
        y_info=u"该地工业用地地价一般，请结合具体拍卖地块进行考虑，平均工业用地地价低于全国%.2f%%的区域。"%y_ratio
    else:
        y_info=u"该地工业用地地价较高，请谨慎选用，建议考虑建设屋顶分布式光伏，平均工业用地地价高于全国%.2f%%的区域。"%(100.0-y_ratio)

    if z_ratio>8.0:
        z_info=u"该地弃光风险较高，发电收益可能因无法上网而有所损失，请谨慎选用，现有弃光率为%.2f%%。"%z_ratio
    elif z_ratio>3:
        z_info=u"该地弃光风险一般，可结合当地GDP和用电量以及正在修建的电力外送通道综合考虑，现有弃光率为%.2f%%。"%z_ratio
    else:
        z_info=u"该地弃光风险较低，光伏发电基本都能上网，推荐选用，现有弃光率为%.2f%%。"%z_ratio

    if g_ratio>60.0 and c_ratio>60.0:
        gc_info=u"该地GDP总量及增长率、用电量总量及增长率都处于较高水平，对于目前未能上网的光伏发电比较有利，弃光率将呈下降趋势，即使现有弃光率较高，也可以考虑建站。"
    elif g_ratio<30.0 and c_ratio<30.0:
        gc_info=u"该地GDP总量及增长率、用电量总量及增长率处于中游水平，弃光情况一般不会改善也不会恶化，维持现有水平。"
    else:
        gc_info=u"该地GDP总量及增长率、用电量总量及增长率处于较低水平，当地经济发展可能较为缓慢，如果大规模建设光伏电站，弃光率可能进一步增长。"

    all_info['x_info']=x_info
    all_info['y_info']=y_info
    all_info['z_info']=z_info
    all_info['gc_info']=gc_info

    #年发电收益：
    benefit=get_benefit(LocName,cap,eff,P1,size,X_type)
    benefit_info=u"首年发电收益%.1f万元，由于光致衰退效应，3-10年收益可能为首年的90%%，10-25年间为首年的80%%。"%benefit
    all_info['benefit_info']=benefit_info

    #年发电曲线：
    #波动率： 低于全国 X% 的区域
    def im365(LocName):
        imlist=im365_df[im365_df['city'].isin([LocName])][range(1,366)].values[0] 
        fluc=im365_df[im365_df['city'].isin([LocName])]['fluc'].values[0] 
        temp_list=sorted(list(im365_df['fluc']))
        fluc_ratio=1-temp_list.index(fluc)/360.0
        return [imlist,fluc_ratio*100]  ## imlist中共365个数值 根据它画出1年的发电曲线 ；发电波动率高于全国 fluc_ratio % 的区域
    [imlist,fluc_ratio]=im365(LocName)

    if fluc_ratio>65.0:
        fluc_info=u"主要由于当地天气阴晴不定，造成当地光伏发电波动较大，可预测性较差，可能对电网造成冲击，光伏发电波动率高于全国%.2f%%的区域"%fluc_ratio
    elif fluc_ratio>35.0:
        fluc_info=u"当地光伏发电波动处于中游水平，处于合理范围，可能对电网造成较小冲击，光伏发电波动率高于全国%.2f%%的区域"%fluc_ratio
    else:
        fluc_info=u"当地光伏发电波动处于较低水平，比较平稳，可预测性较强，不易对电网造成冲击，更容易被电网消纳，光伏发电波动率低于全国%.2f%%的区域"%(1-fluc_ratio)
    all_info['fluc_info']=fluc_info
    all_info['imlist']=imlist

    #总建站成本：
    #建站成本构成饼图
    [total_cost,[c1,c2,c3]]=get_cost(LocName,cap,eff,P1,Y1,X_type,P2,Y2)  ## cost[0]为总成本 cost[1]为一个list 第一项为光伏组件成本 第二项为安装施工成本 第三项为土地成本
    if c3/total_cost>0.5:
        cost_info=u"总建站成本%.1f万元。该地的平均工业用地地价较高，建站土地成本比例过高，可结合具体地块价格进行建站决策，也可考虑转为屋顶分布式光伏。"%total_cost
    elif c3/total_cost>0.3:
        cost_info=u"总建站成本%.1f万元。建站土地成本比例适中，处于合理水平，可以适当地考虑采用较贵但是效率更高的光伏组件，有效减少相同装机容量下的占地面积。"%total_cost
    else:
        cost_info=u"总建站成本%.1f万元。建站土地成本比例较低，比较适合建设大规模地面光伏电站，且推荐采用便宜、占地面积大的多晶组件。"%total_cost
    all_info['cost_info']=cost_info
    all_info['cost']={'modules':c1,'construction':c2,'land':c3}

    #该区域不同安装方式及组件的投资回收期
    #顺序是：本项目的投资回收期；单晶-固定；单晶-斜单轴；单晶-双轴；多晶-固定；多晶-斜单轴；多晶-双轴；
    def payback_period(LocName,cap,total_cost,benefit):
        cbd=total_cost/benefit
        s_f=get_cost(LocName,cap,18,300,1450,0)[0]/get_benefit(LocName,cap,18,300,1.94,0)
        s_o=get_cost(LocName,cap,18,300,1450,1)[0]/get_benefit(LocName,cap,18,300,1.94,1)
        s_d=get_cost(LocName,cap,18,300,1450,2)[0]/get_benefit(LocName,cap,18,300,1.94,2)
        m_f=get_cost(LocName,cap,16,255,854,0)[0]/get_benefit(LocName,cap,16,255,1.82,0)
        m_o=get_cost(LocName,cap,16,255,854,1)[0]/get_benefit(LocName,cap,16,255,1.82,1)
        m_d=get_cost(LocName,cap,16,255,854,2)[0]/get_benefit(LocName,cap,16,255,1.82,2)
        return [cbd,s_f,s_o,s_d,m_f,m_o,m_d]
    [cbd,s_f,s_o,s_d,m_f,m_o,m_d]=payback_period(LocName,cap,total_cost,benefit)
    if min([cbd,s_f,s_o,s_d,m_f,m_o,m_d])<5.0:
        payback_info=u"投资回收期限较短，可以较快速地收回建站成本，推荐考虑更高效率的光伏组件，以及安装追踪系统，这可能会导致投资回收期稍稍增长，但未来每年可以获得更多收益。"
    if min([cbd,s_f,s_o,s_d,m_f,m_o,m_d])<8.0:
        payback_info=u"投资回收期限适中，处于平均水准，建议结合具体地块以及当地补贴进行综合考量，以上因素会较大地影响投资回收期限。"
    else:
        payback_info=u"投资回收期限偏长，可能是由于当地平均工业用地地价过高而导致，不推荐建设大型地面光伏电站，可以转考虑屋顶分布式光伏等。"
    all_info['payback_period']={'cbd':cbd,'s_f':s_f,'s_o':s_o,'s_d':s_d,'m_f':m_f,'m_o':m_o,'m_d':m_d}
    all_info['payback_info']=payback_info
    return all_info


if __name__ == "__main__":

    # 以下默认读入项
    loc_info=pd.read_excel('loc_info_finale.xlsx')
    area_df=pd.read_excel('Area_PVStation.xlsx')
    im365_df=pd.read_excel('loc_im_365.xlsx')
    pv_module_dist={0:[16,255,854,1.82],1:[18,300,1450,1.94],2:[17.12,280,1008,1.635],3:[16.9,275,855,1.627],4:[16.99,330,1155,1.942],5:[17.27,335,1075,1.94],6:[15.7,305,1067.5,1.942],7:[17.53,340,1020,1.94],8:[16.51,270,972,1.635],9:[16.51,270,972,1.635]}
    X_type_dist={0:0,1:1,2:2} #安装类型，0代表固定式，1代表斜单轴，2代表双轴
    abandon_light_dist={0:0,1:1,2:-1} # 弃光因素重视程度 不重视弃光影响value==-1,正常考虑弃光影响value==0,非常重视弃光影响value==1
    P2=500   #单个逆变器容量（KW）,
    Y2=20   #单个逆变器价格（万元）
    X_type=0   #安装类型，0代表固定式，1代表斜单轴，2代表双轴


    # step1: 载入顶部的用户输入项
    cap=10  #装机容量（MW）
    loc_num=15   #单次最大推荐数量
    [eff,P1,Y1,size]=pv_module_dist[0]   #input:index 0-9; return:[效率（0-100），单个光伏板容量（W）,单个光伏板价格（元），单个光伏板面积（平方米）]
    X_type=X_type_dist[0] # 安装方式 input:index 0-2
    abandon_light=abandon_light_dist[0] #弃光因素重视程度 input:index 0-2


    # step2: 选择省份or画圈，得到区域内的城市名
    city_list=list(loc_info['city'])[:]  #这里选择了所有城市


    # step3: 获得排名前loc_num的推荐结果，【城市名称，经纬度】
    [cityname,XY]=final_score(city_list,cap,loc_num,abandon_light,eff,P1,Y1,size,P2,Y2,X_type,loc_info)


    # step4: 显示单个地点信息
    LocName=cityname[0]   #这里选取排名第一的城市名称
    all_info=final_info(LocName,cap,loc_num,abandon_light,eff,P1,Y1,size,P2,Y2,X_type,loc_info,im365_df)

    # # 显示顺序
    # #--------------------------------------------------

    # all_info['basic_info']   # 数据用来填充：基本信息表
    #     all_info['basic_info']['city']   #地点名称
    #     all_info['basic_info']['province']   #省份
    #     all_info['basic_info']['altitude']    #海拔
    #     all_info['basic_info']['longitude']    #经度
    #     all_info['basic_info']['latitude']    #纬度
    #     all_info['basic_info']['resource_type']    #资源区类型
    #     all_info['basic_info']['elec_price']     #上网电价
        
    # #--------------------------------------------------

    # all_info['radar']   #数据用来画：雷达图
    #     all_info['radar']['sunshine']  # 辐照资源得分
    #     all_info['radar']['land_price']  # 工业用地地价得分
    #     all_info['radar']['abandon']  # 减少弃光得分
    #     all_info['radar']['GDP']  # 现有弃光消纳能力得分
    # all_info['x_info']   #辐照信息
    # all_info['y_info']   #地价信息
    # all_info['z_info']   #弃光信息
    # all_info['gc_info']   #GDP用电量信息

    # #--------------------------------------------------

    # all_info['imlist']   #数据用来画：年发电曲线图
    # all_info['benefit_info']   #收益信息
    # all_info['fluc_info']   # 发电波动信息

    # #--------------------------------------------------

    # all_info['cost']   #数据用来画：成本饼图
    #     all_info['cost']['modules']   # 组件及逆变器成本
    #     all_info['cost']['construction']#安装及施工成本
    #     all_info['cost']['land']   #土地成本
    # all_info['cost_info']   #成本信息

    # #--------------------------------------------------

    # all_info['payback_period']   #数据用来画：投资回收期限直方图
    #     all_info['payback_period']['cbd']   # 当前参数下投资回收期限
    #     all_info['payback_period']['s_f']   #  典型单晶固定式安装
    #     all_info['payback_period']['s_o']   # 典型单晶斜单轴追踪
    #     all_info['payback_period']['s_d']   # 典型单晶双轴追踪
    #     all_info['payback_period']['m_f']   # 典型多晶固定式安装
    #     all_info['payback_period']['m_o']   # 典型多晶斜单轴追踪
    #     all_info['payback_period']['m_d']   # 典型多晶双轴追踪
    # all_info['payback_info']   #投资期限信息

    # #--------------------------------------------------
