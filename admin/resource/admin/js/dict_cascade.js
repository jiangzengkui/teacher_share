/**
 * 
 * @param eid
 * @param dict_name 如果字典名，激发的select元素id
 * @param isOnChange 是否只onchange事件
 * select扩展属性
 *   <select curVal="当前值"    parentNode="父级联id"   sonNode="子级联id"> 
 */
function dict_cascade(eid,dict_name,isOnChange){
	var dict_type=dict_name;//数据字典名称 如BM001
    var pid=$("#"+eid).attr("parentNode");//父联级，最多填写一个
    var dict_code="";
    if(pid==""){
    	dict_code=dict_type;
    }
    else{
    	dict_code=$("#"+pid).val();//取父节点的值
    }
    if(dict_code==""  || dict_code==null){//没有取到dict_code的值，则不渲染本选项
    	 $("#"+eid+" option").remove();//删除以前的
    	 sonRender(eid,dict_type,isOnChange);//找儿子
	}
    else{
    	
    	  selectRender(dict_type,dict_code,eid,isOnChange);//渲染本选择框
    }
  
}
/**
渲染儿子
**/
function sonRender(eid,dict_type,isOnChange){

    var sonNode=$("#"+eid).attr("sonNode");//当前节点的下联级id
	 if(sonNode!=""){//其下级循环调用
		 dict_cascade(sonNode,dict_type,isOnChange);
	 }
}
    /**
    渲染本select
    **/
	 function selectRender(dict_type,dict_code,eid,isOnChange){
		 dict_type=trim(dict_type);
		 dict_code=trim(dict_code);
		 if(dict_type==""){
			 alertErr("数据字典名称不能为空");
			 return;
		 }
		 $.ajax({

	         type: "post",
	         url: root_path+"/comm/dict/son_dict.do?dict_type="+dict_type+"&dict_code="+dict_code,
	         //data: {dict_type:dict_type,dict_code:dict_code},
	         dataType: "json",
	         success:function(data){
	         if(isOnChange==false){//如果是onchange事件，不渲染本选择框
	 		  	var dictList=data.dictList;
	           	 var content="<option value=''></option>";
	             $.each(dictList, function(index, obj){
	            	 content+=optionRender(obj,eid,isOnChange);
	             });
	             $("#"+eid+" option").remove();//删除以前的
	             $("#"+eid).append(content);
	         }
	        	 //=============循环调==
	            sonRender(eid,dict_type,false);
	         },
	          error:function(XMLHttpRequest, textStatus, errorThrown){
	        	  alertErr("获取数字字典失败:"+getAjaxException(XMLHttpRequest.responseText));
	          }
	         

	     });
	 }

	 /**
	 渲染option
	 **/
	 function optionRender(obj,eid,isOnChange){
		 var content="";
		 var select="";
         
    	 if(obj.dict_code==  $("#"+eid).attr("curVal") && isOnChange==false){
    		 select="selected='selected'";
    	 }
   	     content+="<option value='"+obj.dict_code+"' "+select+">"+obj.dict_name+"</option>";
   	     return content;
	 }
	 
	