/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for manage
*/
$(function(){
	var menu={
		default:'template/index.html',
		//default:'template/3.4/1.2.html',
		load:{
			loadobj:$('#loading'),
			start:function(){
			//	$('#main').stop().hide(200)
		    // 	menu.load.loadobj.fadeIn(500)
				console.log(menu.content)
			}
		},
		init:function(obj){
			obj.click(function(){
				if($(this).attr('url')){
					menu.extend($(this).attr('url'))
				}
			})
			menu.extend(menu.default)
		},
		extend:function(url){
			menu.load.start()
			$.get(url,{'data':'datainfo'},function(req){
				menu.load.loadobj.stop().fadeOut(500,function(){
					$('#main').html(req).stop().show(200)
				})
			})
		}
	}
	
	//注册事件并初始化
	//menu.init($('body a'))
	
	//其他菜单链接 除在DOM添加url属性外 可以直接调用一下方法，示例：
	//menu.extend('template/1.4/1.html')
	
	//方法全局化，现在可以在任何地方使用该方法了
	//使用方法为：window.link.extend('template/5.4/1.html')
	//window.link=menu
})