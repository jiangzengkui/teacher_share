/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
//只需要给分享按钮添加样式 .share
$(function(){
	var stu=true
	var html='<div id="share"><div class="text">点击这里分享<strong>到微信好友/朋友圈</strong>吧!</div></div>'
	function action(){
		if(stu){
			$('body').append(html)
			$('#share').click(function(){
				$('#share').fadeOut(200)
			})
		}
		stu=false
	}
	$('.share').click(function(){
		action()
		$('#share').fadeIn(200)
	})
})