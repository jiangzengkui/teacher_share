

/**
初始化选择
**/
function initSelect(){
//--------lightbox高度初始化
	(function($){
		var wh=$(window).height()
		$('.class_select,.c_s_left,.c_s_right').height(wh-94)
	})(jQuery)
	//--------选择查询分类
	$('#top_search .left').click(function(){
		$('#menu_select').slideDown(200).delay(2000).slideUp(200)
		hide_all(1)
	})
	//--------class_list_institutions,class_list_course,class_list_teacher
	$('#menu_select b').click(function(){
		$('#menu_select').stop().slideUp(200)
		$('#top_search .left span').html($(this).html())
		
		hide_cont_all()
		var type=$('#top_search .left span').html()
		if(type=='课程'){
			
			$('.class_tips').hide(0).eq(1).show(0)
			$('#class_list_course').stop().fadeIn(100)
		}else if(type=='机构'){
			
			$('.class_tips').hide(0).eq(0).show(0)
			$('#class_list_institutions').stop().fadeIn(100)
		}else if(type=='个体教师'){
			
			$('.class_tips').hide(0).eq(2).show(0)
			$('#class_list_teacher').stop().fadeIn(100)
		}
	})
	$('#all_course .c_s_left dd').click(function(){
		$('#all_course>.c_s_left>dd').attr('class','').eq($(this).index()-1).attr('class','in')
		$('#all_course>.c_s_right>div').hide(0).eq($(this).index()-1).show(0)
	})
	//--------------主选择菜单 class_menu
	function hide_cont_all(){
		$('#class_list_institutions,#class_list_course,#class_list_teacher').stop().fadeOut(100)
		//接受新查询是考虑清空所有列表以减轻浏览器负担
	}
	function hide_all(stu){
		$('#all_course,#all_address,#xqb_select,#select_institutions,#select_teacher,#select_course').stop().fadeOut(100)
		window.visible(1)
		$(window).scrollTop(0)
		if(stu){
			window.visible()
		}
	}
	
	$('#class_menu li').click(function(){
		hide_all()
		var i=$(this).index()
		if(0==i){
			$('#all_course').stop().fadeIn(100)
		}else if(1==i){
			$('#all_address').stop().fadeIn(100)
		}else if(2==i){
			$('#xqb_select').stop().fadeIn(100)
		}else if(3==i){
			var type=$('#top_search .left span').html()
			if(type=='课程'){
				$('#select_course').stop().fadeIn(100)
			}else if(type=='机构'){
				$('#select_institutions').stop().fadeIn(100)
			}else if(type=='个体教师'){
				$('#select_teacher').stop().fadeIn(100)
			}
		}
	})
	
	//-------------多选
	$('#select_institutions dl dd').click(function(){
		$(this).toggleClass('in');
		isSelected($(this));
	})
	//-------------单选
	$('#select_teacher .option_box:eq(1) .option,#select_teacher .option_box:eq(2) .option,#select_course .option_box:eq(1) .option').click(function(){
		var i=$(this).index()
		$(this).parent().find('.option').removeClass('in').eq(i).addClass('in');
		
		isSelected($(this));
		
	})
	//-------------混合多选
	$('#select_teacher .option_box:eq(0) .option,#select_course .option_box:eq(0) .option,#select_course .option_box:eq(2) .option').click(function(){
		$(this).toggleClass('in')
		isSelected($(this));
	})
	//-------------单选
	$('#xqb_select .c_s_right dd').click(function(){
		var i=$(this).index()
		$(this).parent().find('dd').removeClass('in').eq(i).addClass('in')
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
	//--------排序-提交
	$('#xqb_select .c_s_right dd').click(function(){
		//提交动作
		hide_all(1)
	})
	//--------筛选机构-提交
	$('#select_institutions .c_s_right .button').click(function(){
		//提交动作
		hide_all(1)
	})
	//--------筛选课程-提交
	$('#select_course .c_s_right .button').click(function(){
		//提交动作
		hide_all(1)
	})
	//--------筛选教师-提交
	$('#select_teacher .c_s_right .button').click(function(){
		//提交动作
		hide_all(1)
	})
	
	
	//--------course_type
	$('#course_type li').click(function(){
		var i=$(this).index()
		$('#course_type li').attr('class','').eq(i).attr('class','in')
		$('.course_cont').hide(0).eq(i).show(0)
	})
	
}

/**
筛选条件判断选中问题
**/
function isSelected(obj){

	var isSelect=obj.hasClass("in");//是否选中
	var inputId=obj.attr("inputId");//对应的form元素的值
	var inputVal=obj.attr("inputVal");//对应选中的值
	if(isSelect==true){//选中
		if(inputId){//存在
		    $("#"+inputId).val(inputVal);
		}
	}
	if(isSelect==false){//未选中
		if(inputId){//存在,则清空
		    $("#"+inputId).val("");
		}
	}
	
	
	  
}

/**
选择科目
**/
function selectKm(km_id,km_name){
	$("#s_km").html(km_name);
	$("#km_id").val(km_id);
	formSubmit();
}
/**
选择地区
**/
function selectArea(area_id,area_name){
    $("#s_area").html(area_name);
	$("#area_id").val(area_id);
	formSubmit();
}
/**
选择排序
**/
function orderSelect(order_id,order_name){
	
	 $("#s_order").html(order_name);
	$("#order_type").val(order_id);
	formSubmit();
}
/**
选择课程
**/
function selectCourseType(type){
	$("#course_type").val(type);
	formSubmit();
}
/**
适合年龄
**/
function selectAge(obj){
	$("#where_age").val(obj.value);
}
/**
表单提交
**/
function formSubmit(){
 	var formSerialize=$('#form').serialize();
	alert("提交");
	alert(formSerialize);
	
}