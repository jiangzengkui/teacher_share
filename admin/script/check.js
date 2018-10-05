/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat


type:
	email
	tel
	isEmpty
	
*/


var check=function(obj){
	/*
		http://blog.chinaunix.net/uid-26729093-id-3987326.html
		正则表达式参考
	*/
	var state=true
	var regx={
		email:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		mobile:/^1\d{10}$/,						//手机
		tel:/^0\d{2,3}-?\d{7,8}$/,				//座机
		isNumber:/^[0-9]*$/,					//数字
		isEmpty:''||null,						
		userName:/^[a-zA-Z]\w{5,17}$/,			//以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
		userID:/^\d{15}|\d{}18$/,				//身份证
		
	}
	var errorObj=[]
	obj.find('[checktype]').each(function(index, element){
		var type=$(this).attr('checktype')
		var msg=$(this).attr('errorMsg')
		if(type=='email'){
			if(!regx.email.test($(this).val())){
				//$(this).focus()
				layer.tips(msg,$(this),{tipsMore:true})
				state=false
				errorObj.push(index)
				//return state
			}
		}else if(type=='isEmpty'){
			var value=$(this).val()||$(this).html()
			if(value==''||null){
				//layer.alert(msg,{icon:2})
				//$(this).focus()
				layer.tips(msg,$(this),{tipsMore:true})
				//alert($(this).attr('id'))
				state=false
				//errorObj.push(index)
				//return state
			}
		}
		
    });
	/*
	for(var i in errorObj){
		alert(obj.find('[checktype]').eq(errorObj[i]).attr('errorMsg'))
		layer.tips(obj.find('[checktype]').eq(errorObj[i]).attr('errorMsg'),obj.find('[checktype]').eq(errorObj[i]))
	}
	*/
	/*
	var value=obj.val()
	if(type=='email'){
		!regx_email.test(value)&&alert(errorMsg)
		return false
	}else if(type=='tel'){
			
		return false
	}else if(type=='isEmpty'){
			
		return false
	}
	*/
	return state
}