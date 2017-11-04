/**
 * Created by 滩涂上的芦苇 on 2017/5/9.
 */
var myChart = echarts.init(document.getElementById('main'));
var btChart = echarts.init(document.getElementById('bt'));
var zztChart =echarts.init(document.getElementById('zzt'));
var zxtChart = echarts.init(document.getElementById('rfdqx'));
var radarChart = echarts.init(document.getElementById('radar'));

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value:geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

function showMap() {
    var option = {
        title: {
            text: '该条件下推荐排名靠前的城市',
            left: 'center'
        },
        // tooltip : {
        //     trigger: 'item'
        // },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x:'right',
            data:['city'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#364f6b',
                    borderColor: '#fff'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series : [
            {
                name: 'city',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: 10,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            }//,
            // {
            //     name: 'Top 10',
            //     type: 'effectScatter',
            //     coordinateSystem: 'geo',
            //     data:convertData(data),
            //     symbolSize: 10,
            //     showEffectOn: 'render',
            //     rippleEffect: {
            //         brushType: 'stroke'
            //     },
            //     hoverAnimation: true,
            //     label: {
            //         normal: {
            //             formatter: '{b}',
            //             position: 'right',
            //             show: true
            //         }
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: '#f4e925',
            //             shadowBlur: 10,
            //             shadowColor: '#333'
            //         }
            //     },
            //     zlevel: 1
            // }
        ]
    };

    myChart.setOption(option);
}

var tempData = null;
myChart.on('click', function (params) {
    for (var i = 0; i < data.length; i++) {
        if(data[i].name == params.name)
        {
            tempData = data[i];
            tempName = data[i].name;
            document.getElementById('name').innerHTML = data[i].name;
            document.getElementById('province').innerHTML = data[i].province;
            document.getElementById('altitude').innerHTML = data[i].altitude.toString();
            document.getElementById('elePrice').innerHTML = data[i].elePrice.toString();
            document.getElementById('latitude').innerHTML = data[i].latitude.toString();
            document.getElementById('longitude').innerHTML = data[i].longitude.toString();
            document.getElementById('type').innerHTML = data[i].type.toString();
            document.getElementById('fz').innerHTML = "·".concat(data[i].fz.toString());
            document.getElementById('dj').innerHTML = "·".concat(data[i].dj.toString());
            document.getElementById('qgl').innerHTML ="·".concat(data[i].qgl.toString());
            document.getElementById('fd').innerHTML = "·".concat(data[i].fd.toString());
            document.getElementById('bdl').innerHTML = "·".concat(data[i].bdl.toString());
            document.getElementById('cb').innerHTML = "·".concat(data[i].cb.toString());
            document.getElementById('gdp').innerHTML = "·".concat(data[i].gdp.toString());
            document.getElementById('hsqx').innerHTML = "·".concat(data[i].hsqx.toString());
            var option1 = {
                title: {
                    text: '建站成本构成',
                    left: 'center',
                    top: 20
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 0,
                    max: 15000,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'成本构成',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:data[i].zj, name:'组件及逆变器成本'},
                            {value:data[i].sg, name:'施工成本'},
                            {value:data[i].td, name:'土地成本'}
                        ],
                        itemStyle: {
                            normal: {
                                color: '#3fc1c9',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            btChart.setOption(option1);

            var option2 = {
                title: {
                    text: '不同安装方式投资回收期',
                    left: 'center',
                    top: 20
                },
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['单晶固定', '单晶斜单轴', '单晶双轴', '多晶固定', '多晶斜单轴', '多晶双轴'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'投资回收期（年）',
                        type:'bar',
                        barWidth: '60%',
                        data:[data[i].singlegd, data[i].singlexdz, data[i].singlesz, data[i].multigd, data[i].multixdz, data[i].multisz]
                    }
                ]
            };
            zztChart.setOption(option2);

            var base = +new Date(2016, 11, 31);
            var oneDay = 24 * 3600 * 1000;
            var dates = [];

            var datas = data2[data[i].name];

            for (var j = 1; j < 365; j++) {
                var now = new Date(base += oneDay);
                dates.push([now.getMonth() + 1, now.getDate()].join('/'));
                datas.push(datas[j - 1]);
            }

            var option3 = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                title: {
                    left: 'center',
                    text: '日发电曲线',
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: dates
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                // dataZoom: [{
                //     type: 'inside',
                //     start: 0,
                //     end: 100
                // }, {
                //     start: 0,
                //     end: 100,
                //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                //     handleSize: '80%',
                //     handleStyle: {
                //         color: '#fff',
                //         shadowBlur: 3,
                //         shadowColor: 'rgba(0, 0, 0, 0.6)',
                //         shadowOffsetX: 2,
                //         shadowOffsetY: 2
                //     }
                // }],
                series: [
                    {
                        name:'日发电量',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: 'rgb(255, 70, 131)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            }
                        },
                        data: datas
                    }
                ]
            };
            zxtChart.setOption(option3);

            var test = data[i].radar;

            var option4 = {
                tooltip: {},
                name:{
                  textStyle:{
                      color:'#000',
                      fontSize:14
                  }
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: '辐照资源得分', max: 100},
                        { name: '现有弃光得分', max: 100},
                        { name: '弃光消纳得分', max: 100},
                        { name: '工业地价得分', max: 100}
                    ]
                },
                series: [{
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            value : data[i].radar
                        }
                    ]
                }]
            };
            radarChart.setOption(option4);

        }
    }
});

/**
 * Created by 滩涂上的芦苇 on 2017/8/6.
 */
function toCompare() {
    $('#normal').hide();
    $('#normalButton').hide();
    $('#compare').show();
    $('#compareButton').show();
    showLeft();
    showRight();
}

function toNormal() {
    $('#compare').hide();
    $('#compareButton').hide();
    $('#normal').show();
    $('#normalButton').show();
}

cart = new Object();
cart.left = null;
cart.right = null;
cart.num = 0;
cart.clear = function () {
    cart.left = null;
    cart.right = null;
    cart.num = 0;
};

function addList() {
    if(tempData == null) return;
    switch (cart.num)
    {
        case 0:
        {
            cart.left = tempData;
            tempData = null;
            cart.num++;
            break;
        }
        case 1:
        {
            cart.right = tempData;
            tempData = null;
            cart.num++;
            break;
        }
        case 2:
        {
            cart.clear();
            cart.left = tempData;
            tempData = null;
            cart.num++;
            break;
        }
    }
}

function showLeft() {
    var btChart1 = echarts.init(document.getElementById('bt1'));
    var zztChart1 =echarts.init(document.getElementById('zzt1'));
    var zxtChart1 = echarts.init(document.getElementById('rfdqx1'));
    var radarChart1 = echarts.init(document.getElementById('radar1'));
    if(cart.left != null)
    {
        document.getElementById('name1').innerHTML = cart.left.name;
        document.getElementById('province1').innerHTML = cart.left.province;
        document.getElementById('altitude1').innerHTML = cart.left.altitude.toString();
        document.getElementById('elePrice1').innerHTML = cart.left.elePrice.toString();
        document.getElementById('latitude1').innerHTML = cart.left.latitude.toString();
        document.getElementById('longitude1').innerHTML = cart.left.longitude.toString();
        document.getElementById('type1').innerHTML = cart.left.type.toString();
        document.getElementById('fz1').innerHTML = (cart.left.fz*100).toFixed(2).toString();
        document.getElementById('dj1').innerHTML = (cart.left.dj*100).toFixed(2).toString();
        document.getElementById('qgl1').innerHTML = (cart.left.qgl*100).toFixed(2).toString();
        document.getElementById('fd1').innerHTML = cart.left.fd.toFixed(2).toString();
        document.getElementById('bdl1').innerHTML = (cart.left.bdl*100).toFixed(2).toString();
        document.getElementById('cb1').innerHTML = cart.left.cb.toFixed(2).toString();
        var option1 = {
            title: {
                text: '建站成本构成',
                left: 'center',
                top: 20
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
            },

            visualMap: {
                show: false,
                min: 0,
                max: 15000,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'成本构成',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:cart.left.zj, name:'组件及逆变器成本'},
                        {value:cart.left.sg, name:'施工成本'},
                        {value:cart.left.td, name:'土地成本'}
                    ],
                    itemStyle: {
                        normal: {
                            color: '#3fc1c9',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        btChart1.setOption(option1);

        var option2 = {
            title: {
                text: '不同安装方式投资回收期',
                left: 'center',
                top: 20
            },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['单晶固定', '单晶斜单轴', '单晶双轴', '多晶固定', '多晶斜单轴', '多晶双轴'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'投资回收期（年）',
                    type:'bar',
                    barWidth: '60%',
                    data:[cart.left.singlegd, cart.left.singlexdz, cart.left.singlesz, cart.left.multigd, cart.left.multixdz, cart.left.multisz]
                }
            ]
        };
        zztChart1.setOption(option2);

        var base = +new Date(2016, 11, 31);
        var oneDay = 24 * 3600 * 1000;
        var dates = [];

        var datas = data2[cart.left.name];

        for (var j = 1; j < 365; j++) {
            var now = new Date(base += oneDay);
            dates.push([now.getMonth() + 1, now.getDate()].join('/'));
            datas.push(datas[j - 1]);
        }

        var option3 = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '日发电曲线',
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dates
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            // dataZoom: [{
            //     type: 'inside',
            //     start: 0,
            //     end: 100
            // }, {
            //     start: 0,
            //     end: 100,
            //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            //     handleSize: '80%',
            //     handleStyle: {
            //         color: '#fff',
            //         shadowBlur: 3,
            //         shadowColor: 'rgba(0, 0, 0, 0.6)',
            //         shadowOffsetX: 2,
            //         shadowOffsetY: 2
            //     }
            // }],
            series: [
                {
                    name:'日发电量',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: datas
                }
            ]
        };
        zxtChart1.setOption(option3);

        var test = cart.left.radar;

        var option4 = {
            tooltip: {},
            name:{
                textStyle:{
                    color:'#000',
                    fontSize:14
                }
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: '辐照资源得分', max: 100},
                    { name: '现有弃光得分', max: 100},
                    { name: '弃光消纳得分', max: 100},
                    { name: '工业地价得分', max: 100}
                ]
            },
            series: [{
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : cart.left.radar
                    }
                ]
            }]
        };
        radarChart1.setOption(option4);

    }
}

function showRight() {
    var btChart2 = echarts.init(document.getElementById('bt2'));
    var zztChart2 =echarts.init(document.getElementById('zzt2'));
    var zxtChart2 = echarts.init(document.getElementById('rfdqx2'));
    var radarChart2 = echarts.init(document.getElementById('radar2'));
    if(cart.right != null)
    {
        document.getElementById('name2').innerHTML = cart.right.name;
        document.getElementById('province2').innerHTML = cart.right.province;
        document.getElementById('altitude2').innerHTML = cart.right.altitude.toString();
        document.getElementById('elePrice2').innerHTML = cart.right.elePrice.toString();
        document.getElementById('latitude2').innerHTML = cart.right.latitude.toString();
        document.getElementById('longitude2').innerHTML = cart.right.longitude.toString();
        document.getElementById('type2').innerHTML = cart.right.type.toString();
        document.getElementById('fz2').innerHTML = (cart.right.fz*100).toFixed(2).toString();
        document.getElementById('dj2').innerHTML = (cart.right.dj*100).toFixed(2).toString();
        document.getElementById('qgl2').innerHTML = (cart.right.qgl*100).toFixed(2).toString();
        document.getElementById('fd2').innerHTML = cart.right.fd.toFixed(2).toString();
        document.getElementById('bdl2').innerHTML = (cart.right.bdl*100).toFixed(2).toString();
        document.getElementById('cb2').innerHTML = cart.right.cb.toFixed(2).toString();
        var option1 = {
            title: {
                text: '建站成本构成',
                left: 'center',
                top: 20
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
            },

            visualMap: {
                show: false,
                min: 0,
                max: 15000,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'成本构成',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:cart.right.zj, name:'组件及逆变器成本'},
                        {value:cart.right.sg, name:'施工成本'},
                        {value:cart.right.td, name:'土地成本'}
                    ],
                    itemStyle: {
                        normal: {
                            color: '#3fc1c9',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        btChart2.setOption(option1);

        var option2 = {
            title: {
                text: '不同安装方式投资回收期',
                left: 'center',
                top: 20
            },
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['单晶固定', '单晶斜单轴', '单晶双轴', '多晶固定', '多晶斜单轴', '多晶双轴'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'投资回收期（年）',
                    type:'bar',
                    barWidth: '60%',
                    data:[cart.right.singlegd, cart.right.singlexdz, cart.right.singlesz, cart.right.multigd, cart.right.multixdz, cart.right.multisz]
                }
            ]
        };
        zztChart2.setOption(option2);

        var base = +new Date(2016, 11, 31);
        var oneDay = 24 * 3600 * 1000;
        var dates = [];

        var datas = data2[cart.right.name];

        for (var j = 1; j < 365; j++) {
            var now = new Date(base += oneDay);
            dates.push([now.getMonth() + 1, now.getDate()].join('/'));
            datas.push(datas[j - 1]);
        }

        var option3 = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '日发电曲线'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dates
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            // dataZoom: [{
            //     type: 'inside',
            //     start: 0,
            //     end: 100
            // }, {
            //     start: 0,
            //     end: 100,
            //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            //     handleSize: '80%',
            //     handleStyle: {
            //         color: '#fff',
            //         shadowBlur: 3,
            //         shadowColor: 'rgba(0, 0, 0, 0.6)',
            //         shadowOffsetX: 2,
            //         shadowOffsetY: 2
            //     }
            // }],
            series: [
                {
                    name:'日发电量',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: datas
                }
            ]
        };
        zxtChart2.setOption(option3);

        var test = cart.right.radar;

        var option4 = {
            tooltip: {},
            name:{
                textStyle:{
                    color:'#000',
                    fontSize:14
                }
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: '辐照资源得分', max: 100},
                    { name: '现有弃光得分', max: 100},
                    { name: '弃光消纳得分', max: 100},
                    { name: '工业地价得分', max: 100}
                ]
            },
            series: [{
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : cart.right.radar
                    }
                ]
            }]
        };
        radarChart2.setOption(option4);

    }
}