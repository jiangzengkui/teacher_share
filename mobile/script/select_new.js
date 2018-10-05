$(function(){
	
	$('#class_menu li').click(function(){
		hide_all()
		//kemu,quyu
		var i=$(this).attr('class')
		if('kemu'==i){
			$('#all_course').stop().fadeIn(100)
		}else if('quyu'==i){
			$('#all_address').stop().fadeIn(100)
		}
	})
	$('#all_course .c_s_left dd').click(function(){
		$('#all_course>.c_s_left>dd').attr('class','').eq($(this).index()-1).attr('class','in')
		$('#all_course>.c_s_right>div').hide(0).eq($(this).index()-1).show(0)
	})
	
	//--------课程-提交
	$('#all_course .course').click(function(){
		//提交动作
		hide_all(1)
	})
	//--------区域-提交
	$('#all_address .course').click(function(){
		//提交动作
		hide_all(1)
	})
	
	
	function hide_all(stu){
		$('#all_course,#all_address').stop().fadeOut(100)
		window.visible(1)
		$(window).scrollTop(0)
		if(stu){
			window.visible()
		}
	}
	
	
})