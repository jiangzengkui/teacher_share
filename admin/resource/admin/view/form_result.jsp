<%@page import="com.xbsoft.comm.util.XBUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
String cids[]=request.getParameterValues("cid");
String cnames[]=request.getParameterValues("cname");
String shows[]=request.getParameterValues("show");
String etypes[]=request.getParameterValues("etype");
String dicts[]=request.getParameterValues("dict");
String requires[]=request.getParameterValues("require");
String elens[]=request.getParameterValues("elen");
String dtypes[]=request.getParameterValues("dtype");

StringBuffer sb=new StringBuffer();
//===============找隐藏元素
for(int i=0;i<cids.length;i++){
	String show=shows[i];
	if("0".equals(show)){//隐藏
		String val="value=\"${form."+cids[i]+"!}\" ";
		String  datevalidate="";
		if("Date".equals(dtypes[i])){
			//日期类型，要转换
			val="value=\"${(form."+cids[i]+"?string(\"yyyy-MM-dd\"))!}\" ";
			datevalidate="dateISO=\"ture\"   ";
		}
		
		
		sb.append("\t<input type=\"hidden\"  name=\""+cids[i]+"\"  id=\""+cids[i]+"\"    "+datevalidate+val+"/>\n");
	}
}


//==================显示的元素
StringBuffer sb1=new StringBuffer();
for(int i=0;i<cids.length;i++){
	String show=shows[i];
	if("0".equals(show)){//隐藏
		continue;
	}
	
	//==========日期====
	String val="value=\"${form."+cids[i]+"!}\" ";
	String  datevalidate="";
	if("Date".equals(dtypes[i])){//日期类型，要转换
		val="value=\"${(form."+cids[i]+"?string(\"yyyy-MM-dd\"))!}\" ";
		datevalidate="dateISO=\"ture\" ";
	}
	//============必填==========
			String require="";
	if(requires[i].equals("1")){
		 require=" required=\"true\" ";
	}
	//=======最大
			String maxlen=" maxlength=\""+elens[i]+"\"";
	    
	
	

	
	sb1.append("\t   <td class=\"w2 lable t-r\">"+cnames[i]+"</td>\n");
	sb1.append("\t      <td>\n");
	
   if(etypes[i].equals("1")){//文本框
		sb1.append("\t\t <input name=\""+cids[i]+"\" id=\""+cids[i]+"\"  "+val+"   "+require+"  "+datevalidate+"    "+maxlen+" class=\"input_text\" > \n");
	}
   else{//下拉框
	   sb1.append("\t [@formDict etype=\"select\" dictName=\""+dicts[i]+"\"  name=\""+cids[i]+"\" id=\""+cids[i]
			   +"\"  value=form."+cids[i]+"!  isEmpty=\"true\"  "+require+" class=\"input_text\" /]");
   }

	sb1.append("\t      </td>\n");
	sb1.append("\t </tr>\n");
	
}

sb.append(sb1);
%>
<textarea style="width:100%;height:500px"><%=sb.toString() %></textarea>
</body>
</html>