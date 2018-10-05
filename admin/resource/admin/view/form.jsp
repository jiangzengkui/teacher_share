<%@page import="java.util.*"%>
<%@page import="com.xbsoft.comm.codegenerate.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%
  String root_path=request.getContextPath();
    
    String tb_name=request.getParameter("tb_name");
if(tb_name==null)tb_name="";tb_name=tb_name.trim();
  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>form元素生成器</title>
	<script type="text/javascript" src="<%=root_path %>/resource/jquery-1.8.3.min.js"></script>
	<style type="text/css"> 
body,table{ 
font-size:12px; 
} 
table{ 
table-layout:fixed; 
empty-cells:show; 
border-collapse: collapse; 
margin:0 auto; 
} 
td{ 
height:30px; 
} 
h1,h2,h3{ 
font-size:12px; 
margin:0; 
padding:0; 
} 
.table{ 
border:1px solid #cad9ea; 
color:#666; 
} 
.table th { 
background-repeat:repeat-x; 
height:30px; 
} 
.table td,.table th{ 
border:1px solid #cad9ea; 
padding:0 1em 0; 
} 
.table tr.alter{ 
background-color:#f5fafe; 
} 
</style> 
<script>
function query(){
	var tb=$("#tb_name").val();
	document.location="form.jsp?tb_name="+tb;
}

function send(){
	$("#form").submit();

}
</script>
</head>
<body>
表名：<input id="tb_name"  name="tb_name"  value="<%=tb_name%>"><input type="button"  value="查询字段"  onclick="query()">
<span style="margen-lef:30px"></span><input type="button"  value="生成代码"  onclick="send()">
<hr>
<%
if(tb_name.length()==0){
	out.println("请输入表名");
	return;
}

JavaCode .read(tb_name);
Map<String,List<Col>> map=JavaCode.colMap;
List <Col>list=map.get(tb_name);
%>
<form  id="form"  action="form_result.jsp"   method="post">
<table width="1000px" class="table"> 
<tr> 
<th>字段中文名</th> 
<th>字段英文名</th> 
<th>是否隐藏</th> 
<th>显示元素</th> 
<th>绑定字典</th> 
<th>是否必填</th> 
<th>最大字符数</th> 
<th style="display:none">隐藏</th> 
</tr> 

<%
int i=0;
StringBuffer sb=new StringBuffer();
String s="";
for(Col col:list){
	if(i%2==0)s="";else s="class=\"alter\"";
	String cname=col.desc;
	if(cname.length()>10)cname=cname.substring(0,10);
	sb.append("<tr "+s+" style='backage-color:red'>\n");
	sb.append(" <td> <input name='cname' value='"+cname+"'  style='width:100%'></td>\n");
	sb.append(" <td> <input name='cid' value='"+col.name+"'  style='width:100%'></td>\n");
	sb.append(" <td><select name='show'  style='width:100%'><option value='1'>显示</option><option value='0'>隐藏</option></select></td>\n");
	sb.append(" <td><select name='etype'  style='width:100%'><option value='1'>文本框</option><option value='2'>下拉框</option></select></td>\n");
	sb.append(" <td> <input name='dict' value=''   style='width:100%'></td>\n");
	sb.append(" <td><select name='require'  style='width:100%'><option value='0'>否</option><option value='1'>是</option></select></td>\n");
	sb.append(" <td> <input name='elen' value='"+col.len+"'  style='width:100%'></td>\n");
	sb.append("<td style='display:none'><input name='dtype' value='"+col.type+"'></td> \n");
	sb.append(" \n");
	
	sb.append(" </tr>\n");
	i++;
}
%>
<%=sb.toString() %>


</table> 

</form>
</body>
</html>