/**
 * html5定位
 */
var fail_latitude=30.537735;//定位失败默认显示经度
var fail_longitude=104.065365;//定位失败默认显示纬度
function getLocation(){
	if (navigator.geolocation) 
	{
		navigator.geolocation.getCurrentPosition(
			
			function( position ) {  
				show_msg( position );
				var lat = position.coords.latitude;//精度
			    var lng = position.coords.longitude;//纬度
			    getCurJw(lat,lng);
			 },
			 
			function( err ) {
				 alert("定位失败,显示默认位置");
				switch(error.code)
			    {
			    case 0://尝试获取您的位置信息时发生错误
			    	 getCurJw(fail_latitude,fail_longitude);
			      break;
			    case 1://用户拒绝了获取位置信息请求
			    	 getCurJw(fail_latitude,fail_longitude);
			      break;
			    case 2://浏览器无法获取您的位置信息
			    	 getCurJw(fail_latitude,fail_longitude);
			      break;
			    case 3: //获取您位置信息超时
			    	 getCurJw(fail_latitude,fail_longitude);
			      break;
			    }
			}
		)
	}
	else{
		 alert("定位失败,显示默认位置");
		  getCurJw(fail_latitude,fail_longitude);
	}
		 
		  
}

/**
 * 当前经纬度，引用页面覆盖本函数
 * @param latitude 经度
 * @param longitude 纬度
 * @param 所在城市名称
 */
function  getCurLocation( latitude, longitude,cityName)
{
	
}