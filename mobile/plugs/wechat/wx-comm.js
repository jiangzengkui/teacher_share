
/****字符串的截空操作---------***/
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
	
	/****字符串的截空操作---------***/
	


	/**
	 * 绑定Ajax的显示的数据字典显示值，前提是dictval.js要存在
	 * @param dict_code 数据字典名如:BM-001
	 * @param option_code   编码值
	 * @returns {String}  对应的显示值
	 */
	function getDictShow(dict_code,option_code){
		var val="";
		if(dict_code==null  || trim(dict_code)=="")
			return "必须有数据字典编号";
		option_code=trim(option_code);
		dict_code=trim(dict_code);
		dict_code=dict_code.replace("-","");
		if(option_code=="")
			 return "";
		try {
			val=eval("dictAll."+dict_code+".o"+option_code);
			}
		 catch(error) 
	      { 
			 val="无["+dict_code+"]此数据字典";
			} 
	     if(val==null || val=="" || val==false)
	    	 val="编码["+option_code+"]无对应中文";
		   return val;
	}
	
	/**
	 * 得到手机操作系统判断
	 * 1 安卓
	 * 2 ios
	 * 3 未知
	 */
	
	function mobileSystem(){
		var ret=3;
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid==true)
			ret=1;
		if(isiOS==true)
			ret=2;
		
		return ret;
	}
	
	/**
	 * 判断是否是微信内置浏览器
	 * @returns {Boolean}
	 */
	function is_weixin(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
		} else {
		return false;
		}
		}
	
/**
 * 微信的通用封装类,必须放在jquery layer.js一下
 */


//======================session失效判断,全局变量===============================

$.ajaxSetup({   
      contentType:"application/x-www-form-urlencoded;charset=utf-8",   
      complete:function(XMLHttpRequest,textStatus){ 
        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
        if(sessionstatus=="timeout"){ 
        	 layer.closeAll();//删除掉异常显示层
        	 //询问框
       	  layer.open({
       	    content: "本功能需要手机认证后才能操作"
       	    ,btn: ['去认证', '取消']
       	    ,yes:function(){
       	    	var target=" /comm/wxRecUrl/chang.do";
            	var link=document.location.href;
            	link=link.replace(new RegExp("&", 'g'), "`");
            	link=link.replace("?", "`");
            	target=target+"?url="+link;
            	target=getParamsUrl(target);
            	document.location=target;
       	    }//yes end
       	  });
       	  
       	  
        	
	         return;
	         }   
         }   
    });

//==============layer.js的简单封装
//提示
function tips(msg){
	 //提示
	  layer.open({
	    content: msg
	    ,skin: 'msg'
	    ,time: 2 //2秒后自动关闭
	  });
}


/**
 * 失败后确认，需要确认
 * @param msg
 */
function alertErr(msg,call){
	 layer.open({
		    content: msg
		    ,btn: "确 定"
		   ,yes:call
		  });
	
}
/**
 * 需要确认
 * @param msg
 */
function alertOk(msg,call){
	 layer.open({
		    content: msg
		    ,btn: "确 定"
		    ,yes:call
		  });
	
}

/**
 * 询问
 * @param msg
 */
function confirm(msg,call){

	
	 //询问框
	  layer.open({
	    content: msg
	    ,btn: ['确定', '取消']
	    ,yes:call
	  });
}

/**
 * 带文字的加载提示
 * @param msg
 * @returns
 */
function loading(msg){
	 //loading带文字
	 return  layer.open({
	    type: 2
	    ,content: msg
	  });
}

//============================封装全局参数========================
/**
得到带传递参数的url
**/
function getParamsUrl(url){
	var param_orgid=window.param_orgid;
	var param_userfrom=window.param_userfrom;
	var param_openid=window.param_openid;
	if(!param_orgid)param_orgid="";
	if(!param_userfrom)param_userfrom="";
	if(!param_openid)param_openid="";
	var urlparam="param_orgid="+param_orgid+"&param_userfrom="+param_userfrom+"&param_openid="+param_openid;
	if(url.indexOf("?")==-1){
		url=url+"?"+urlparam;
	}
	else
		url=url+"&"+urlparam;
	return url;
}





$(function(){
$("a").each(function(){
	   var val = $(this).attr('url');
	   
	   if (val) { 
		   $(this).attr('href',getParamsUrl(val));
	   }
	});
});

//=========================分页通用函数=====================
/**
通用分页
**/
function   ajaxListComm(url,formId,contentId,ajaxDataId,pageBarId){
	url=getParamsUrl(url);
	 $.ajax({

         type: "post",
         url: url,
         data:$('#'+formId).serialize(),
         dataType: "json",
         success: function(data){

			 //多个循环
			 var list;	
			 try {
				 list=eval("data."+ajaxDataId+".list");
				}
			 catch(error) 
	           {
				 alertErr("不存在["+"data."+ajaxDataId+".list"+"]数据区"+error);
				 return;
				} 
				
			 var content="";
                  $.each(list, function(index, obj){
                	  content+=rowRender(index,obj,formId,ajaxDataId)
                  });
               
               //  $('#'+contentId).html("");//展示数据
                 $("#"+contentId).append(content);//追加数据
                    var page=eval("data."+ajaxDataId);
                    if(pageBarId)
                       creatPgaeBar(url,formId,contentId,ajaxDataId,pageBarId,page.pages,page.pageNum,page.pageSize);
                    jsRender(list);
                    afterListRender();
                    pageInfo(formId,page);
                    
                   
             },
          error:function(XMLHttpRequest, textStatus, errorThrown){
        	  alertErr("列表初始化失败");
          }
         
		
    });
}
/**
 * js 数据渲染
 * @param list
 */
function  jsRender(list){
	
}

function afterListRender(){
	
	
}
/**
 * 抛出page分页对象，页面如果需要可重载
 */
function pageInfo(formId,page){
	
}


/**
创建页面信息
**/
function creatPgaeBar(url,formId,contentId,ajaxDataId,pageBarId,totPages,curPage,pageSize){

	if(totPages==1 || totPages==0){
		return ;
	}
	var html="";
	var barContent="";
	html+="<input type='hidden' name='pageSize'  value='"+pageSize+"' />";
	html+="<input type='hidden' name='pageNum'  value='"+curPage+"'/ >";
	html+="<input type='hidden' name='totPages'  value='"+totPages+"'/ >";
	if(curPage==totPages){
		html+="<input type='button'  value='加载完毕'  class='pagebar'>";
	}
	else{
		var clickParam="\""+url+"\",\""+formId+"\",\""+contentId+"\",\""+ajaxDataId+"\",\""+pageBarId+"\"";
		html+="<input type='button'  value='加载更多...'  onclick='nextPage("+clickParam+")' class='pagebar'>";
	}
	
	$("#"+pageBarId).html(html);
}

/**
下一页
**/
function nextPage(url,formId,contentId,ajaxDataId,pageBarId){
	
	var curPage=$("#"+formId).find("input[name='pageNum']").val();
	if(!curPage || curPage=="")
		curPage=0;
	else
		curPage=parseInt(curPage)+1;
	$("#"+formId).find("input[name='pageNum']").val(curPage);
	
	//调用分页函数
	ajaxListComm(url,formId,contentId,ajaxDataId,pageBarId)
}

/**
ajax 渲染每一行的数据,引用页面覆盖
formId：如果一个页面有多个列表时候，可以根据不同的formId生成不同的列表渲染值
data：列表里的字段
index:索引，第几条数据
只有一个列表则此值没有意义
**/
function rowRender(index,data,formId,ajaxDataId){
	 var content="";

 	return content;
}
	
	/**
	 * 异常提示截取，如果大于200字符不显示,否则体验感不好
	 */
	function getAjaxException(cont){
		if(cont.length>200)
			return "";
		return cont;
	}
	
	/**
	 * 得到微信授权方法,如果org_id不传或者传入“”,则默认兴趣邦
	 * @param org_id
	 */
  function getWxAtuth(org_id){
	  var target_orgid="";
	  if(org_id && trim(trim)!=""){
		  target_orgid=org_id;
	  }
	  var url="/comm/wx_auth/openid.do";
	  $.ajax({

	         type: "post",
	         url: url,
	         data:{org_id:target_orgid},
	         dataType: "json",
	         success: function(data){
	        	 setWxAuth(data.org_id,data.open_id);
	          },
	          error:function(XMLHttpRequest, textStatus, errorThrown){
	        	  alertErr("获取机构openid失败");
	          }
	         
			
	    });
  }
  
  /**
   * 设置权限，页面可覆盖成全局变量
   * @param org_id
   * @param open_id
   */
  function setWxAuth(org_id,open_id){
	  
  }
  /**
   * 是否是手机号码
   */
  function isMbileCode(val){
  	  if(val==""){
  		  alertErr("手机号码不能为空");
  		  return false;
        }
  	  var length =val.length;
  	  var regPhone = /^1([3578]\d|4[57])\d{8}$/;
  	  if ( length == 11 && regPhone.test( val ) ){
  	    	return true;
  	   }
  	  else{
  		  alertErr("您输入的不是手机号码");
  		  return false;
  	  }
  }
  
  /**
   * 是否必填项
**/
  function isEmpty(id,name){
	  var val=$("#"+id).val();
	  val=trim(val);
	  if(val==""){
		  alertErr(name+":不能为空");
		  return false;
	  }
	  return true;
  }
  
  function isTimeEmpty(id,name){
	  var val=$("#"+id).val();
	  val=trim(val);
	  if(val==""){
		  alertErr(name+":时间必须输入小时和分钟");
		  return false;
	  }
	  return true;
  }
  
  function isNum(id,name){
	  var val=$("#"+id).val();
	 
	  var num=/^[1-9]\d*$/;
	  if(num.test(val)==false){
		  alertErr(name+"必须为正整数");
		  return false;
	  }
	  return true;
	  
  }
  
  /**
   * 是否是钱
   * @param id
   * @param name
   */
  function isMoney(id,name){
	  var val=$("#"+id).val();
	  val=trim(val);
	  
	  var tel =/^(([0-9]+\d*)|([0-9]+\d*\.\d{1,2}))$/;
	 if(tel.test(val)==false){
		 alertErr(name+":错误的钱格式");
		 return false;
	 }
	 return true;
	  
	  
  }
  /**
   * 手机或者电话
   * @param id
   * @param name
   */
  function isTelMoble(id,name){
	  var val=$("#"+id).val();
	  val=trim(val);
	  var isMobile=false;
	  var isTel=false;
 	  var regPhone = /^1([3578]\d|4[57])\d{8}$/;
	  var regTel=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
	  if ( length == 11 && regPhone.test( val ) ){
		  isMobile=false;
	   }
	  
	 if ( regTel.test( val ) ){
		 isTel=true;
	   }
	  if(isMobile==false && isTel==false){
		  alertErr(name+":手机或者电话号码不正确");
		  return false
	  }
	  return true;
	
  }

  /**
   * 是否是手机号码
   */
  function isMbileNumber(id,name){
	  var val=$("#"+id).val();
	  val=trim(val);
	  var length =val.length;
  	  var regPhone = /^1([3578]\d|4[57])\d{8}$/;
  	  if ( length == 11 && regPhone.test( val ) ){
  	    	return true;
  	   }
  	  else{
  		alertErr(name+":手机号码不正确");
  		  return false;
  	  }
  	  return true;
	  
  }
  
  /**
   * 是否是手机号码
   */
  function isMbile(id){
	  var val=$("#"+id).val();
	  val=trim(val);
  	  if(val==""){
  		alertErr("手机号码不能为空");
  		  return false;
        }
  	  var length =val.length;
  	  var regPhone = /^1([3578]\d|4[57])\d{8}$/;
  	  if ( length == 11 && regPhone.test( val ) ){
  	    	return true;
  	   }
  	  else{
  		alertErr("您输入的不是手机号码");
  		  return false;
  	  }
  	  return true;
  }
  
  function xqb_zixun(){
		
		var tips="";

			tips="兴趣邦为您提供专业的免费咨询服务";	

		var cont="<div  style=\"width:100%;text-align:center;color:red\">"+tips+"</div>"
		    
			//  +"<div style='width:100%;text-align:center;color:#00995a;marin-top:10px;font-weight:blod'>兴趣邦</div>"

				+"  <img src=\"/resource/org_zixun_ewm.jpg\"  style=\"  width: 50%;\"/>"
				  +"<div style='width:100%;text-align:center;color:red'>长按识别二维码</div>"
			  +""
			  +"";
			  
	layer.open({
	   title: [
	     '温馨提示',
	     'background-color: #FF4351; color:#fff;'
	   ]
	   ,content: cont
		,btn: ['关闭']
		
	 });
	}
  /**
   * 微信选择地址
   * backUrl：回调 URL 必须http开头
   */
  function wxMap(backUrl){
	  //把里面的&替换掉
	  var reg=/&/g;
	  backUrl=backUrl.replace(reg,'%26');
	  var url="http://apis.map.qq.com/tools/locpicker?search=1&type=0"
		       +"&backurl="+ backUrl
		       +"&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp";
	  document.location=url;
  }
  
  /**
   * input 时间转换
   * @param strId
   * @param timeId
   */
  function timeChange(strId,timeId){
	  strVal=$("#"+strId).val();
	 
	  strVal=strVal.replace("T"," ");
	  if(strVal!=""){
		  strVal=strVal+":00";
	  }

	  $("#"+timeId).val(strVal);
  }