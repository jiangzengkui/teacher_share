<%@page import="com.xbsoft.xqb.comm.SessionUser,org.springframework.web.util.WebUtils,com.xbsoft.comm.util.SysConstant"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设置用户信息</title>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/admin/js/admin_comm.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/plus/layer/layer.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resource/admin/css/common.css"/>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resource/admin/css/common_iframe.css"/>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resource/admin/css/form.css"/>
<!--form 校验框架 -->
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/plus/formvalidate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/plus/formvalidate/messages_zh.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resource/plus/formvalidate/custom.validate.js"></script>

<script>

function setpwd(obj){
	if(obj.checked){
		$("#tr_pwd").show();
		$("#tr_pwd2").show();
	}
	else{
		$("#tr_pwd").hide();
		$("#tr_pwd2").hide();
	}
}

$(function(){
	formValidateComm("form");//表单校验初始化
});

/**
 * 提交用户修改
 */
function save(){
	if(!formValidateComm("form").form())
		return;

	 $.ajax({

         type: "post",
         url: "<%=request.getContextPath() %>/website/update_user.do",
         data:$('#form').serialize(),
          dataType: "json",
          success: function(data){
                 alertOk("修改成功");
                  },
          error:function(XMLHttpRequest, textStatus, errorThrown){
        	  alertErr("修改失败");
          }
         

     });

	
	
}

</script>
</head>
<body>
<%
String path=request.getContextPath();
SessionUser user=(SessionUser)WebUtils.getSessionAttribute(request,SysConstant.USER_NAME);
if(user==null){
	response.sendRedirect(path+"/resource/admin/view/loginwin.jsp");
	return ;
}
	 
%>

     <form id="form">
     <input type="hidden"  name="user_sn"    value="<%=user.getUser_sn() %>">
  <div style="width:100%">
    <dl class="main_content"   >
        <table class="content layui" border="0" cellspacing="0"  >
    
					<tr>
						<td style="width:25%;" class="lable t-r">用户名</td>
						<td style="width:75%;" ><input type="text"   name="user_name"   id="user_name"  class="input_text" 
						 required="true"  data-msg-required="用户名不能为空"  value="<%=user.getUser_name()%>" /></td>
					</tr>
					
						<tr>
						<td style="width:25%;" class="lable t-r">重置密码</td>
						<td style="width:75%;" >
						<input type="checkbox"  name="is_pwd"    id="is_pwd"  value="1"  class="radiobox"  onclick="setpwd(this)">
						</td>
					</tr>
					<tr id="tr_pwd" style="display:none">  
						<td style="width:25%;" class="lable t-r">新密码<font class="red">*</font></td>
						<td style="width:75%;" >
								<input type="password"    class="input_text" name="loginPwd"   id="loginPwd"
								required="true"  data-msg-required="密码不能为空"   minlength="6" 
								/>
						</td>
					</tr>
					
					<tr id="tr_pwd2" style="display:none">  
						<td style="width:25%;" class="lable t-r">确认新密码<font class="red">*</font></td>
						<td style="width:75%;" >
								<input type="password"    class="input_text" name="loginPwd2"   id="loginPwd2"
								required="true"  data-msg-required="密码不能为空"   equalTo="#loginPwd"    
								/>
						</td>
					</tr>
                    	
				</table> 
        <dd class="content_footer">
        <input type="button" class="input_button blue" value="修改提交"  style="width:200px"  onclick="save()"  />
        </dd>
    </dl>
    
    </div>
    </form> 
</body>
</html>