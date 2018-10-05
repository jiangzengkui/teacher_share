/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/


var cookie_name="xqb_user_search";//保存cookie名
$(function(){	
	$('.search,#top').click(function(){
		
		$('#search').fadeIn(200)
		$('#top_search .search').focus()
		window.location.href='#search'
		location_change()
	})
	$('#top_search .left').click(function(){
		$('#menu_select').slideDown(200).delay(2000).slideUp(200)
	})
	$('#menu_select b').click(function(){
		$('#menu_select').stop().slideUp(200)
		  $('#top_search .left span').html($(this).html())
		  $("#search_type").val($(this).attr("search_type"));
	})
	$('#search .button').click(function(){
		$('#search').fadeOut(200)
		$('body').scrollTop(0)
		un_location_change()
	})
	//--------------------搜索检测-------------------//页面不可存在其他空链接或者锚记
	var location_change_action=null
	function location_change(){
		window.visible(1)
		$(window).scrollTop(0)
		window.location.href='#search'
		location_change_action=setInterval(function(){
			var i=window.location.href.indexOf("#search")
			if(i==-1){$('#search .button').click()}
		},500)
	}
	function un_location_change(){
		window.visible()
		clearInterval(location_change_action)
	}
	
});


/***
显示历史记录-初始化时候加载
**/
function history(){
	var cont=getHisFrommCookie();
	if(cont==""){//没有历史记录
	 return;
	}
	$("#his_title_div").show();
	 
	var sz=cont.split(";");
	var htcont="";
	for(i=0;i<sz.length;i++){
		var sub=sz[i].split("`");
		htcont+="<a href='javascript:hisQuery(\""+sub[0]+"\",\""+sub[1]+"\")'  class='hos'>"+sub[1]+"</a>";
	  
	}
	$("#his_div").html(htcont);
}

/**
点击历史 查询
**/
function hisQuery(search_type,search_cont){
	var url=getUrl(search_type,search_cont);
	if(url!="")
	 document.location=url;
}
/**
点击搜索按钮查询
**/
function clickQuery(){
	var search_type=$("#search_type").val();
	var search_cont=$("#search_cont").val();
	if(search_cont==""){
	   alertErr("请输入查询内容");
	   return;	
	}
	//设置cookie
	setHisCookie(search_type,search_cont)
		
	var url= getUrl(search_type,search_cont);
	if(url!=""){
	  document.location=url;
	}
	
}

/**
得到查询的url
**/
function getUrl(search_type,search_cont){

	var url="";
	if(search_type=="1"){//机构
		
	}
	else if(search_type=="2"){//课程
		
	}
	else if(search_type=="3"){//教师
		
	}
	return url;
}

/**
设置cookie信息
**/
function setHisCookie(search_type,search_cont){
    var newCont=search_type+"`"+search_cont
	var cookieCont="";//新内容
	var user_search=getHisFrommCookie();//以前保存的
	if(user_search!=""){//和历史数据对比，最多成8条，最新的放入最前面
		var sz=user_search.split(";");
		cookieCont=newCont;
		var real_num=0;//真正条数
		for(i=0;i<sz.length;i++){
			if(sz[i]==newCont){//内容相同
			   continue;
			}
			cookieCont+=";"+sz[i];
			real_num++;
			if(real_num==7)
			   break;
		}
		
	}
	else{
		cookieCont=newCont;
	}
	//alert(cookieCont);
	$.cookie(cookie_name,cookieCont, { path: '/' });
}
/**
从cookie获得历史信息
**/
function getHisFrommCookie(){
	var user_search=$.cookie(cookie_name);
	//alert(user_search);
	if(user_search){
		return user_search;
	}
	return "";
 // var cont="1`学帮科技;1`大宝培训;2`舞蹈;3`李鑫雨;2`芭蕾";	
  //cont="";
 // return cont;
}