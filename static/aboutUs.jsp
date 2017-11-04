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

<h2 id="details-judges" >Team (sorted by name)</h2>

<div class="container sections judges">

    <div class="row">
        <div class="col-md-4">
            <img src="/image/team/fsy.jpg" class="headshot">
            <p>付尚杨</p>
            <p class="title">上海交通大学</p>
            <p class="title">机械与动力工程学院</p>
        </div>
        <div class="col-md-4">
            <img src="/image/team/jyf.jpg" class="headshot">
            <p>金屹梵</p>
            <p class="title">上海交通大学</p>
            <p class="title">电子信息与电气工程学院</p>
        </div>
        <div class="col-md-4">
            <img src="/image/team/xxx.jpg" class="headshot">
            <p>席晓轩</p>
            <p class="title">上海交通大学</p>
            <p class="title">机械与动力工程学院</p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4">
            <img src="/image/team/zts.jpg" class="headshot">
            <p>曾天生</p>
            <p class="title">上海交通大学</p>
            <p class="title">机械与动力工程学院</p>
        </div>

        <div class="col-md-4">
            <img src="/image/team/zyj.jpg" class="headshot">
            <p>张怡洁</p>
            <p class="title">上海交通大学</p>
            <p class="title">机械与动力工程学院</p>
        </div>
        <%--<div class="col-md-4">--%>
            <%--<img src="/img/stanley.jpg" class="headshot">--%>
            <%--<p>Stanley Huang</p>--%>
            <%--<p class="title">CTO of Moxtra</p>--%>
        <%--</div>--%>
    </div>

    <div class="row"><div class="col-md-12 spacer"></div></div>
    <div class="row"><div class="col-md-12 spacer"></div></div>
</div>
<h2 id="details-judges">Advisors</h2>

<div class="container sections judges">
    <div class="row"><div class="col-md-12 spacer"></div></div>
    <div class="row"><div class="col-md-12 spacer"></div></div>

    <div class="row">
        <div class="col-md-4">
            <img src="/image/advisor/wrz.jpg" class="headshot">
            <p>王如竹</p>
            <p class="title">上海交通大学制冷与低温工程</p>
            <p class="title">研究所所长</p>
            <p class="title">研究方向：太阳能</p>
            <p class="title">与自然能源利用与建筑节能</p>
        </div>
        <div class="col-md-4">
            <img src="/image/advisor/mt.jpg" class="headshot">
            <p>马涛</p>
            <p class="title">上海交通大学机械与动力工程学院</p>
            <p class="title">讲师, 博士生导师</p>
            <p class="title">研究方向：可再生能源（太阳能、风能）</p>
            <p class="title">利用及其工程热物理问题</p>

        </div>
        <div class="col-md-4">
            <img src="/image/advisor/qw.jpg" class="headshot">
            <p>秦威</p>
            <p class="title">上海交通大学机械与动力工程学院</p>
            <p class="title">讲师, 博士生导师</p>
            <p class="title">研究方向：大数据与机器学习、</p>
            <p class="title">复杂系统与人工智能</p>
        </div>
    </div>
    </div>

    <div class="row"><div class="col-md-12 spacer"></div></div>
    <div class="row"><div class="col-md-12 spacer"></div></div>


</body>
</html>
