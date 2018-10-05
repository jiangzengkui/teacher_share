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
	//var regx_email=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	//var regx_tel=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	//var regx_isEmpty=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	var state=true
	var regx={
		email:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		tel:'',
		isEmpty:''||null
	}
	var errorObj=[]
	obj.find('[checktype]').each(function(index, element) {
		var type=$(this).attr('checktype')
		var msg=$(this).attr('errorMsg')
		if(type=='email'){
			if(!regx.email.test($(this).val())){
				//$(this).focus()
				layer.tips(msg,$(this))
				state=false
				errorObj.push(index)
				return state
			}else{
				$(this).attr('check','')
			}
		}else if(type=='isEmpty'){
			var value=$(this).val()||$(this).html()
			if(value==''||null){
				//layer.alert(msg,{icon:2})
				$(this).focus()
				layer.tips(msg,$(this))
				//alert($(this).attr('id'))
				state=false
				//errorObj.push(index)
				return state
			}else{
				$(this).attr('check','')
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