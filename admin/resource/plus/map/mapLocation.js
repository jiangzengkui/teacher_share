var mapLocation = mapLocation || {};
mapLocation.config={
	basePath:"",
	options:{},
	title:"",
	address:"",
	phone:"",
	website:"",
	lng:"",
	lat:"",
	range:"",
	onSuccess:function(point){},
	onClose:function(data){}
}
mapLocation.init=function(config){
	var me=this;
	if(typeof(config)=="object"){
		for(var key in config){
			if(typeof(me.config[key])!="undefined"){
				me.config[key]=config[key];
			}
		}
	}
	delete me;
}
mapLocation.show=function(config){
	
	var me=this;
	me.init(config);
	var url=config.basePath+"/comm/mapLoaction/search.do"
	+ '?lng='+((typeof(me.config.lng)!="undefined")?me.config.lng:"")
	+ '&lat=' + ((typeof(me.config.lat)!="undefined")?me.config.lat:"")
	+ '&range=' +  ((typeof(me.config.range)!="undefined")?me.config.range:"")
	+ '&title=' + encodeURI(encodeURI(me.config.title))
	+ '&address=' + encodeURI(encodeURI(me.config.address))
	+ '&phone=' + me.config.phone 
	+ '&website=' + me.config.website ;
	var options={
		id:"mapLocationWin",
		title:"获取GPS地理位置"
	};
	$.extend(options, config.options);
	mapLocation.open(options.title,url,options.width,options.height);
	if(typeof(me.config.onSuccess)=="function"){
		me.doPoint=function(point){ 
			me.config.onSuccess(point);
			me.config.onClose();
		}
	}
	
	delete me;
}
/****
加载一个最简单的iframe弹窗
@parame  tit弹出框标题
@parame  url url链接
@width  height  宽度 高度 数字，不带px
**/
mapLocation.open=function(tit,url,width,height){
	if((tit==null)||(tit.length==0))
	{
		tit="兴趣邦";
	}
	if((url==null)||(url.length==0))
	{
		alertErr("页面链接不能为空");
		return;
	}
	if((width==null)||(width.length==0))
	{
		width="700";
	}
	if((height==null)||(height.length==0))
	{
		height="500";
	}
	width=width+"px";
	height=height+"px";	
    layer.open({
	    skin: 'layui-layer-molv',
	  	type: 2,
	  	title: tit,
		//closeBtn:0,//不显示关闭按钮
	    shade: 0.8,
		maxmin: true,
	   area: [width, height],
	   content: url //iframe的url
	})
}
mapLocation.doPoint=function(point){
	
}