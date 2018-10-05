/**
 * 自定义的校验方法
 */
//检测手机号是否正确
jQuery.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var regPhone = /^1([3578]\d|4[57])\d{8}$/;
    return this.optional(element) || ( length == 11 && regPhone.test( value ) );  
}, "请正确填写您的手机号码"); 

//检测用户姓名是否为汉字
jQuery.validator.addMethod("isChar", function(value, element) {
	var length = value.length;
	var regName = /[^\u4e00-\u9fa5]/g;
    return this.optional(element) || !regName.test( value );  
}, "请正确格式的姓名(暂支持汉字)");

//檢測邮政编码
jQuery.validator.addMethod("isZipCode", function(value, element) {  
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的邮政编码");

//大于0小于1的数字
jQuery.validator.addMethod("isZeroToOne", function(value, element) {  
    var tel =/^0\.\d*[1-9]\d*$/;
    return this.optional(element) || (tel.test(value));
}, "请输入大于0小于1的小数");

//大于0的数字
jQuery.validator.addMethod("isgtZero", function(value, element) {  
    var tel = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
    return this.optional(element) || (tel.test(value));
}, "请输入大于0的数字");

//整数部分小于等于2，小数部分小于等于2
jQuery.validator.addMethod("isNumber22", function(value, element) {  
	var ret=true;
    if(value!=""){
 	   if(value.indexOf(".")==-1){
 		   if(value.length>2)
 			   ret= false;
 	   }
 	   else{
 		   var a1=value.substring(0,value.indexOf("."));
 		   var a2=value.substring(value.indexOf(".")+1);
 		   if(a1.length>2 || a2.length>2)
 			   ret=false;
 	   }
    }
	   
    	     
    return this.optional(element) || (ret);
}, "整数部分不能大于2，小数部分不能大于2");


//身份证
jQuery.validator.addMethod("isSfz", function(value, element) {  
    var tel = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    return this.optional(element) || (tel.test(value));
}, "请输合法的身份证");

//以元为单位的钱
jQuery.validator.addMethod("isMoney", function(value, element) {  
    var tel =/^(([0-9]+\d*)|([0-9]+\d*\.\d{1,2}))$/;
    return this.optional(element) || (tel.test(value));
}, "请输入小数位不超过两位的正数");

// 必填 过滤空格
jQuery.validator.addMethod("noSpace", function(value, element) {
	var ret = true;
    var tel = trim(value);
    if(tel==""){
    	return false;
    }
    return this.optional(element) || (ret);
}, "输入不能为空");


//检测是否是座机 或者手机号
jQuery.validator.addMethod("isMobileOrTel", function(value, element) {
	
	var regPhone = /^((0\d{2,3}-\d{7,8})|(1([3578]\d|4[57])\d{8}))$/;
    return this.optional(element) || (regPhone.test( value ) );  
}, "请填写正确的手机号或者座机号"); 




function trim(str)
{
	return rtrim(ltrim(str));
}
function ltrim(str)
{
	return str.replace(/^\s*/gi,"");
}

function rtrim(str)
{
	return str.replace(/\s*$/gi,"");
}