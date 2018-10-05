/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for manage
*/
$(function(){
	$('#main a').click(function(){
		if($(this).attr('url')){
			window.link.extend($(this).attr('url'))
		}
	})
	$('#tips .close').click(function(){
		$('#tips').slideUp(200)
	})
})