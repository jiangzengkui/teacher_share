var wxJSSDK={//声明微信全局变量，防止污染外部环境
	version:"1.0",//版本号
	appName:"",//使用当前库的开发者，可以配置应用的名字
	isReady:false,//微信JSSDK是否初始化完毕
	access_token:"",//令牌
	ticket:"",//微信临时票据
	readySucessCall:[],//微信初始化成功后的执行事务
	apiUrl:root_path?root_path:"",//api请求地址根路径
	config:{
		debug:false,//开启调试模式，调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端是才会打印.
		appId:'',//必填，公众号的唯一标识
		timestamp:Math.ceil(new Date().getTime()/1000).toString(),//必填，生成签名的时间戳
		nonceStr:'',//必填，生成签名的随机串
		signature:'',//必填，签名，见附录1
		jsApiList: [
		   "onMenuShareTimeline",//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		   "onMenuShareAppMessage",//获取“分享给朋友”按钮点击状态及自定义分享内容接口
		   "onMenuShareQQ",//获取“分享到QQ”按钮点击状态及自定义分享内容接口
		   "onMenuShareWeibo",//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
		   "onMenuShareQZone",//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
		   "chooseImage",//拍照或从手机相册中选图接口
		   "previewImage",//预览图片接口
		   "uploadImage",//上传图片接口
		   "downloadImage",//下载图片接口
		   "startRecord",//开始录音接口
		   "stopRecord",//停止录音接口
		   "onVoiceRecordEnd",//监听录音自动停止接口
		   "playVoice",//播放语音接口
		   "pauseVoice",//暂停播放接口
		   "stopVoice",//停止播放接口
		   "onVoicePlayEnd",//监听语音播放完毕接口
		   "uploadVoice",//上传语音接口
		   "downloadVoice",//下载语音接口
		   "translateVoice",//识别音频并返回识别结果接口
		   "getLocation",//获取地理位置接口
		   "openLocation",//使用微信内置地图查看位置接口
		   "scanQRCode",//微信扫一扫接口
		   "getNetworkType",//获取网络状态接口
		   "hideOptionMenu",//隐藏右上角菜单接口
		   "showOptionMenu",//显示右上角菜单接口
		   "hideMenuItems",//批量隐藏功能按钮接口
		   "showMenuItems",//批量显示功能按钮接口
		   "hideAllNonBaseMenuItem",//隐藏所有非基础按钮接口
		   "showAllNonBaseMenuItem",//显示所有功能按钮接口
		   "closeWindow",//关闭当前网页窗口接口
		   "getNetworkType",//获取网络状态接口
		   "chooseWXPay"//微信支付
		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	},
	init:function(){//函数功能：初始化
		if(!wx){//验证是否存在微信的js组件
			alert("微信接口调用失败，请检查是否引入微信JS!");
			return;
		}
		var that=this;//保存当前作用域，方便回调函数使用
		//获取签名信息
		this.wx_get_signature(function(data){
			that.config.appId=data.appId;
			that.config.timestamp=data.timestamp;
			that.config.nonceStr=data.nonceStr;
			that.config.signature=data.signature;
			that.initWx(function(){//初始化微信接口
				//初始化完成后的执行
				
			});
		});
	},
	//获取签名
	wx_get_signature:function(call){
		function getContextPath(url){
			if(url!=""){
				return url;
			}
	    	 //获取当前网址，如： http://localhost:8083/proj/meun.jsp  
	    	var curWwwPath = window.document.location.href;  
	    	//获取主机地址之后的目录，如： proj/meun.jsp  
	   		 var pathName = window.document.location.pathname;  
	   		 var pos = curWwwPath.indexOf(pathName);  
		    //获取主机地址，如： http://localhost:8083  
		    var localhostPath = curWwwPath.substring(0, pos);  
		    //获取带"/"的项目名，如：/proj  
		    //var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')+1);
		    var path=url;
		    if(url==""){
		    	 path=localhostPath+url;
		    }
		    return path;
		};
		this.apiUrl=getContextPath(this.apiUrl);
		//执行ajax获取signature
		$.ajax({
		  type: "post",
		  url: this.apiUrl+"/WxJssdkServlet",
		  async:true,
		  dataType: "json",
		  data:{
				url:window.location.href //必填，页面的完整路径
		  },
		  success:function(data){
			  call && call(data);
		  }
		});
		return;
	},
	initWx:function(call,errorCall){//初始化微信接口
		var that=this;
		wx.config(this.config);//初始化配置
		/**
		 * config信息验证后执行ready方法，所有接口都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
		 * 则必须吧相关接口放在ready函数来确保正确执行。对于用户触发时才调用的接口，则直接调用，不需要放在ready函数中。
		 * 
		 */
		wx.ready(function(){
			that.isReady=true;
			console.log("初始化成功");
			if(that.readySucessCall.length>0){//成功初始化后，执行的事务
				$.each(that.readySucessCall,function(i,n){
					n();
				});
			};
			call && call();
		});
		/**
		 * config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
		 * 对于SPA可以在这里更新签名
		 * 
		 */
		wx.error(function(res){
			that.isReady="false";
			errorCall && errorCall();
		});
		
	},
	/**
	 * 函数名称：wxJSSDK.checkJsApi
	 * 函数功能：为wxJSSDK增加基础检测服务
	 * 参数：
	 * 		jsAplList(Array) 必选项，待检测的API列表
	 * 		back(Function) 可选项，检测API的回调
	 */
	checkJsApi:function(jsApiList,back){
		var that=this;
		if(jsApiList && jsApiList.length==0){
			console.log("抱歉，缺少需要检测的API列表。");
			return this;
		}
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			wx.checkJsApi({//需要检测JS接口列表，所有JS接口列表见附录B
				jsApiList:jsApiList,
				success:function(res){
					/**
					 * 结果以键值对的形式返回，可用的API值为true,不可用为false
					 */
					back && back(res);
				}
			});
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测接口服务！");
		};
	},
	/**
	 * 函数名称：wxJSSDK.shareApi
	 * 函数功能：为wxJSSDK增加分享模块
	 * 参数：
	 * 		shareList(Object) 必选项，待分享的API配置表
	 */
	shareApi:function(shareList){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			
			//获取"分享到朋友全"按钮点击状态及自定义分享内容接口
			if(shareList.onMenuShareTimeline){
				var ParametersTimeline=shareList.onMenuShareTimeline;
				wx.onMenuShareTimeline({
					title:ParametersTimeline.title,//分享标题
					link:ParametersTimeline.link,//分享链接
					imgUrl:ParametersTimeline.imgUrl,//分析图标
					success:function(){
						//用户确认分享后执行的回调函数
						ParametersTimeline.success && ParametersTimeline.success();
					},
					cancel:function(){
						//用户取消分享后执行的回调函数
						ParametersTimeline.cancel && ParametersTimeline.cancel();
					}
				});
			}
			
			//获取“分享给朋友”按钮点击状态及自定义分享内容接口
			if(shareList.onMenuShareAppMessage){
				var ParametersAppMessage=shareList.onMenuShareAppMessage;
				wx.onMenuShareAppMessage({
					title:ParametersAppMessage.title,//分享标题
					desc:ParametersAppMessage.desc,//分享描述
					link:ParametersAppMessage.link,//分享链接
					imgUrl:ParametersAppMessage.imgUrl,//分享图标
					type:ParametersAppMessage.type,//分享类型，music、video或link,不填默认为link
					dataUrl:ParametersAppMessage.dataUrl,//如果type是music或video，则要提供数据链接，默认为空
					success:function(){
						//用户确认分享后执行的回调函数
						ParametersAppMessage.success && ParametersAppMessage.success();
					},
					cancel:function(){
						//用户取消分享后执行的回调函数
						ParametersAppMessage.cancel && ParametersAppMessage.cancel();
					}
				});
			}
			
			//获取“分享到QQ”按钮点击状态及自定义分享内容接口
			if(shareList.onMenuShareQQ){
				var ParametersQQ=shareList.onMenuShareQQ;
				wx.onMenuShareQQ({
					title:ParametersQQ.title,//分享标题
					desc:ParametersQQ.desc,//分享描述
					link:ParametersQQ.link,//分享链接
					imgUrl:ParametersQQ.imgUrl,//分享图标
					success:function(){
						//用户确认分享后执行的回调函数
						ParametersQQ.success && ParametersQQ.success();
					},
					cancel:function(){
						//用户取消分享后执行的回调函数
						ParametersQQ.cancel && ParametersQQ.cancel();
					}
				});
			}
			
			//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
			if(shareList.onMenuShareWeibo){
				var ParametersWeibo=shareList.onMenuShareWeibo;
				wx.onMenuShareWeibo({
					title:ParametersWeibo.title,//分享标题
					desc:ParametersWeibo.desc,//分享描述
					link:ParametersWeibo.link,//分享链接
					imgUrl:ParametersWeibo.imgUrl,//分享图标
					success:function(){
						//用户确认分享后执行的回调函数
						ParametersWeibo.success && ParametersWeibo.success();
					},
					cancel:function(){
						//用户取消分享后执行的回调函数
						ParametersWeibo.cancel && ParametersWeibo.cancel();
					}
				});
			}
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	},
	/**
	 * 函数名称：wxJSSDK.imageApi
	 * 函数功能：为wxJSSDK增加图片处理模块
	 * 参数：
	 * 		imageApi(Object) 必选项，图片处理的API配置表
	 */
	imageApi:function(imageApi){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			if(imageApi){
				imageApi.chooseImage && wx.chooseImage({//拍照或手机相册中选图接口
					count:imageApi.chooseImage.count || 9,
					sizeType: imageApi.chooseImage.sizeType || ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: imageApi.chooseImage.sourceType || ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success:function(res){
						imageApi.chooseImage.success && imageApi.chooseImage.success(res);
					}
				});
				
				imageApi.previewImage && wx.previewImage({//预览图片接口
					current:imageApi.previewImage.current,//当前显示的图片链接
					urls:imageApi.previewImage.urls//需要预览的图片链接列表
				});
				
				imageApi.uploadImage && wx.uploadImage({//上传图片接口
					localId:imageApi.uploadImage.localId,//需要上传的图片的本地ID,由chooseImage接口获得
					isShowProgressTips:imageApi.uploadImage.isShowProgressTips || 1,//默认为1，显示进度提示
					success:function(res){
						imageApi.uploadImage.success && imageApi.uploadImage.success(res);
					}
				});
				
				imageApi.downloadImage && wx.downloadImage({//下载图片接口
					serverId:imageApi.downloadImage.serverId,//需要下载的图片的服务器端ID,由uploadImage接口获得
					isShowProgressTips:imageApi.downloadImage.isShowProgressTips || 1,//默认为1，显示进度提示
					success:function(res){
						imageApi.downloadImage.success && imageApi.downloadImage.success(res);
					}
				});
			}else{
				console.log("imageApi缺少配置参数");
			}
		}else{
			alert("抱歉，调用微信接口初始化没有完毕，请稍等..");
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	},
	/**
	 * 函数名称：wxJSSDK.audioApi
	 * 函数功能：为wxJSSDK增加语音处理模块
	 * 参数：
	 * 		audioApi(Object) 必选项，语音处理的API配置表
	 */
	audioApi:function(audioApi){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			if(audioApi){
				audioApi.startRecord && wx.startRecord();//开始录音
				
				audioApi.stopRecord && wx.stopRecord({//停止录音接口
					success:function(res){
						audioApi.stopRecord.success && audioApi.stopRecord.success(res);
					}
				});
				
				audioApi.onVoiceRecordEnd && wx.onVoiceRecordEnd({//监听录音自动停止接口
					 // 录音时间超过一分钟没有停止的时候会执行 complete 回调
				    complete: function (res) {
				    	audioApi.onVoiceRecordEnd.complete && audioApi.onVoiceRecordEnd.complete(res);
				    }
				});
				
				audioApi.playVoice && wx.playVoice({//播放语音接口
					 localId:audioApi.playVoice.localId // 需要播放的音频的本地ID，由stopRecord接口获得
				});
				
				audioApi.pauseVoice && wx.pauseVoice({
					localId:audioApi.pauseVoice.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
				});
				
				audioApi.stopVoice && wx.stopVoice({
					localId:audioApi.stopVoice.localId// 需要停止的音频的本地ID，由stopRecord接口获得
				});
				
				audioApi.onVoicePlayEnd && wx.onVoicePlayEnd({//监听语音播放完毕接口
					success: function (res) {
				        audioApi.onVoicePlayEnd.success && audioApi.onVoicePlayEnd.success(res);
				    }
				});
				
				audioApi.uploadVoice && wx.uploadVoice({//上传语音接口
					localId: audioApi.uploadVoice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
				    isShowProgressTips: audioApi.uploadVoice.isShowProgressTips || 1, // 默认为1，显示进度提示
				    success: function (res) {
				        audioApi.uploadVoice.success && audioApi.uploadVoice.success(res);
				    }
				});
				
				audioApi.downloadVoice && wx.downloadVoice({//下载语音接口
					serverId: audioApi.downloadVoice.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
				    isShowProgressTips: audioApi.downloadVoice.isShowProgressTips || 1, // 默认为1，显示进度提示
				    success: function (res) {
				        audioApi.downloadVoice.success && audioApi.downloadVoice.success(res);
				    }
				});
				
				audioApi.translateVoice && wx.translateVoice({//识别音频并返回识别结果接口
					localId: audioApi.translateVoice.localId, // 需要识别的音频的本地Id，由录音相关接口获得
				    isShowProgressTips: audioApi.translateVoice.isShowProgressTips || 1, // 默认为1，显示进度提示
				    success: function (res) {// 语音识别的结果事件
				        audioApi.translateVoice.success && audioApi.translateVoice.success(res);
				    }
				});
				
			}else{
				console.log("audioApi缺少配置参数");
			}
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	},
	/**
	 * 函数名称：wxJSSDK.location
	 * 函数功能：为wxJSSDK增加地理位置模块
	 * 参数：
	 * 		location(Object) 必选项，地理位置处理的API配置表
	 */
	locationApi:function(locationApi){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			if(locationApi){
				locationApi.getLocation && wx.getLocation({//获取地理位置接口
					type: locationApi.getLocation.type || 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				    success: function (res) {
				        locationApi.getLocation.success && locationApi.getLocation.success(res);
				    }
				});
				
				locationApi.openLocation && wx.openLocation({//使用微信内置地图查看位置接口
					latitude:locationApi.openLocation.latitude || 0, // 纬度，浮点数，范围为90 ~ -90
				    longitude:locationApi.openLocation.longitude || 0, // 经度，浮点数，范围为180 ~ -180。
				    name:locationApi.openLocation.name, // 位置名
				    address:locationApi.openLocation.address, // 地址详情说明
				    scale:locationApi.openLocation.scale || 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
				    infoUrl:locationApi.openLocation.infoUrl || '' // 在查看位置界面底部显示的超链接,可点击跳转
				});
			}else{
				console.log("location缺少配置参数");
			}
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	},
	/**
	 * 函数名称：wxJSSDK.scanQRCode
	 * 函数功能：为wxJSSDK增加二维码扫一扫模块
	 * 参数：
	 * 		scanQRCodeApi(Object) 必选项，二维码扫一扫处理的API配置表
	 */
	scanQRCode:function(scanQRCodeApi){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			if(scanQRCodeApi){
				scanQRCodeApi && wx.scanQRCode({//获取二维码扫描
					needResult:scanQRCodeApi.needResult || 0,  // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: scanQRCodeApi.scanType || ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function (res) {
						scanQRCodeApi.success && scanQRCodeApi.success(res);
						//var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				});
			}else{
				console.log("scanQRCodeApi缺少配置参数");
			}
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	},
	/**
	 * 函数名称：wxJSSDK.uiApi
	 * 函数功能：为wxJSSDK增加界面操作模块
	 * 参数：
	 * 		uiApi(Object) 必选项，界面操作的API配置表
	 */
	uiApi:function(uiApi){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			if(uiApi){
				uiApi.hideOptionMenu && wx.hideOptionMenu();//隐藏右上角菜单接口
				
				uiApi.showOptionMenu && wx.showOptionMenu();//显示右上角菜单接口
				
				uiApi.closeWindow && wx.closeWindow();//关闭当前网页窗口接口
				
				uiApi.hideMenuItems && wx.hideMenuItems({//批量隐藏功能按钮接口
				    menuList:uiApi.hideMenuItems.menuList || []  // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				});
				
				uiApi.showMenuItems && wx.showMenuItems({//批量显示功能按钮接口
				    menuList: uiApi.showMenuItems.menuList || [] // 要显示的菜单项，所有menu项见附录3
				});
				
				uiApi.hideAllNonBaseMenuItem && wx.hideAllNonBaseMenuItem();//隐藏所有非基础按钮接口
				
				uiApi.showAllNonBaseMenuItem && wx.showAllNonBaseMenuItem();//显示所有功能按钮接口
				
			}else{
				console.log("scanQRCodeApi缺少配置参数");
			}
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	},
	/**
	 * 函数名称：wxJSSDK.getNetworkType
	 * 函数功能：为wxJSSDK增加获取网络状态接口模块
	 * 参数：
	 * 		getNetworkType(Object) 必选项，获取网络状态的API配置表
	 */
	getNetworkType:function(getNetworkTypeApi){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			if(getNetworkTypeApi){
				getNetworkTypeApi && wx.getNetworkType({//获取网络状态接口
					success: function (res) {
				        //var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
						getNetworkTypeApi.success && getNetworkTypeApi.success(res);
				    }
				});
			}else{
				console.log("getNetworkTypeApi缺少配置参数");
			}
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	},
	/**
	 * 函数名称：wxJSSDK.chooseWXPay
	 * 函数功能：为wxJSSDK增加发起一个微信支付请求接口模块
	 * 参数：
	 * 		chooseWXPay(Object) 必选项，发起一个微信支付请求的API配置表
	 */
	chooseWXPay:function(chooseWXPayApi){
		if(this.isReady){//wxJSSDK.isReady查看微信JSSDK是否初始化完毕
			if(chooseWXPayApi){
				chooseWXPayApi && wx.chooseWXPay({
				    timestamp: chooseWXPayApi.timestamp || 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				    nonceStr: chooseWXPayApi.nonceStr || '', // 支付签名随机串，不长于 32 位
				    package: chooseWXPayApi.package || '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				    signType: chooseWXPayApi.signType || '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				    paySign: chooseWXPayApi.paySign || '', // 支付签名
				    success: function (res) {
				        // 支付成功后的回调函数
				    	chooseWXPayApi.success && chooseWXPayApi.success(res);
				    },
				    cancel:function(res){
				    	// 支付取消后的回调函数
				    	chooseWXPayApi.cancel && chooseWXPayApi.cancel(res);
				    }
				});
			}
		}else{
			console.log("抱歉，wx没有初始化完毕，请等待wx初始化完毕，在调用检测API服务。");
		}
	}
}

//执行初始化
wxJSSDK.init();


//通用的一些封装
/**
 * 隐藏一些对于的分享链接
 */
function hindeUI(){
	 wxJSSDK.uiApi({
		 hideMenuItems:{
			 menuList:[
			 	"menuItem:share:qq",
			 	"menuItem:share:weiboApp",
			 	"menuItem:share:QZone",
			 	"menuItem:share:facebook",
			 	"menuItem:favorite",
			 	"menuItem:favorite"
			 ]
		 }
	 });
}

/**
 * 微信分享共功能，只能在初始化里面调用
 * @param title  显示标题
 * @param link  分享的链接
 * @param imgUrl  显示的图片链接,必须是http开头
 * @param desc   分享描述
 * @param id   如果页面有多个分享，回调函数用这个id区分
 *
 */
function wxShare(title,link,imgUrl,desc){
	//成功初始化后执行API分享服务
	wxJSSDK.readySucessCall.push(function(){
		wxJSSDK.shareApi({
			onMenuShareTimeline:{//分享朋友圈
				title:title,//分享标题
				link:link,//分享链接
				imgUrl:imgUrl,//分享图标
				desc:desc,//分享描述
				success:function(){
					shareOk();
				},
				cancal:function(){
					alertErr("微信分享失败");
				}
		
			},
			onMenuShareQQ:{
				title:title,//分享标题
				desc:desc,//分享描述
				link:link,//分享链接
				imgUrl:imgUrl,//分享图标
				success:function(){
					shareOk();
				},
				cancal:function(){
					alertErr("qq分享失败");
				}
			},
			onMenuShareAppMessage:{//分享给微信朋友
				title:title,//分享标题
				desc:desc,//分享描述
				link:link,//分享链接
				imgUrl:imgUrl,//分享图标
				type:"link",//分享类型，music、video或link,不填默认为link
				dataUrl:"",//如果type是music或video，则要提供数据链接，默认为空
				success:function(){
					shareOk();
				},
				cancal:function(){
					alertErr("微信分享失败");
				}
			}
		
		});
	});
}

/**
 * 微信分享成功回调函数，页面需覆盖
 * @param id
 */
function shareOk(){
	
}

/**
 * 打开微信地图
 * @param lon 经度
 * @param lat 纬度
 * @param name 显示名称 如学帮科技
 * @param address  详细地址说明
 * @param url
 * @param scale 放大倍数
 */
var mapload;
function openMap(lon,lat,name,address,url,scale){

	mapload=loading("正加载地图....");
	 wxJSSDK.locationApi({
		 openLocation:{
			latitude: lat, // 纬度，浮点数，范围为90 ~ -90
		    longitude: lon, // 经度，浮点数，范围为180 ~ -180。
		    name: name, // 位置名
		    address: address, // 地址详情说明
		    scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
		    infoUrl: url // 在查看位置界面底部显示的超链接,可点击跳转
		 }
	 });
	 setTimeout("closeMapLoad()",500);
	 
	 
}
function closeMapLoad(){
	layer.close(mapload)
}