

/***
微信分享能
share_type 1  体验课
           2  特价选购课
		   3  优惠券
		   4  兴趣邦红包
**/
var share_tag=true
var html="";
/**
微信分享提示
**/
function wx_share(share_type){
	 html="";
	if(share_type=="1")
	  html='<div id="share"><div class="text">先分享到<strong>到微信好友/朋友圈</strong>在里面点击报名!</div></div>';
	else if(share_type=="2")
	  html='<div id="share"><div class="text">先分享到<strong>到微信好友/朋友圈</strong>在里面点击抢购!</div></div>';
   else if(share_type=="3")
	  html='<div id="share"><div class="text">先分享到<strong>到微信好友/朋友圈</strong>在里面点击认领!</div></div>';
    else if(share_type=="4")
	  html='<div id="share"><div class="text">先分享到<strong>到微信好友/朋友圈</strong>在里面点击抢购!</div></div>';
  else{
	    html='<div id="share"><div class="text">点击这里分享<strong>到微信好友/朋友圈</strong>吧!</div></div>';
  }

   wx_share_action();
   $('#share').fadeIn(200)
}

function wx_share_action(){
		if(share_tag){
			$('body').append(html)
			$('#share').click(function(){
				$('#share').fadeOut(200)
			})
		}
		share_tag=false
	}