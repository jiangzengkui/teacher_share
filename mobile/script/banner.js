/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
//String(-this.bannerIndex*this.moveLength)+'rem'
$(function() {   
	
	var banner={
		allLength:$('.banner img').size(),
		content:$('.banner').html(),
		bannerIndex:0,
		playTime:4000,
		bannerHtml:function(){
			$('.banner').html(this.content+this.content)
		},
		move:function(stu){
			if(stu){
				if(this.bannerIndex<=0){
					this.bannerIndex=this.allLength
				}
			}else{
				if(this.bannerIndex>=this.allLength*2-1){
					this.bannerIndex=this.allLength-1
				}
			}
			$('.banner').css('margin-left',String(-this.bannerIndex*16)+'rem')
			stu?this.bannerIndex-=1:this.bannerIndex++
			$('.banner').stop().animate({marginLeft:String(-this.bannerIndex*16)+'rem'},500)
			var i=0
			if(this.bannerIndex>=this.allLength){
				i=this.bannerIndex-this.allLength
			}else{
				i=this.bannerIndex
			}
			$('#banner>.r_cont>div').attr('class','').eq(i).attr('class','in')
			
		},
		play:function(){
			this.bannerHtml()
			//$('.tab_btn_left').click(function(){banner.move(true)})
			//$('.tab_btn_right').click(function(){banner.move(false)})
			setInterval(function(){banner.move(false)},this.playTime)
		}
	}
	banner.play()
	
	$("#banner").swipe({
		swipe:function(event, direction) {
			if('left'==direction){
				banner.move(false)
			}else if('right'==direction){
				banner.move(true)
			}
		},
		threshold:20
	})
})
