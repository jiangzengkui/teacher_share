<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录小窗口</title>
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
$(function(){
	formValidateComm("login");//表单校验初始化
});
function login(){
	if(!formValidateComm("login").form())
		return;

	$.ajax( {  
	    url:'<%=request.getContextPath() %>/website/orgLoginSubmit.do',// 跳转到 action  
	    data:{  
	             loginId : $("#loginId").val(),  
	             loginPwd :$("#loginPwd").val()
	           
	    },  
	    type:'post',  
	    cache:false,  
	    dataType:'json',  
	    success:function(data) {  
	        if(data.ret=="0"){//成功登陆
	        	alertOk("登录成功",function(){
	        		parent.layer.closeAll();
	        		
	        	});
	        }
	        else if(data.ret=="1"){
	        	alertErr("你的登陆手机号还没有注册");
	        }
	        else if(data.ret=="2"){
	        	alertErr("密码错误");
	        }
	        else if(data.ret=="3"){
	        	alertErr("您所在的培训机构被管理员关闭");
	        }
	     },  
	     error : function() {  
	           
	    	 alertErr("登陆异常，请联系客服人员！");  
	     }  
	});
}


</script>

</head>
<body>
<div style="height:30px"></div>
     <form id="login">
  <div style="width:100%">
    <dl class="main_content"  style="width:500px;margin:0 auto" >
        <table class="content layui" border="0" cellspacing="0"  >
            <tr>
						<td   colspan="2"  align="center"  style="color:red; background-color:#E3E0DF">登录超时，请重新登录</td>
						
					</tr>
					<tr>
						<td style="width:25%;" class="lable t-r">登录账号</td>
						<td style="width:75%;" ><input type="text"   name="loginId"   id="loginId"  class="input_text" 
						 required="true"  data-msg-required="账号不能为空" noSpace="true"  /></td>
					</tr>
					<tr>  
						<td style="width:25%;" class="lable t-r">登录密码<font class="red">*</font></td>
						<td style="width:75%;" >
								<input type="password"    class="input_text" name="loginPwd"   id="loginPwd"
								required="true"  data-msg-required="密码不能为空"
								/>
						</td>
					</tr>
                    	
				</table> 
        <dd class="content_footer">
        <input type="button" class="input_button blue" value="登录"  style="width:200px"  onclick="login()"  />
        </dd>
    </dl>
    
    </div>
    </form> 
</body>
</html>