/*
@author:	xiaolin.wei
@E-mail:	136896100@qq.com
@qq:		136896100
@version:	1.0 for manage
*/
$(function(){
	$('body').append('<audio id="audio"><audio>')
	audio=document.getElementById('audio')
	//var audio_btn=null
	var audio_state=false
	var audio_btn=$('.audio')
	audio.onplaying=function(){
		//time=audio.duration
		audio_btn.attr('src','../images/audio.gif')
		audio_state=true
	}
	audio.onended=function(){
		audio_btn.attr('src','../images/audio.jpg')
		audio_state=false
	}
	function playAudio(url){
		$('#audio').attr('src',url)
		audio.play()
	}
	$('.audio').click(function(){
		if(!audio_state){
			if(audio_btn==$(this)){
				audio.play()
				alert()
			}else{
				$('.audio').attr('src','../images/audio.jpg')
				playAudio($(this).attr('url'))
				audio_btn=$(this)
			}
		}else{
			audio.pause()
			audio_btn.attr('src','../images/audio.jpg')
			audio_state=false
		}
	})
	
	
	//---------
	
})