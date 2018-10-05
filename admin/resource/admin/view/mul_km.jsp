<%@page import="com.xbsoft.xqb.comm.KMUtil"%>
<%@page import="com.xbsoft.comm.util.XBUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
  String root_path=request.getContextPath();
    
    String km_ids=request.getParameter("km_ids");
    String km_names=request.getParameter("km_names");
  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>选择科目</title>

<link rel="stylesheet" href="<%=root_path %>/resource/plus/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="<%=root_path %>/resource/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/ztree/js/jquery.ztree.core.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/ztree/js/jquery.ztree.excheck.min.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/plus/layer/layer.js"></script>
	<script type="text/javascript" src="<%=root_path %>/resource/admin/js/admin_comm.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=root_path %>/resource/admin/css/common.css"/>
<link rel="stylesheet" type="text/css" href="<%=root_path %>/resource/admin/css/common_iframe.css"/>
<link rel="stylesheet" type="text/css" href="<%=root_path %>/resource/admin/css/form.css"/>
<style>
table.content td {
  box-sizing: border-box;
  padding: 5px 20px;
  vertical-align: top;
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
}
.gd{
height:100%;width:200px;
position:absolute;  overflow:auto
}
body {
 
  min-height: 200px;
 
}
</style>
<script>
/**
 * 删除已选项
 */
function del(){
	debugger;
	if($("#okkm option:selected").length>0){
		$("#okkm option:selected").each(function(){
			$(this).remove();
		});
		
   }
	else{
		alertErr("请选择要取消的已选科目");
	}

}

/**
 * 选择完毕
 */
function ok(){
	var selectids="";
	var selectinames="";
	$("#okkm option").each(function(){
		selectids+=$(this).attr("value")+",";
		selectinames+=$(this).text()+",";
		
	});
	if(selectids!="")selectids=","+selectids;
	if(selectinames!="")selectinames=selectinames.substring(0,selectinames.length-1);
    if(selectinames==""){
    	confirm("您没选择培训科目，是否确定?",function(index){
    		try{
    			parent.setMulKm(selectids,selectinames);
    			parent.layer.closeAll();
    		}
    		catch(err){alert("父页面没有回调函数:setMulKm(selectids,selectinames)")}
    		layer.close(index);
    	});
    }
    else{
    	confirm("您选择了:"+selectinames+"?",function(index){
    		try{
    			parent.setMulKm(selectids,selectinames);
    			parent.layer.closeAll();
    		}
    		catch(err){alert("父页面没有回调函数:setMulKm(selectids,selectinames)")}
    		layer.close(index);
    	});
    }
}


/**
点击事件
**/
var selectKmId="";//已选择的培训科目
var selectKmName="";//已选择的培训科目

/**
增加培训项目
**/
function addOption(){
	if(selectKmId==""){
		alertErr("请选择左边培训科目");
		return;
	}
	var isExist=false;
	//循环
	$("#okkm option").each(function(){
		if(selectKmId==$(this).val()){//相等
			isExist=true;
		}
	});
	if(isExist==false)
	    $("#okkm").append("<option value='"+selectKmId+"'>"+selectKmName+"</option");
}


function getValue(event,treeId,treeNode){
	if(!treeNode.isLeaf){
		alertErr("请点击+选择下级培训子项目");
		return;
	}
	var kmId=treeNode.id;
	var kmName=treeNode.name;
	selectKmId=kmId;
	selectKmName=kmName;
	addOption();
	
}


$(function(){

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
});
</script>
</head>
<body>
<%
if(km_ids==null || km_names==null){
	out.println("请传递培训科目参数");
	km_ids="";
	km_names="";

}
km_ids=km_ids.trim();
km_names=km_names.trim();
%>
<table class="content" border="0" cellspacing="0">
<tr>
<td class="lable t-c">培训科目</td><td class="lable t-c"></td>
<td class="lable t-c">已选科目  </td>
</tr>
		  <tr style="height:300px">
           <td style="width:200px" valign="top">
           <div style="" class="gd">
           <ul id="treeDemo" class="ztree"></ul>
           </div>
           </td>
           <td style="width:100px" valign="top">
           <input type="button" class="input_button blue"    value="&gt; &gt;添加"  style="width:100px;margin-top:20px" onclick="addOption()" />
           
            <input type="button"  class="input_button blue"    value="&lt;  &lt;删除"   style="width:100px;margin-top:20px" onclick="del()" />
            <input type="button"  class="input_button blue" value="选择完毕" style="width:100px;margin-top:20px" onclick="ok()" />
           
           </td>
           <td style="width:200px" valign="top">
           
           <select multiple="true" name="okkm" id="okkm"   class="input_texxt"     size="15"  style="width:100%;heigt:400px" ondblclick="del()">
          <%= KMUtil.creatOption(km_ids, km_names) %>
      
      </select>
  
    <br>
    <span class="red" style="font-size:12px">双击选项或者&lt;&lt;取消已选</span>
           </td>
</body>
</html>
