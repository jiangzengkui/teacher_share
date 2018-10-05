<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%
  String root_path=request.getContextPath();
  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="<%=root_path %>/resource/plus/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=root_path %>/resource/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/ztree/js/jquery.ztree.core.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/ztree/js/jquery.ztree.excheck.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/layer/layer.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/admin/js/admin_comm.js"></script>
	<script>
	var root_path="/xbsoft";
	function openkm1(){
		winOpen("选择培训科目","single_km.jsp","300p","500");
	}
	function openkm2(){
		winOpen("选择培训科目","mul_km.jsp","700","550");
	}
	
	
	function xz(){
		chooseKm("2",$("#kmId").val(),$("#kmName").val());
	}
	
	/**
	单选的回调函数
	**/
	function setKm(kmId,kmName){
		$("#kmId").val(kmId);
		$("#kmName").val(kmName);
	}
	/**
	多选的回调函数
	**/
	function setMulKm(kmId,kmName){
		$("#kmId").val(kmId);
		$("#kmName").val(kmName);
	}
	</script>
</head>
<body>
<input name="kmId" id="kmId">-<input name="kmName" id="kmName">
<p></p>
<input type="button" onclick="chooseKm()" value="kmsingle=="> <p></p>
<input type="button" onclick="xz()"   value="kmmul=="> <p></p>
</body>
</html>