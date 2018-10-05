<%@page import="com.xbsoft.xqb.comm.KMUtil"%>
<%@page import="com.xbsoft.comm.util.XBUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <%
  String root_path=request.getContextPath();
  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>树状结构</title>
<link rel="stylesheet" href="<%=root_path %>/resource/plus/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=root_path %>/resource/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/ztree/js/jquery.ztree.core.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/ztree/js/jquery.ztree.excheck.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/layer/layer.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/admin/js/admin_comm.js"></script>

</head>
<body>
<div  style="margin-left:50px">
<ul id="treeDemo" class="ztree"></ul>
</div>
</body>
</html>
<script type="text/javascript">
		//id 	包含关系层级
		//pid	层级
		
		var setting = {
			data: {
				simpleData: {
					enable: true
				}
			},
			callback:{
				onClick:getValue
			}
		};
		var zNodes =[
		
<%=KMUtil.getKmTreeCont("")%>
			
		];
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		
		/**
		点击事件
		**/
		function getValue(event,treeId,treeNode){
			if(!treeNode.isLeaf){
				alertErr("请点击+选择下级培训子项目");
				return;
			}
			var kmId=treeNode.id;
			var kmName=treeNode.name;
			confirm("是否选择科目-"+kmName+"?",function(index){
				layer.close(index);
				try{
					parent.setKm(kmId,kmName);
					parent.layer.closeAll();
				}
				 catch(error) {
					alertErr("父页面没有setKm函数");
				}
			});
			
		}
		
					
		
</script>