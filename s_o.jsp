<%--
  Created by IntelliJ IDEA.
  User: 滩涂上的芦苇
  Date: 2017/5/9
  Time: 16:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>

    <title>PV COUNSELOR</title>
    <meta charset="utf-8">
    <meta content="RESTful Web API Testing" name="description">
    <meta content="REST, API, Testing" name="keywords">
    <meta content="Christopher Reichert" name="author">
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <link rel="icon" href="/image/icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="js/echarts.min.js"></script>
    <script src="js/china.js"></script>
    <script id="boot" type="application/json">
        {"component":"site/Home.js","token":null,"props":{"isLoggedIn":false},"account":null,"msg":null,"id":null,"ultDest":null}
    </script>
    <link href="css/commons.css" type="text/css" rel="stylesheet">
    <link href="css/site.css" type="text/css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,700,300italic,400italic" type="text/css" rel="stylesheet">


</head>
<body>
<jsp:include page="static/head.jsp"/>

<body>
<div style="width: 100%;height: auto">
    <form class="form-inline">
        <div class="form-group" >
            <label>装机容量(MW)</label>
            <input type="text" class="form-control" placeholder="10">
        </div>
        <%--<div class="form-group">--%>
        <%--<label>光伏板型号</label>--%>
        <%--<select class="form-control">--%>
        <%--<option>典型单晶硅组件</option>--%>
        <%--<option>典型多晶硅组件</option>--%>
        <%--<option>自定义光伏组件</option>--%>
        <%--</select>--%>
        <%--</div>--%>
        <%--<div class="form-group">--%>
        <%--<label>追踪方式</label>--%>
        <%--<select class="form-control">--%>
        <%--<option>固定式安装</option>--%>
        <%--<option>斜单轴追踪</option>--%>
        <%--<option>双轴追踪</option>--%>
        <%--</select>--%>
        <%--</div>--%>
        <a href="/m_f.jsp" >
            <button type="button" class="btn btn-default">单晶硅固定式</button>
        </a>
        <a href="/m_o.jsp" >
            <button type="button" class="btn btn-default">单晶硅斜单轴</button>
        </a>
        <a href="/m_d.jsp" >
            <button type="button" class="btn btn-default">单晶硅双轴</button>
        </a>
        <a href="/s_f.jsp" >
            <button type="button" class="btn btn-default">多晶硅固定式</button>
        </a>
        <a href="/s_o.jsp" >
            <button type="button" class="btn btn-default">多晶硅斜单轴</button>
        </a>
        <a href="/s_d.jsp" >
            <button type="button" class="btn btn-default">多晶硅双轴</button>
        </a>

    </form>
</div>
<div id="main" style="height: 100%; width:60%; float: left">
    <div style="position: relative; overflow: hidden; width: 300px; height: 600px;">
        <div data-zr-dom-id="bg" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 445px; height: 600px; user-select: none;"></div>
        <canvas width="300" height="600" data-zr-dom-id="0" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 445px; height: 600px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas>
        <canvas width="300" height="600" data-zr-dom-id="10" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 445px; height: 600px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas>
        <canvas width="300" height="600" data-zr-dom-id="_zrender_hover_" class="zr-element" style="position: absolute; left: 0px; top: 0px; width: 445px; height: 600px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas>
    </div>
</div>
<div id = "next" style="float: left; width: 40%">
    <div id = "name" style="height: 40px;color:#fc5185"></div>
    <table style="height: 30%;width: 100%">
        <tr>基本信息</tr>
        <tr><td>省份</td><td id = "province"></td></tr>
        <tr><td>海拔</td><td id = "altitude"></td></tr>
        <tr><td>电价</td><td id = "elePrice"></td></tr>
        <tr><td>维度</td><td id = "latitude"></td></tr>
        <tr><td>经度</td><td id = "longitude"></td></tr>
        <tr><td>资源类型区</td><td id = "type"></td></tr>
    </table>
    <div>
        辐照资源高于全国<div style="display: inline" id = "fz"></div>%的区域<br>
        工业地价低于全国<div style="display: inline" id = "dj"></div>%的区域<br>
        弃光率在<div style="display: inline" id = "qgl"></div>%<br>
        年发电收益：<div style="display: inline" id = "fd"></div><br>
        <div id = "rfdqx" style="width: 100%; height: 300px">

        </div>
        波动率高于全国<div style="display: inline" id = "bdl"></div>%的区域
    </div>
    <div>
        <div>建站成本分析<br>
            总建站成本：<div style="display: inline" id = "cb"> </div>万元</div>
        <div id ="bt" style="width: 50%; height: 300px; float: left"></div>
        <div id = "zzt" style="width: 50%; height: 300px;float: left"></div>
    </div>
</div>
<script src="js/s_o.js"></script>
<script src="js/data.js"></script>
<script src="js/show.js"></script>
</body>
</html>
