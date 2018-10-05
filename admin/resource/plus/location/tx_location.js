/**
 *基于腾讯的定位组件，必须先引入
 *   <script type="text/javascript" src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
 必须放置在jqery.js,wx-comm.js后
 
 经纬度初始化后放入sessionStorage
 城市地区初始化后放入cookie
 
 getLatLonLocation();只读取当前经纬度
 getAllLocation();读取经纬度和判断当前城市是否开展兴趣邦，并返回城市id，如果没有开展，跳转到开展了城市的页面
 
   showCurLocation(loc);//回调函数，在引用页覆盖这个函数
   
 
 */

/**
 * 定位失败默认的数据
 */
  var fail_latitude=30.537735;//定位失败默认显示经度
  var fail_longitude=104.065365;//定位失败默认显示纬度
  var fail_city="成都市";
  var fail_cityid="001001";
  var fail_area="武侯区";//所在区
  var fail_areaid="001001005"//所在区id

 
  
  /**
   * 什么一个对象,保存相关信息
   */
  function  xqb_location(){
	  this.cur_latitude=""//纬度
	  this.cur_longitude="";//精度
	  this.cur_city="";//城市名
	  this.cur_cityid="";//城市id
	  this.cur_area="";//区域名
	  this.cur_areaid="";//区域id
	  
  }
  var loc=new xqb_location();//实例化
  var geolocation;//定位对象
  var run_type=0;//实际运行服务方式 run_type=0不运行，直接从session或者cookie里面取   ==1只运行经纬度火获取  ==2还需获取城市编码
	  /**
	   * 只获取用户当前经纬度
	   * @param type
	   */
  function getLatLonLocation(){
	location_type=1;
	 //从sessionStorage获取
	var cur_latitude=sessionStorage.getItem('cur_latitude');
    var cur_longitude=sessionStorage.getItem('cur_longitude');
    
    if(cur_latitude){//存在
        loc.cur_latitude=cur_latitude;
        loc.cur_longitude=cur_longitude;
        showCurLocation(loc);//回调函数
    	
    }
    else{//不存在
    	run_type=1;
    	geolocation=getGeolocation();//定位对象
        geolocation.getLocation(showPosition, showErr);  
    }
	  
  }
  /**
   * 得到详细的位置信息，包含经纬度和当前所处城市是否开展兴趣邦业务
   */
  function getAllLocation(){
	  location_type=2;
	  //从sessionStorage获取
		var cur_latitude=sessionStorage.getItem('cur_latitude');
	    var cur_longitude=sessionStorage.getItem('cur_longitude');
	   
	    if(cur_latitude){//存在
	    	 loc.cur_latitude=cur_latitude;
	         loc.cur_longitude=cur_longitude;
	    
	    }
	    else{//不存在
	    	run_type=1;
	    }
	    
	    //从cookie获取
	    var cur_city=$.cookie('cur_city');
	    var cur_cityid=$.cookie('cur_cityid');
	    var cur_area=$.cookie('cur_area');
	    var cur_areaid=$.cookie('cur_areaid');
	    if(cur_city){//存在
	      loc.cur_city=cur_city;//城市名
	   	  loc.cur_cityid=cur_cityid;//城市id
	   	  loc.cur_area=cur_area;//区域名
	   	  loc.cur_areaid=cur_areaid;//区域id
	    }
	    else{
	    	run_type=2;
	    }
	   if(run_type==0){//完全从cookie和session里面取
		   showCurLocation(loc);
		   return;
	   }
	   
	   //要运行定位服务
	   geolocation=getGeolocation();//定位对象
       geolocation.getLocation(showPosition, showErr);  
  }
  /**
   * 引用js覆盖这个类
   * @param loc
   */
 function showCurLocation(loc){
	 
 }
  //=============辅助类==================
  /**
   * 定位成功
   * @param position
   */
  function showPosition(position) {
    if(run_type==0){
    	alertErr("程序逻辑错误");
    	return;
    }
    //放入对象
      loc.cur_latitude=position.lat;//经度
      loc.cur_longitude=position.lng;//纬度
      //放入sessionStorage
      sessionStorage.setItem('cur_latitude', loc.cur_latitude);
      sessionStorage.setItem('cur_longitude', loc.cur_longitude);
      
      if(run_type==1){//只获取当前位置
          showCurLocation(loc);//回调函数
          return;
      }
      
      var cityName=position.city;//所在城市
      var areaName=position.district;//所在区
      
      //得到城市和区对用得id
      getCityAreaId(cityName,areaName);
      

  }
  /**
   * 得到兴趣邦开展业务得城市、所在区id
   * @param cityName
   */
  function getCityAreaId(cityName,areaName){
	  var url="/comm/dict/area_code.do";
	  var cityId="";
	  var areaId="";
	  $.ajax({
	         type: "post",
	         url: url,
	         data:{cityName:cityName,areaName:areaName},
	         dataType: "json",
	         success: function(data){
	     		cityId=data.cityId;
	     		areaId=data.areaId;
	     		//设置
	     		if(cityId==""){//没有开设兴趣邦业务,则要切换城市
	     			
	     			window.location.href =	getParamsUrl(root_path+"/pwechat/xqbIndex/alter_view.do?areaName="+cityName);
	     			return;
	     		}
	     		else{
	     			
	     			//设置回调信息
	     			  loc.cur_city=cityName;//城市名
	     			  loc.cur_cityid=cityId;//城市id
	     			
	     			  if(areaId==""){//没有找到区域
	     				  loc.cur_area=fail_area;//区域名
	     				 loc.cur_areaid=fail_areaid;//区域id
	     			  }
	     			  else{
	     				  loc.cur_area=areaName;//区域名
		     			  loc.cur_areaid=areaId;//区域id
	     			  }
	     			  
	     			  //设置cookie
	     			 	$.cookie('cur_city',loc.cur_city, { path: '/' });
	     			 	$.cookie('cur_cityid',loc.cur_cityid, { path: '/' });
	     			 	$.cookie('cur_area',loc.cur_area, { path: '/' });
	     			 	$.cookie('cur_areaid',loc.cur_areaid, { path: '/' });
	     			  
	     			//回调函数
	     			   showCurLocation(loc);//回调函数
		     		
	     			  
	     		}
	     		
	          },
	          error:function(XMLHttpRequest, textStatus, errorThrown){
	        	  alertErr("获取所在城市区域失败");
	        	   //设置
	        	
	        	 loc.cur_city=fail_city;//城市名
	        	 loc.cur_cityid=fail_cityid;//城市id
	        	loc.cur_area=fail_area;//区域名
	        	loc.cur_areaid=fail_areaid;//区域id
	        	
   			 	$.cookie('cur_city',loc.cur_city, { path: '/' });
   			 	$.cookie('cur_cityid',loc.cur_cityid, { path: '/' });
   			 	$.cookie('cur_area',loc.cur_area, { path: '/' });
   			 	$.cookie('cur_areaid',loc.cur_areaid, { path: '/' });
   			   showCurLocation(loc);//回调函数
	          }
	         
			
	    });
  }

  function showErr() {
	  alertErr("定位失败,显示默认位置");
	  loc.cur_latitude=fail_latitude;//经度
	 loc.cur_longitude=fail_longitude;//纬度
	  loc.cur_city=fail_city;//城市名
 	 loc.cur_cityid=fail_cityid;//城市id
 	loc.cur_area=fail_area;//区域名
 	loc.cur_areaid=fail_areaid;//区域id
    showCurLocation(loc);//回调函数
  }
  
  
  /**
   * 得到定位对象,全局保持一个
   */
  function getGeolocation(){
	  if(geolocation)
		  return geolocation;
	  else
		  return new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp");
  }
  
  
  //========js 计算经纬度===
  
  
  function getDisance(lat1, lng1, lat2, lng2) { 
      var dis = 0;
      var radLat1 = toRad(lat1);
      var radLat2 = toRad(lat2);
      var deltaLat = radLat1 - radLat2;
      var deltaLng = toRad(lng1) - toRad(lng2);
      var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
      return dis * 6378137;
  }
  function toRad(d) {  return d * Math.PI / 180; }
