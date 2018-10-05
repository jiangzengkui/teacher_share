/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
$(function(){
	//------video------
	$('#video .mask').click(function(){
		$(this).fadeOut(200)
		document.getElementById('ins_video').play()
	})
	//------bottom------
	var ins_menu_stu=true
	
	$('#ins_bottom .inFM').click(function(){
		ins_menu_stu=false
		$('#ins_mask,#ins_menu').stop().fadeIn(200)
		window.visible(1)
	})
	$('#ins_bottom,#ins_mask,#ins_mask,#ins_menu').click(function(){
		if(ins_menu_stu){
			$('#ins_mask,#ins_menu').stop().fadeOut(200)
			window.visible(0)
		}
		ins_menu_stu=true
	})
	
	
	//window.visible
	//#ins_mask
	//#ins_menu
	//#ins_bottom
	//#ins_bottom .inFM
	
	
	
})