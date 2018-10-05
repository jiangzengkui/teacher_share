/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for wechat
*/
$(function(){
	$('body').append('<audio id="audio"><audio>')
	audio=document.getElementById('audio')
	
	
	
	
	
	audio.onplaying=function(){
		//time=audio.duration
		
		$('.audio').attr('src','../../images/audio.jpg')
		$('.audio_top').attr('src','../images/t_audio.png')
		
		if(audio_btn.attr('class')=='audio'){
			audio_btn.attr('src','../../images/audio.gif')
		}else{
			audio_btn.attr('src','../images/t_audio.gif')
		}
	}
	audio.onended=function(){
		if(audio_btn.attr('class')=='audio'){
			audio_btn.attr('src','../../images/audio.jpg')
		}else{
			audio_btn.attr('src','../images/t_audio.png')
		}
	}
	function playAudio(url){
		$('#audio').attr('src',url)
		audio.play()
	}
	$('.audio').click(function(){
		$('.audio').attr('src','../../images/audio.jpg')
		playAudio($(this).attr('url'))
		audio_btn=$(this)
	})
	$('.audio_top').click(function(){
		$('.audio_top').attr('src','../images/t_audio.png')
		playAudio($(this).attr('url'))
		audio_btn=$(this)
	})
	
	
	
	//---------
	
	var video=document.getElementById('video_show_controls')
	$('.close').click(function(){
		$('#ITA_media').fadeOut(200)
		$('#video_show,#pic_show').hide(0)
		window.visible()
		video.pause()
	})
	
	
	video.onended=function(){
		window.visible()
		$('#ITA_media').fadeOut(200)
		$('#video_show,#pic_show').hide(0)
	}
	$('.media .video').click(function(){
		audio.pause()
		audio_btn.attr('src','../../images/audio.jpg')
		ITA_show('video',$(this).attr('url'))
	})
	
	$('.media>img').click(function(){
		ITA_show('picture',$(this).attr('url'))
	})
	
	function ITA_show(type,url){
		window.visible(1)
		$('#ITA_media').fadeIn(200)
		if(type=='video'){
			$('#video_show').show(0).find('video').attr('src',url)
			video.play()
		}else if(type=='picture'){
			$('#pic_show').show(0).find('img').attr('src',url)
		}
		
	}
	
	
	//执行顺序问题可能涉及到audio_btn没有属性attr
	
	
	
	//ITA_media
	//pic_show
	//video_show
	//video_show_controls
	//.close
	
	//.media .video
	//.media>img
})