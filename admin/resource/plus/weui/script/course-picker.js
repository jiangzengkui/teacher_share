
$(function(){
	
	$("#course_picker").click(function(){
		var km_id=$("#km_id").val();
		var parent_sn=$("#parent_sn").val();
		if(km_id==null || km_id.length==0){
			km_id="001001";
			parent_sn="001";
		}
		weui.picker([		       
		 {
	         label: '器乐演奏',
	         value: "001",
	         children:[
	                 {
	                	 label: '钢琴',
	        	         value: "001001"
	                 },{
	                	 label: '吉他',
	        	         value: "001002"
	                 },{
	                	 label: '古筝',
	        	         value: "001003"
	                 },{
	                	 label: '小提琴',
	        	         value: "001004"
	                 },{
	                	 label: '古琴',
	        	         value: "001005"
	                 },{
	                	 label: '架子鼓',
	        	         value: "001006"
	                 },{
	                	 label: '电子琴',
	        	         value: "001007"
	                 },{
	                	 label: '萨克斯',
	        	         value: "001008"
	                 },{
	                	 label: '葫芦丝',
	        	         value: "001009"
	                 },{
	                	 label: '二胡',
	        	         value: "001010"
	                 },{
	                	 label: '琵琶',
	        	         value: "001011"
	                 },{
	                	 label: '大提琴',
	        	         value: "001012"
	                 },{
	                	 label: '电吉他',
	        	         value: "001013"
	                 },{
	                	 label: '尤克里里',
	        	         value: "001014"
	                 },{
	                	 label: '黑管',
	        	         value: "001015"
	                 },{
	                	 label: '笛',
	        	         value: "001016"
	                 },{
	                	 label: '箫',
	        	         value: "001017"
	                 },{
	                	 label: '扬琴',
	        	         value: "001018"
	                 },{
	                	 label: '手风琴',
	        	         value: "001019"
	                 },{
	                	 label: '贝斯',
	        	         value: "001020"
	                 },{
	                	 label: '小号',
	        	         value: "001021"
	                 },{
	                	 label: '长号',
	        	         value: "001022" 
	                 },{
	                	 label: '口琴',
	        	         value: "001023"
	                 },{
	                	 label: '唢呐',
	        	         value: "001024"
	                 }
	         ]
	     },{
	         label: '声乐舞蹈',
	         value: "002",
	         children:[
	                 {
	                	 label: '爵士舞',
	        	         value: "002001"
	                 },{
	                	 label: '街舞',
	        	         value: "002002"
	                 },{
	                	 label: '拉丁舞',
	        	         value: "002003"
	                 },{
	                	 label: '民族舞',
	        	         value: "002004"
	                 },{
	                	 label: '芭蕾舞',
	        	         value: "002005"
	                 },{
	                	 label: '古典舞',
	        	         value: "002006"
	                 },{
	                	 label: '现代舞',
	        	         value: "002007"
	                 },{
	                	 label: '钢管舞',
	        	         value: "002008"
	                 },{
	                	 label: '肚皮舞',
	        	         value: "002009"
	                 },{
	                	 label: '声乐',
	        	         value: "002010"
	                 },{
	                	 label: '音基',
	        	         value: "002011"
	                 },{
	                	 label: '中国舞',
	        	         value: "e5dc919563814a458651973931c5051f"
	                 }                  
	          ]
	     },{
	         label: '美术绘画',
	         value: "003",
	         children:[
	                 {
	                	 label: '创意',
	        	         value: "003001"
	                 },{
	                	 label: '素描',
	        	         value: "003002"
	                 },{
	                	 label: '水彩',
	        	         value: "003003"
	                 },{
	                	 label: '国画',
	        	         value: "003004"
	                 },{
	                	 label: '油画',
	        	         value: "003005"
	                 },{
	                	 label: '水粉',
	        	         value: "003006"
	                 },{
	                	 label: '沙画',
	        	         value: "003007"
	                 },{
	                	 label: '漫画',
	        	         value: "68160649341e4742941121a27af2a0f6"
	                 },{
	                	 label: '美术',
	        	         value: "b2e5db17208f421ba22462526ea73085"
	                 }
	          ]
	     },{
	    	 label: '体育运动',
	         value: "004",
	         children:[
	                 {
	                	 label: '羽毛球',
	        	         value: "004001"
	                 },{
	                	 label: '乒乓球',
	        	         value: "004002" 
	                 },{
	                	 label: '网球',
	        	         value: "004003"
	                 },{
	                	 label: '足球',
	        	         value: "004004"
	                 },{
	                	 label: '篮球',
	        	         value: "004005"
	                 },{
	                	 label: '游泳',
	        	         value: "004006"
	                 },{
	                	 label: '瑜伽',
	        	         value: "004007"
	                 },{
	                	 label: '轮滑',
	        	         value: "004008"
	                 },{
	                	 label: '垒球',
	        	         value: "004009"
	                 },{
	                	 label: '跆拳道',
	        	         value: "004010"
	                 },{
	                	 label: '空手道',
	        	         value: "004011"
	                 },{
	                	 label: '柔道',
	        	         value: "004012"
	                 },{
	                	 label: '传统武术',
	        	         value: "004013"
	                 },{
	                	 label: '击剑',
	        	         value: "1fb39e9b5bae4e20b0c408450f1c9243",
	                 },{
	                	 label: '棒球',
	        	         value: "88626be27d8148749bd58d67f86ccb3d"
	                 },{
	                	 label: '陶艺泥塑',
	        	         value: "ea42eae25dd44983b48d6656aa3be2d6"
	                 }
	          ]	     
	     },{
	    	 label: '书法国学',
	         value: "005", 
	         children:[
	                 {
	                	 label: '硬笔',
	        	         value: "005001",
	                 },{
	                	 label: '软笔',
	        	         value: "005002",
	                 },{
	                	 label: '毛笔',
	        	         value: "005003",
	                 },{
	                	 label: '国学',
	        	         value: "005004",
	                 }
	          ]
	     },{
	    	 label: '语言交流',
	         value: "006",
	         children:[
	                 {
	                	 label: '英语',
	        	         value: "006001",
	                 },{
	                	 label: '演讲口才',
	        	         value: "006002",
	                 }
	          ]
	     },{
	    	 label: '模特演艺',
	         value: "007",
	         children:[
	                 {
	                	 label: '模特',
	        	         value: "007001",
	                 },{
	                	 label: '主持',
	        	         value: "007002",
	                 },{
	                	 label: '表演',
	        	         value: "007003",
	                 }
	          ]
	     },{
	    	 label: '亲子早教',
	         value: "008",
	         children:[
	                 {
	                	 label: '亲子早教',
	        	         value: "008001",
	                 }
	          ]
	     },{
	    	 label: '手工才艺',
	         value: "009",
	         children:[
	                 {
	                	 label: '手工才艺',
	        	         value: "009001",
	                 },{
	                	 label: '亲子插花',
	        	         value: "323407426bd148f2a4dc26fd626a2378",
	                 },{
	                	 label: '亲子烘焙',
	        	         value: "f37fab45f110487a82ec717d54a24030",
	                 }
	          ]
	     },{
	    	 label: '益智训练',
	         value: "010",
	         children:[
	                 {
	                	 label: '奥数',
	        	         value: "010001",
	                 },{
	                	 label: '阅读',
	        	         value: "010002",
	                 },{
	                	 label: '围棋',
	        	         value: "010003",
	                 },{
	                	 label: '象棋',
	        	         value: "010004",
	                 },{
	                	 label: '航模',
	        	         value: "010005",
	                 },{
	                	 label: '魔术',
	        	         value: "010006",
	                 },{
	                	 label: '机器人',
	        	         value: "010007",
	                 },{
	                	 label: '作文',
	        	         value: "80ebab5da9724ab3bb1f0e81938e2468",
	                 },{
	                	 label: '魔方',
	        	         value: "a8c94b908bbf4c4f81d694d9b20c8439",
	                 }
	          ]
	     },{
	    	 label: '情感训练',
	         value: "011",
	         children:[
	                 {
	                	 label: '情感训练',
	        	         value: "011001",
	                 }
	          ] 
	     },{
	    	 label: '科学技术',
	         value: "012",
	         children:[
	                 {
	                	 label: '科学技术',
	        	         value: "012001",
	                 }
	          ]
	     }], {
			 depth:2,
			 defaultValue: [parent_sn,km_id],
	         onChange: function (result) {	
	             console.log(result);
	         },
	         onConfirm: function (result) {
	        	 var km_id=result[1];
	        	 $("#km_id").val(km_id);
	        	 setKmName(km_id)
	         }
	     });
	})
});

function setKmName(km_id){
	
	$.ajax({
		url:getParamsUrl(root_path+"/webmake/km_name.do"),
		data:{"km_sn":km_id},
		type:"post", 
		dataType:"json",
		success:function(data){
				var km_name =data.km_name;
				$("#course_picker").html(km_name);
		},error:function(){
			alert("系统错误，请联系管理员!");			
		}
	});
}