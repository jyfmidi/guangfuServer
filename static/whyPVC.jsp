<%--
  Created by IntelliJ IDEA.
  User: jyfmi
  Date: 2017/3/22
  Time: 3:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>About Us</title>
    <meta charset="utf-8">
    <meta content="RESTful Web API Testing" name="description">
    <meta content="REST, API, Testing" name="keywords">
    <meta content="Christopher Reichert" name="author">
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <link rel="icon" href="/image/icon.png" type="image/x-icon">
    <script id="boot" type="application/json">
        {"component":"site/Home.js","token":null,"props":{"isLoggedIn":false},"account":null,"msg":null,"id":null,"ultDest":null}
    </script>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/commons.css" type="text/css" rel="stylesheet">
    <link href="../css/site.css" type="text/css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,700,300italic,400italic" type="text/css" rel="stylesheet">

</head>
<body>
<jsp:include page="head.jsp"/>

<link href="/css/cover.css" rel="stylesheet">

<h2 id="details-heading">PV Counselor</h2>

<div class="container sections details" style="left:150px; top:200px; position: absolute;">
    <div class="row">

        <div class="col-md-10">
            <embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=d0530m8f2ck&auto=0" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
        </div>
        <div class="col-md-10">
            <span class="highlight">PV Counselor</span> 致力成为光伏建站辅助决策专家，海量数据支持，智能算法驱动，为中国光伏产业的规划、投资提供专业决策参考。
            <br>对于<span class="highlight">尚未建站的光伏投资者</span>，PV Counselor综合光热资源、成本差异、弃光风险为他们提供决策参考。
            <br>对于<span class="highlight">已经建成的光伏电站</span>，
            PV Counselor基于历史天气和发电数据，使用机器学习算法，根据中国气象网发布的天气预报，对光伏电站未来数日的发电曲线进行预测。
            <br>对于<span class="highlight">正在开发相关衍生产品的金融机构</span>，PV Counselor为其产品的设计提供数据支撑。
        </div>
        <div class="col-md-1"></div>
    </div>

    <div class="row"><div class="col-md-12 spacer"></div></div>
    <div class="row"><div class="col-md-12 spacer"></div></div>
    <div class="row"><div class="col-md-12 spacer"></div></div>
</div>

</body>
</html>
