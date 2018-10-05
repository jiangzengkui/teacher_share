/**
 * 去掉空格
 * @returns
 */
String.prototype.Trim = function(){  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}  

/****字符串的截空操作----end-----***/
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
	
/**
 * 隐藏有右边服务提示栏目
 */
function hidenService(){
	$("#service").hide();
}
/**
 * 绑定Ajax的显示的数据字典显示值，前提是dictval.js要存在
 * @param dict_code 数据字典名如:BM-001
 * @param option_code   编码值
 * @returns {String}  对应的显示值
 */
function getDictShow(dict_code,option_code){
	var val="";
	if(dict_code==null  || dict_code.Trim()=="")
		return "必须有数据字典编号";
	option_code=option_code.Trim();
	dict_code=dict_code.Trim();
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


//===========layer简单封装===================
/**
 * 提示后显示,不需要用户确认
 */
function winTips(msg){
	
		layer.msg(msg, {icon: 1,offset: 0, shift: 6});
}
/**
 * 成功后提示，需要用户确认
 * @param msg
 */
function alertOk(msg,call){
	if(call){
		layer.alert(msg, {icon: 1,skin: 'layui-layer-molv'},call)
	}
	else
	  layer.alert(msg, {icon: 1,skin: 'layui-layer-molv'})
}
/**
 * 失败后确认，需要确认
 * @param msg
 */
function alertErr(msg,call){
	layer.alert(msg, {icon: 2,skin: 'layui-layer-molv'},call)
}

/**
 * 询问
 * @param msg
 */
function confirm(msg,call){
	layer.confirm(msg, {icon: 3,skin: 'layui-layer-molv'},call)
}

/**
 * 带文字的加载提示
 * @param msg
 * @returns
 */
function loading(msg){

	 //loading带文字
	 return  layer.msg(msg, {icon: 16,time: 200000});
}


/****
加载一个最简单的iframe弹窗
@parame  tit弹出框标题
@parame  url url链接
@width  height  宽度 高度 数字，不带px
**/
function winOpen(tit,url,width,height){
	if((tit==null)||(trim(tit).length==0))
	{
		tit="兴趣邦";
	}
	if((url==null)||(trim(url).length==0))
	{
		alertErr("页面链接不能为空");
		return;
	}
	if((width==null)||(trim(width).length==0))
	{
		width="700";
	}
	if((height==null)||(trim(height).length==0))
	{
		height="500";
	}
	width=width+"px";
	height=height+"px";	
    layer.open({
    skin: 'layui-layer-molv',
  	type: 2,
  	title: tit,
	//closeBtn:0,//不显示关闭按钮
    shade: 0.8,
	maxmin: true,
   area: [width, height],
   content: url //iframe的url
	})
	
}



//======================session失效判断,全局变量===============================

$.ajaxSetup({   
      contentType:"application/x-www-form-urlencoded;charset=utf-8",   
      complete:function(XMLHttpRequest,textStatus){ 
        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
        if(sessionstatus=="timeout"){ 
                 	 layer.closeAll();//删除掉异常显示层
                 	winOpen("超时登录",root_path+"/resource/admin/view/loginwin.jsp","560","370");
	        
	            return;
	         }   
         }   
    });

//======================表单通用js函数======================
/***
表单校验函数，在$.(function(){})调用进行初始化form元素判断(非必须)，在用非submit提交时，判断是否通过用
 if(!formValidateComm("signupForm").form()){//不通过
	   return;
 }

**/
function formValidateComm(formId,custom_rules){
	if(custom_rules){
		return $("#"+formId).validate({
			errorPlacement: customErr,
			success: function( error, element ) {},
			rules:custom_rules
		 });//validate() end
	}
  	return $("#"+formId).validate({
			errorPlacement: customErr,
			success: function( error, element ) {}
		 });//validate() end
}

/**
自定义错误显示,用layer.js的提示判断，必须实现引入layer.js类
**/
var errmsg="";
function customErr(error, element){//自定义错误类型
	 
		 if (element.is(':radio') || element.is(':checkbox')) { //如果是radio或checkbox，选择最后一个
			 var ename=element.attr("name");
			 var s=$("input[name="+ename+"]").last()
				element=s;
		  }
		 if(error.text()!=""){//有错误，则先判断有无隐藏错误提示，有就显示，无则创建
			 if(errmsg!=error.text()){
				 $("#tips_"+element.attr("id")).remove();
			 }
			 errmsg=error.text();
			if( $("#tips_"+element.attr("id")).is(":hidden"))
				$("#tips_"+element.attr("id")).show();
			else{
				
				  layer.tips(error.html(), "#"+element.attr("id"),{tipsMore :true,time:300000000,id:'tips_'+element.attr("id")});
			}
				 //创建一个有id的tips,主要防止生成多个
	          
		  }//if(error.text()!="") end
		 else{
			    //无错，则隐藏错误提示 jquery能容错可能不存在的元素
			  $("#tips_"+element.attr("id")).hide();
		 }//if(error.text()!="") else end
					  
}





/***
 * ajax表单保存
 targetUrl:要提交的url
 formSerialize:form序列化
 changeFieldOrGoUrl：
 ajax提交后有两种可能，一是停留在原页面，一是跳转到其他页面
 1、如果是停留在原页面，我们不刷新页面的话，可能后台数据要赋值给前台表单
 这里changeFieldOrGoUrl传递的是二维数组。如new Array(["id","test.id"],["name","test.name"])
 二维里面的是form表单元素id和后台数据数据id的对应关系，不支持radio chaeck赋值
 2、如果是跳转页面，changeFieldOrGoUrl是一个url字符串
3、 如果停留在页面而且没有值交互，则不传入changeFieldOrGoUrl参数：function saveAjaxComm(targetUrl,formSerialize)
 eg:
	 function save(){
		var formSerialize=$('#form').serialize();
		var url="/xbsoft/demo/saveAjax.do";
		var changeField=new Array(["id","test.id"]);
		var goUrl="/xbsoft/demo/list.do";
		saveAjaxComm(url,formSerialize,changeField);
	}
 */



function saveAjaxComm(targetUrl,formSerialize,changeFieldOrGoUrl,loadMsg){
	var loadIndex;
	if(loadMsg){

		loadIndex=loading(loadMsg);

	}
	 $.ajax({
         type: "post",
         url: targetUrl,
         data: formSerialize,
         dataType: "json",
         async:true,//设置为异步
         success: function(data){
        	 if(loadMsg){
        			
        		 layer.close(loadIndex);
        	 }
                	layer.alert("保存成功", {icon: 1,skin: 'layui-layer-molv'},
                			function(index){//回调函数
             
                		   //从后台返回值填充页面表单
                        if(!changeFieldOrGoUrl){
                        	saveAjaxComm_after();//自定义函数
                        	 layer.close(index);
                            return;
                        }
                        if(changeFieldOrGoUrl==""){
                        	
                        }	
                        else if(changeFieldOrGoUrl instanceof Array  ==false){//不是数组，则是返回url
                        	document.location=changeFieldOrGoUrl;
                        	 layer.close(index);
                        	return;
                        }
                        else if(changeFieldOrGoUrl instanceof Array  ==true){//数组
                            //赋值
                            for(var i=0;i<changeFieldOrGoUrl.length;i++){
                        		var obj=changeFieldOrGoUrl[i];
                        		$("#"+obj[0]).val(eval("data."+obj[1]));
                        		
                        	}
                        }
                    
                        
                        
                        saveAjaxComm_after();//自定义函数
                        layer.close(index);
                	});//end function(inedx)
                 
                
                  },
          error:function(XMLHttpRequest, textStatus, errorThrown){
        	  if(loadMsg){
         		 layer.close(loadIndex);
         	 }
        	  alertErr("保存失败:"+getAjaxException(XMLHttpRequest.responseText));
          }
         

     });
}

/**
 * 通用保存成功后调用的自定义函数，如果通用保存无法满足业务需求（如关闭弹出框），在加载页面可覆盖这个函数
 */
function saveAjaxComm_after(){
	
}

 /**
  * 列表页面通用删除，不刷新页面，删除数据后，直接删除tr
  * @param url  删除对应的URL
  * @param jsonParamData  携带的参数，用json形式传递，如:{"id":"1","name":2}
  * @param tr_id  对应要删除的rr_id
  * eg:
  * delAjaxComm("/xbsoft/demo/delAjax.do",{"id":id},"tr_"+id);
  */
	function delAjaxComm(url,jsonParamData,tr_id){
		 $.ajax({

	         type: "GET",
	         url: url,
	         data: jsonParamData,
	         dataType: "json",
	         success: function(data){
	                    alertOk("删除成功",function(index){
	                    	  $("#"+tr_id).remove();
	                    	  layer.close(index);
	                    	  delAjaxComm_after();
	                    });
	                  
	                  },
	          error:function(XMLHttpRequest, textStatus, errorThrown){
	        	  alertErr("删除失败:"+getAjaxException(XMLHttpRequest.responseText));
	          }         

	     });
	}
/**
 * 删除成功后激发，引用页可覆盖实现
 */
function delAjaxComm_after(){
	
	
}
	
	
//=========================分页通用函数=====================
/**
   url:分页的url
	formId 包含list列表的form对应的id
	contentId:绑定循环列表内容的id
	ajaxDataId:后台反馈回来的分页对象的id  ModelMap.put(id,data)
	pageSplitBarID:对应分页工具条的id
	isShowTj:是否显示分页里面的统计信息，如好多条，每页记录数，页面跳转等
	不传入或者为false时不显示
	**/

	function   ajaxListComm(url,formId,contentId,ajaxDataId,pageSplitBarID,isShowTj){
	
		 $.ajax({

	         type: "post",
	         url: url,
	         data:$('#'+formId).serialize(),
	         dataType: "json",
	         success: function(data){
	        	 $("#"+contentId).html("");//清空数据
	        	 var content = ''; 
				 //多个循环
				 var list;	
				 try {
					 list=eval("data."+ajaxDataId+".list");
					}
				 catch(error) 
		           {
					 alert("不存在["+"data."+ajaxDataId+".list"+"]数据区"+error);
					 return;
					} 
					
				 var content="";
                      $.each(list, function(index, obj){
                    	  content+=rowRender(index,obj,formId)
                      });
                   
	                    $('#'+contentId).html(content);//展示数据
	                    afterListRender();
	                    var page=data.page;
	                    creatPageSplitBar(formId,pageSplitBarID,page.pages,page.pageNum,page.total,page.pageSize,isShowTj);
	                    
	        	 
	             },
	          error:function(XMLHttpRequest, textStatus, errorThrown){
	        	  alertErr("列表初始化失败:"+getAjaxException(XMLHttpRequest.responseText));
	          }
	         
			
	    });

	}
	
	/**
	 * 数据渲染后重载这个对象
	 */
	function afterListRender(){
		
		
	}

	
	/***
	创建分页工具条的内容 ajax和非ajax分页通用
	**/
	function creatPageSplitBar(formId,pageSplitBarID,totPages,curPage,totNum,pageSize,isShowTj){
		    var div="";
		    var hiddenDiv="";
		    if(isShowTj==false){//不显分页相关信息
		    	hiddenDiv=" style='display:none'";
		    }
		    div+="<div id='"+pageSplitBarID+"_1' ></div>";
		    div+="<div id='"+pageSplitBarID+"_2'  "+hiddenDiv+"></div>";
		   $("#"+pageSplitBarID).html(div);
		   creatPageToolBarAjax(formId,pageSplitBarID+"_1",totPages,curPage);
		   creatPgaeInfoAjax(formId,pageSplitBarID+"_2",totNum,totPages,pageSize,curPage);
	}
	/**
	创建分页工具条-页面链接
	**/
	function creatPageToolBarAjax(formId,eid,totPages,curPage){
		   $("#"+eid).pagination(totPages /**总页数**/, {
               
				 prev_text: "« 上一页", /**中文替换**/
                 next_text: "下一页 »",/**中文替换**/
				  num_edge_entries:1,
				  current_page: curPage-1,/**当前页**/
                  items_per_page:1, // Show only one item per page
				  callback:function(curPages) {/**回调函数,函数参数是当前页数**/
					   //给对应的form的当前页赋值
					     $("#"+formId).find("input[name='pageNum']").val(curPages+1);
					     goPage(formId);
				  }
       });
	}


	
	/**
	创建页面信息
	**/
	function creatPgaeInfoAjax(formId,eId,totNum,totPages,pageSize,curPage){
		var html="";
		html+="共:"+totNum+"条;";
		html+="每页<input type='text' class='input_text' name='pageSize'  value='"+pageSize+"' onchange='changePageSize(this,"+pageSize+")'/>条；";
		html+="第 <input type='text' class='input_text' name='pageNum'  value='"+curPage+"'/ onchange='changePageNum(this,"+curPage+")'>页";
		html+="<input type='button' class='input_button' value='跳转'  onclick='goPage("+formId+")'>";
		$("#"+eId).html(html);
	}
	

	
	/**
	 * 修改每页多少条记录数，只能为正整数
	 * @param val
	 * @param pageSize
	 */
	function  changePageSize(obj,pageSize){
		var val=obj.value;
		val=val.Trim();
		var reg=/^[1-9]\d*$/;
		if(!reg.test(val)){
			alert("请输入正整数");
			obj.value=pageSize;
			return;	
		}
	}
	/**
	 *修改 跳转到哪个页面，只能为正整数
	 * @param obj
	 * @param pageSize
	 */
	function changePageNum(obj,pageNum){
		var val=obj.value;
		val=val.Trim();
		var reg=/^[1-9]\d*$/;
		if(!reg.test(val)){
			alert("请输入正整数");
			obj.value=pageNum;
			return;	
		}
	}
	
	/**
	ajax 渲染每一行的数据,引用页面覆盖
	formId：如果一个页面有多个列表时候，可以根据不同的formId生成不同的列表渲染值
	只有一个列表则此值没有意义
	**/
	function rowRender(index,data,formId){
		 var content="";
	 	return content;
	}

	
	
	/**
	引用页面要重载这个函数,进行数据提交，如果一个页面有多个分页列表，form有价值
	**/
	function goPage(formId){
		
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
	选择培训科目
	type:类型，只能选择单个1，可选择多个  2
	idsVal：多选的已选择的id值组合，格式如下：,1,2,3,   单选不传
	namesVal:多选的显示值集合，格式如下：钢琴,吉他
	**/
	function chooseKm(type,idsVal,namesVal){
		if(!type)type="1";
		var url=root_path+"/resource/admin/view";
		if(type=="1"){
		 	url+="/single_km.jsp";
			winOpen("选择培训科目",url,"300p","500");
		}
		else if(type=="2"){
			
			url+="/mul_km.jsp?km_ids="+idsVal+"&km_names="+namesVal;
			
			winOpen("选择培训科目",url,"700","550");
		}
	}
	
	/**
	 * 通用ajax封装
	 */
	function commAjax(url,dataJson,msg){
		 $.ajax({
   	         type: "post",
   	         data:dataJson,
   	         url:url ,
   	         dataType: "json",
   	         success: function(data){
   	               alertOk(msg,function(index){
   	            	   layer.close(index);
   	            	   commAjaxAfter();
   	               });
   	         },
   	      error:function(XMLHttpRequest, textStatus, errorThrown){
   	    	  alertErr("操作失败:"+getAjaxException(XMLHttpRequest.responseText));
   	      }
		 } );
	}
	
	function commAjaxAfter(){
		
	}