<%--
  Created by IntelliJ IDEA.
  User: jyfmidi
  Date: 2017/8/6
  Time: 上午11:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="model.City" %>
<%
    City city = (City)request.getAttribute("city");
    String n1 = (String)request.getAttribute("n1");
    String n2 = (String)request.getAttribute("n2");
    String value = "no city";
    if(city != null) {
       value = city.city;
    }
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>test.jsp</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->
  </head>
  <body>
    <form action="parseDataServlet" method="post">
        第一个数字：
        <input type="text" name="n1" /><br/>
        第二个数字：
        <input type="text" name="n2" /><br/>
        返回1
        <input type="text" value="<%=n1%>"/>
        <input type="text" value="<%=n2%>"/>
        <input type="text" value="<%=value%>"/>
        <input type="submit" value="提交">
    </form>
  </body>
</html>
