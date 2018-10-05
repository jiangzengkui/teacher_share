/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
$(function(){
	$('.cou_list').each(function(index) {
		i=$(this).hasClass('no')
		if(i){
			$('#cou_inFM li').eq(index).find('dd').addClass('cou_text_through')
		}
    });
})