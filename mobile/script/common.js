/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
(function(doc,win) {
	var docEl=doc.documentElement,
	resizeEvt='orientationchange' in window ? 'orientationchange' : 'resize',
	recalc=function(){
		var clientWidth=docEl.clientWidth;
		if(!clientWidth) return;
		if(clientWidth<=320){
			docEl.style.fontSize='20px'
		}else{
			docEl.style.fontSize=20*(clientWidth/320)+'px';
		}
	};
	if(!doc.addEventListener)return;
	win.addEventListener(resizeEvt,recalc,false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
window.visible=function(stu){
	if(stu){
		$('html,body').css({"height":"100%","overflow":"hidden"})
	}else{
		$('html,body').css({"height":"auto","overflow":"auto"})
	}
}