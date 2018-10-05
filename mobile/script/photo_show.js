/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
$(function(){

	//------video------
	var photo_show={
		
		all_length:37,
		index:0,
		photo_url:['../upload/ad13.jpg','../upload/ad13.jpg','../upload/ad13.jpg','../upload/ad13.jpg','../upload/ad13.jpg','../upload/ad13.jpg'],
		length:function(){return this.photo_url.length},
		update:function(){
			
			var i=this.length()
			
			$('#pic_list').css('width',String($(window).width()*i+10)+'px')
			//alert($('#pic_list').css('width'))
			this.update=$('#pic_list').html()
			for(var j in this.photo_url){
				this.update+='<div class="pic_cont"><img src="'+this.photo_url[j]+'" /><span></span></div>'
			}
			$('#pic_list').html(this.update)
			this.update=''
			
		},
		move:function(stu){
			if(stu){
				if(this.index<=0){
					this.index=0
					alert('已经是第一张了！')
				}else{
					this.index--
				}
			}else{
				if(this.index>=this.length()-1){
					this.index=this.length()-1
					alert('已经是最后一张了！')
				}else{
					this.index++
				}
			}
			$('#pic_list').stop().animate({marginLeft:String(-this.index*16)+'rem'},500)
			$('#p_show .text strong').html(this.index+1)
		},
		play:function(){
			
			$('#p_show .close').click(function(){$('#p_show').fadeOut(200);window.visible()})
			$('#photo_list .p[class!="p video"]').click(function(){
				window.visible(1)
				this.index=$(this).index()
				$('#pic_list').stop().animate({marginLeft:String(-this.index*16)+'rem'},100)
				$('#p_show .text strong').html(this.index+1)
				$('#p_show').fadeIn(200)
			})
			
			$('#p_show .text strong').html(this.index+1)
			this.update()
			$('#p_show .text span').html(this.all_length)
			$("#pic_list").swipe({
				swipe:function(event, direction) {
					if('left'==direction){
						photo_show.move(0)
					}else if('right'==direction){
						photo_show.move(1)
					}
				},
				threshold:20
			})
		},
	}	
	photo_show.play()
	//photo_show.photo_url ajax更新之后在执行一次photo_show.update()
})