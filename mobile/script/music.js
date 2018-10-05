	// JavaScript Document
$(document).ready(function () {
            //$("#img").click(function () {
                $("#music_img").rotate();
				music_init();
           // });
        });
		
	/**
 * Created by YD on 5/7/15.
 * Base on Jquery
 */
var ele ;
var timer;
$.fn.extend({
    rotate: function () {
        ele = this ;
       timer= setInterval('singleRotate()',20);
    },
	 no_rotate: function () {
        ele = this ;
        clearInterval(timer);
    }
	
});

var degree = 0;
var music_img_path="../images/music.png";
var no_music_img_path="../images/music_no.png";
function singleRotate() {
    degree = degree + 50 * Math.PI / 180;
    ele.css("transform","rotate("+degree+"deg)");

}

/**
音乐出初始化
**/
function music_init(){
	$('body').append('<audio id="music_audio" loop="loop"><audio>');
	var musicPath=getMusicPath();
	if(musicPath==""){
  		return;	
	}
	$('#music_audio').attr('src',musicPath);
	musicPaly();
}

function musicPaly(){
	var audio=document.getElementById('music_audio'); 
	audio.play();
}

function musicStop(){
	var audio=document.getElementById('music_audio'); 
	audio.pause();
}
/**
播放
**/
		
function playMusic(obj){
			var music=$(obj);
			var srcpath=music.attr("src");
			if(srcpath.indexOf("music.png")==-1){
				music.attr("src",music_img_path);
				music.rotate();
				musicPaly();
			}
			else{
				music.attr("src",no_music_img_path)
				music.no_rotate();
				musicStop();
			}
			
}

/**
返回背景音乐，页面必须覆盖此方法，如果不需要背景音乐，则返回空字符串
**/
function getMusicPath(){
	return "../voice/1.mp3";
}