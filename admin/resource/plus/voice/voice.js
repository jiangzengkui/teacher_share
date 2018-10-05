/**
 * 引用说明：
 * 
引用页面用用图片代替播放器，支持多个声音文件,但声音文件支持暂停，多声音不支持
对html引用要求：
<img  cass="必须包含audio,通过这个来定位" src="和stopPicUrl值一致" url="播放的声音文件源"   initPlay="页面加载时是否播放，true或者false">
**/
var stopPicUrl=root_path+"/resource/plus/voice/audio.png";//停止后播放图标
var playPicUrl=root_path+"/resource/plus/voice/audio.gif";//播放图标
 var record_index="";//录音界面layer索引
var voice_num=0;//声音个数
var waiting_ts_index="";//等待提示layer索引
$(function(){
	$('body').append('<audio id="audio"><audio>');
	 var audio=document.getElementById('audio'); 
	  voice_num=$(".audio").size();
	  
	  //遍历，寻找默认要播放的
	  $.each($(".audio"),function(index,data){ 

	     if($(data).attr("initPlay")=="true"){//初始化需要播放的
			 play(data);
		 }
	  });
	 
	
});
/**
 * 防止声音文件也是用ajax加载的,如果是则要加载此方法
 */
function setVoiceNum(){
	 voice_num=$(".audio").size();
}

function initVoice(){
	 voice_num=$(".audio").size();
	  
	  //遍历，寻找默认要播放的
	  $.each($(".audio"),function(index,data){ 

	     if($(data).attr("initPlay")=="true"){//初始化需要播放的
			 play(data);
		 }
	  });
	
}

/**
点击图片，播放或者停止
**/
function play(obj){
	var imgAudio=$(obj);
	
	if(imgAudio.attr("src")==stopPicUrl){//停止状态
		playAudio(imgAudio);
		stopAll();
	
	
	}
	else{//正在播放
	  stopAll();
	  stopAudio();
	}
	    
   
}


/**
停止所有播放
**/
function stopAll(){
	$(".audio").attr("src",stopPicUrl);
}

/**
开始播放音频
**/
function playAudio(imgAudio){
	 var voiceUrl=imgAudio.attr("url");//声音文件路径 
	//如果声音文件大于1个或者以前没有链接，必须添加链接
  
	if(!$('#audio').attr('src') || $('#audio').attr('src')==""  || voice_num>1){
		$('#audio').attr('src',voiceUrl);

	}
	waiting_ts_index=loading("正在缓冲...");
	audio=document.getElementById('audio'); 
	//开始播放监听
	 audio.onplaying=function(){
		imgAudio.attr("src",playPicUrl);//改成播放状态
		layer.close(waiting_ts_index);
	}


	audio.play();//音频播放
	
	//播放完毕监听
	  audio.addEventListener('ended', function () {  
		    stopAll();
	}, false);
	
}

/**
停止播放
**/
function stopAudio(){
		audio.pause()
}


function make_voice(){
	record_index=layer.open({
        type: 1
        ,content: '<span>录音前，请打好腹稿</span>'+
        '<input type="button" class="recorded"  value="点击开始录音" isRecord="0" onclick="record(this)">'
        ,anim: 'up'
        ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;'
    });	
}

/**
 * 点击录音图标
 * @param obj
 */
function record(obj){
	var record=$(obj);
	if(record.attr("isRecord")=="0"){
		record.val("正录音，再次点击结束录音");
		record.attr("isRecord","1");
		record.attr("class","recording");
		startRecord();
	}
	else{
		record.val("点击开始录音");
		record.attr("isRecord","0");
		record.attr("class","recorded");
		stopRecord();
	}
	
}
//开始录入
function startRecord(){
	
}
//结束并上传
function stopRecord(){
	
}


