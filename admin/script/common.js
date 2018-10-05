/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
var left_width=170;//左边宽度
var left_widthstr="170px";
var remove_left_widthstr="-170px";
$(function(){
	/**
	$("body").niceScroll({  
		cursorcolor:"#10de7f",
		cursoropacitymin:.3,
		cursorwidth:"10px",  
		cursorborder:"2px solid #fff",
		cursorborderradius:"50px",
		
		
		
	});
	**/
	/*
			http://wenku.baidu.com/link?url=YOLaezvcsaS3hZ7GEEnZYBINWIFmguiQ7SP7KcYP6IqhXtqXtZ-N-WRrWYLGz0stdRX2Ybr6gODNperutIXW1SOeF0k3OLmz3C1OUWKNNtq
			API
		*/ 	
	var xhb_menu_stu=false
	$('#nav_tab').click(function(){
		
	})
	
	$('.nav[msg]').each(function(index, element) {
       
    });
	var menu=0
	$('.nav').click(function(){
		var i=$(this).index()
		if(i==menu){
			if($(this).next('.nav_list').css('display')=='none'){
				//$(this).next('.nav_list').stop().slideDown(300)
			}else{
				//$('.nav_list').stop().slideUp(300)
			}
		}else{
			$('.nav').removeClass('in')
			$(this).addClass('in')
			$('.nav_list').stop().slideUp(0)
			$(this).next('.nav_list').stop().slideDown(0)
			
		}
		menu=i
	})
	$('.nav_list li').click(function(){
		$('.nav_list li').removeClass('in')
		$(this).addClass('in')
	})
	xqb_resize=function(){
		//$('#main').height($(window).height()-155)
		if(xhb_menu_stu){
			$('#top,#bottom').width($(window).width()).css('left','0')
		}else{
			$('#top,#bottom').width($(window).width()-left_width).css('left',left_widthstr)
		}
		/**
		if($(window).width()<1400){
			layer.msg('为了您的体验，<br>您可以收起左边菜单栏，<br>并且不要过度缩放浏览器！', {icon:5})
		}
		**/
	}
	xqb_resize()
	$(window).resize(function(){
		xqb_resize()
	})
	
	$('#service .top').click(function(){
		$('body').animate({scrollTop:'0px'},800)
	})
	$('#service .bottom').click(function(){
		$('body').animate({scrollTop:($(document).height()-$(window).height())},800)
	})
});


/****
加载一个最简单的iframe弹窗
@parame  tit弹出框标题
@parame  url url链接
@width  height  宽度 高度 数字，不带px
**/
function winopen(tit,url,width,height){
	if((tit==null)||(trim(tit).length==0))
	{
		tit="兴趣邦少儿平台";
	}
	if((url==null)||(trim(url).length==0))
	{
		alert("页面链接不能为空");
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
  	type: 2,
  	title: tit,
	//closeBtn:0,//不显示关闭按钮
    shade: 0.8,
	maxmin: true,
   area: [width, height],
   content: url //iframe的url
	})
	
}

/***
普通提示
**/
function winalert(msg){
	layer.alert(msg, {icon:1},
	function(index){
       layer.close(index);
    }
	); //这时如果你也还想执行yes回调，可以放在第三个参数中。
	
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
	
