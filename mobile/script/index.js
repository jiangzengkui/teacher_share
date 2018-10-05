/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
//hot-list
$(function(){
	gundong();
});

function gundong(){
	var hotlist={
		allLength:$('.hot_list a').size(),
		content:$('.hot_list').html(),
		bannerIndex:0,
		playTime:3000,
		bannerHtml:function(){
			$('.hot_list').html(this.content+this.content)
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
			$('.hot_list a').eq(0).css('margin-top',String(-this.bannerIndex)+'rem')
			stu?this.bannerIndex-=1:this.bannerIndex++
			$('.hot_list a').eq(0).stop().animate({marginTop:String(-this.bannerIndex)+'rem'},500)
		},
		play:function(){
			this.bannerHtml()
			setInterval(function(){hotlist.move(false)},this.playTime)
		}
	}
	hotlist.play()	
}