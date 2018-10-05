<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>视频播放</title>
</head>
<body>
<%
String url=request.getParameter("url");
if(url==null || url.trim().length()==0){
	out.println("请传递视频url");
	return ;
}
url=url.trim();
//url=request.getContextPath()+url;
%>
<video width="500" height="300" controls autoplay>
  <source src="<%=url %>" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  <source src="movie.webm" type="video/webm">
  您的浏览器不支持 html5   video 属性。
</video>

</body>
</html>