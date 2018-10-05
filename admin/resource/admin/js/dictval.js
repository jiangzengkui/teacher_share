/**把数据字典的编码和值从数据库生成存放成静态文件，如果数据字典有变化，重新生成一个覆盖**/
var dictAll={
	 "BM001":{"o001":"四川省","o001001":"成都市","o001001001":"高新区","o001001002":"青羊区","o001001003":"锦江区","o001001004":"金牛区","o001001005":"武侯区","o001001006":"成华区","o001001007":"双流区","o001001008":"郫县","o001001009":"龙泉驿区","o001001010":"新都区","o001001011":"温江区","o001001012":"崇州市","o001001013":"邛崃市","o001001014":"都江堰市","o001001015":"彭州市","o001001016":"金堂县","o001001017":"大邑县","o001001018":"青白江区","o001002":"南充市","o001002":"绵阳","o001002001":"顺庆区","o001002002":"高坪区","o001002003":"嘉陵区","o001002004":"西充县","o001002005":"南部县","o001002006":"仪陇县","o001002007":"营山县"}
	 ,"BM002":{"o0":"否","o1":"是"}
	 ,"BM003":{"o1":"正常","o2":"注销"}
	 ,"BM004":{"o1":"超级管理员","o2":"机构管理员","o3":"教师","o4":"家长"}
	 ,"BM005":{"o1":"待审核","o2":"审核通过","o3":"审核不通过"}
	 ,"BM006":{"o1":"企业","o2":"工作室","o3":"学校"}
	 ,"BM007":{"o1":"一对一","o2":"班课"}
	 ,"BM008":{"o1":"幼儿","o2":"小学","o3":"初中","o4":"高中"}
	 ,"BM009":{"o1":"进行中","o2":"已结束"}
	 ,"BM010":{"o1":"班级整体","o2":"具体学生"}
	 ,"BM011":{"o2000":"2000","o2001":"2001","o2002":"2002","o2003":"2003","o2004":"2004","o2005":"2005","o2006":"2006","o2007":"2007","o2008":"2008","o2009":"2009","o2010":"2010","o2011":"2011","o2012":"2012","o2013":"2013","o2014":"2014","o2015":"2015","o2016":"2016"}
	 ,"BM012":{"o1":"好评","o2":"中评","o3":"差评"}
	 ,"BM013":{"o1":"男","o2":"女"}
	 ,"BM014":{"o01":"好评","o0101":"教学能力强","o0102":"内容新颖有用","o0103":"风趣幽默","o0104":"认真负责","o0105":"课堂气氛活跃","o0106":"孩子喜欢","o02":"差评","o0201":"教学能力弱","o0202":"没有经验","o0203":"教学呆板","o0204":"课堂沉闷","o0205":"不负责","o0206":"孩子不喜欢"}
	 ,"BM015":{"o01":"好评","o0101":"教学与宣传相符","o0102":"教学环境好","o0103":"客服热情周到","o0104":"达到预期效果","o0105":"性价比高","o02":"差评","o0201":"夸大宣传","o0202":"教学环境差","o0203":"客服懈怠，敷衍了事","o0204":"未达到预期效果","o0205":"性价比差"}
	 ,"BM016":{"o1":"教学机构","o2":"教师"}
	 ,"BM017":{"o0":"待报名","o1":"入学预安排","o2":"客户待支付","o3":"客户支付完毕"}
	 ,"BM018":{"o1":"微信支付","o2":"支付宝","o3":"银行转账"}
	 ,"BM019":{"o001":"客户退款","o001001":"期限内完全退款","o001002":"质保金退款","o001003":"事后退款","o001004":"担保退款","o002":"商家支付","o002001":"培训费（除质保）","o002002":"质保金","o002003":"培训费（全部）","o003":"平台提成","o003001":"平台佣金提成","o003002":"平台转账提成"}
	 ,"BM020":{"o1":"同意退款","o2":"不同意退款"}
	 ,"BM021":{"o1":"学生家长","o2":"新娘机构（教师）"}
	 ,"BM022":{"o1":"课程费用","o2":"质保金","o3":"无条件退款","o4":"资金担保","o5":"事后付款"}
	 ,"BM023":{"o1":"机构相册","o2":"教师相册","o3":"课程相册","o4":"学习资源相册","o5":"机构新闻相册","o6":"机构网站banner"}
	 ,"BM024":{"o1":"浏览机构","o10":"下订单","o11":"在线支付","o2":"收藏机构","o3":"浏览课程","o4":"收藏课程","o5":"浏览教师","o6":"收藏教师","o7":"查询某分类课程","o8":"查询某分类机构","o9":"查询某分类教师"}
	 ,"BM025":{"o1":"月薪","o2":"日薪","o3":"次薪","o4":"时薪"}
	 ,"BM026":{"o1":"不限","o2":"大专以下","o3":"大专","o4":"本科","o5":"硕士","o6":"博士"}
	 ,"BM027":{"o1":"人才查找","o2":"投简历"}
	 ,"BM028":{"o1":"录取","o2":"不合格","o3":"待议","o4":"下轮面试"}
	 ,"BM029":{"o1":"无要求","o2":"1-3年","o3":"3-5年","o4":"5-10年","o5":"10年以上"}
	 ,"BM030":{"o001":"教师资质","o001001":"身份认证","o001002":"教师认证","o001003":"学历认证","o001004":"专业认证","o002":"个人相册","o002001":"个人荣誉","o002002":"教学场景","o002003":"个人照片","o002004":"其他"}
	 ,"BM031":{"o1":"周一","o2":"周二","o3":"周三","o4":"周四","o5":"周五","o6":"周六","o7":"周日"}
	 ,"BM032":{"o1":"课程页面","o2":"机构页面","o3":"新闻页面","o4":"优惠券/特价页面"}
	 ,"BM033":{"o1":"首页banner","o2":"课程分类查询页面","o3":"资源展示页面","o4":"机构查询页面","o5":"教师查询页面"}
	 ,"BM034":{"o1":"线上咨询","o2":"到店咨询","o3":"电话咨询"}
	 ,"BM035":{"o1":"培训中","o2":"培训后"}
	 ,"BM036":{"o1":"在线交易","o10":"家长红包打赏","o2":"用户评价-好评","o3":"用户评价-中评","o4":"用户评价-差评","o5":"投诉","o6":"上课点名","o7":"下课告知","o8":"教学点评","o9":"家长反馈意见"}
	 ,"BM037":{"o0":"0星","o1":"1星","o2":"2星","o2.5":"2星半","o3":"3星","o3.5":"3星半","o4":"4星","o4.5":"4星半","o5":"5星"}
	 ,"BM040":{"o1":"兴趣邦平台","o2":"客户","o3":"商家"}
	 ,"BM041":{"o001":"客户","o001001":"期限内完全退款","o001002":"质保金退款","o001003":"事后退款","o001004":"担保退款","o002":"商家","o002001":"培训费（除质保）","o002002":"质保金"}
	 ,"BM042":{"o1":"注册用户","o2":"培训后评价","o3":"分享","o4":"订单支出","o5":"退款","o6":"退款提现"}
	 ,"BM043":{"o1":"过程考核","o2":"课程终结考核"}
	 ,"BM044":{"o001":"平台会员","o001001":"金牌会员","o001002":"银牌会员","o001003":"铜牌会员","o002":"一次性服务","o002001":"视频片花制作","o002002":"宣传视频制作","o003":"数量型服务","o003001":"手机短信","o004":"时间型服务","o004001":"公共号内容提供服务","o005":"打包服务","o005001":"机构资质认证","o005002":"兴趣邦远程指导","o005003":"兴趣邦建站委托","o005004":"微网站绑定公众号","o005005":"微小宝二次开发费用","o005006":"微小宝协助运营年费","o005007":"兴趣邦翼校通"}
	 ,"BM045":{"o1":"兴趣强烈","o2":"兴趣一般","o3":"不感兴趣","o4":"转化为最终客户","o5":"已选择其他机构"}
	 ,"BM046":{"o1":"数量","o2":"日期"}
	 ,"BM047":{"o1":"已报名，待入学设置","o2":"待支付","o3":"已支付","o4":"入学完毕"}
	 ,"BM048":{"o1":"已找到其他机构","o2":"客户不敢兴趣","o3":"客户保持兴趣"}
	 ,"BM049":{"o1":"图片","o2":"视频","o3":"文档","o4":"压缩包"}
	 ,"BM050":{"o0":"未绑定","o1":"绑定中","o2":"已绑定"}
	 ,"BM051":{"o0":"未处理","o1":"处理中","o2":"已处理"}
	 ,"BM052":{"o1":"支付","o2":"退款"}
	 ,"BM053":{"o1":"机构商家","o2":"个体教师"}
	 ,"BM054":{"o001":"机构Banner","o002":"课程Banner","o003":"机构资质","o003001":"身份认证","o003002":"营业执照","o003003":"教学资质","o004":"机构相册","o004001":"机构荣誉","o004002":"教学场景","o004003":"成果展示","o004004":"教学资质","o004099":"其他","o005":"课程相册","o005001":"课程荣誉","o005002":"教学场景","o005003":"其他","o006":"教师个人资质","o006001":"身份认证","o006002":"教师资格证","o006003":"学历认证","o006004":"专业认证","o007":"教师个人相册","o007001":"个人荣誉","o007002":"教学场景","o007003":"个人照片","o007004":"其他","o008":"学生学习成果/教学点评","o009":"商品图片","o010":"投票比赛活动banner","o011":"拼单相册","o012":"科目相册","o013":"机构软文相册","o017":"绘本相册"}
	 ,"BM055":{"o003004":"机构荣誉","o1":"待审核","o2":"待支付","o3":"已支付","o4":"作废"}
	 ,"BM056":{"o1":"通用","o2":"指定课程","o3":"家长评价","o4":"转介绍"}
	 ,"BM057":{"o1":"课程评价","o2":"机构发放"}
	 ,"BM058":{"o1":"课程评价","o2":"机构推广"}
	 ,"BM059":{"o1":"一等奖","o2":"二等奖","o3":"三等奖","o4":"四等奖","o5":"五等奖","o99":"参与奖"}
	 ,"BM060":{"o1":"机构","o2":"课程"}
	 ,"BM061":{"o1":"线上","o2":"线下"}
	 ,"BM062":{"o1":"咨询用户","o2":"体验课用户","o3":"特价限购用户","o4":"优惠券用户"}
	 ,"BM063":{"o1":"非常满意","o2":"较满意","o3":"一般","o4":"较差","o5":"很不满意"}
	 ,"BM064":{"o1":"价格","o2":"师资力量","o3":"环境","o4":"离家距离"}
	 ,"BM065":{"o1":"待受理阶段","o2":"受理阶段","o3":"调解阶段","o4":"退款阶段","o5":"处理完毕"}
	 ,"BM066":{"o1":"不受理","o2":"退款","o3":"不退款"}
	 ,"BM067":{"o0":"不受理","o1":"受理"}
	 ,"BM068":{"o1":"强烈","o2":"一般","o3":"不愿意"}
	 ,"BM069":{"o0":"待结算","o1":"结算中","o2":"已结算","o3":"作废"}
	 ,"BM070":{"o001":"平台级参数","o001001":"平台最低提成比例","o001002":"视频片花制作费用","o001003":"机构公众号二次开发费用","o001004":"金牌会员年费","o001005":"银牌会员年费","o001006":"铜牌会员年会","o001007":"在兴趣邦平台展示最低在线交易金额","o001008":"商家在兴趣邦上推广消耗虚拟金额","o001009":"打赏教师金额","o001010":"短信费用/条","o001011":"公众号内容服务费/月","o001012":"公众号包月最低月份数","o001013":"短信最低购买费用","o001014":"机构公众号绑定试用天数","o001015":"商城快递费用","o001016":"平台转账提成比例","o001017":"兴趣邦红包抵扣比例","o001018":"家长注册红包金额","o001019":"家长教学点评反馈红包金额","o001020":"微小宝市场统一价","o001021":"兴趣邦在线报名红包","o001022":"教师红包结算最低金额","o001023":"礼品成比比例阀值","o002":"保证金参数","o002001":"平台保证金免费天数","o002002":"平台保证金费用","o002003":"银行担保收费比例","o002004":"教学点评率达标比例","o002005":"学生最少人数","o002006":"家长最低关注率","o002007":"平台使用费","o003":"担保参数","o003001":"无条件退课投诉最低天数","o003002":"课程质保金最低比例","o003003":"质保金投诉有效天数","o004":"广告参数","o004001":"首页收费广告位投放数","o004002":"首页免费广告位投放数","o004003":"微信推送收费广告位投放数","o004004":"微信推送免费广告位投放数","o004005":"免费广告图片制作费用","o004006":"免费条件1-在线交易额","o004007":"免费条件2-学生人数","o004008":"微信推送广告费用(月)","o004009":"首页广告费用(天)","o005":"营销推广","o005001":"家长评价代金券最低费用","o005002":"批量优惠券最低面值","o005003":"特价课程最低折扣率","o005004":"批量优惠券最低数量","o006":"达人榜评分人","o006001":"家长打赏","o006002":"家长点赞","o006003":"家长分享","o006004":"家长满意度","o006005":"家长建议","o006006":"家长朋友圈打赏","o007":"增值服务打包价","o007001":"趣邦资质认证费用","o007002":"兴趣邦远程指导费用","o007003":"兴趣邦建站委托费用","o007004":"微网站绑定公众号费用","o007005":"微小宝二次开发费用","o007006":"微小宝运营服务年费","o008":"兴趣邦翼校通收费","o008001":"一个教学点收费","o008002":"最高费用"}
	 ,"BM071":{"o1":"正整数(含零)","o2":"0-1小数","o3":"字符串"}
	 ,"BM072":{"o1":"正常","o2":"迟到","o3":"早退","o4":"旷工","o5":"请假"}
	 ,"BM073":{"o1":"待处理","o2":"已支付","o3":"被其他业务替代"}
	 ,"BM074":{"o0701":"满意","o0702":"一般","o0703":"不满意","o1":"教学点评","o2":"打赏","o3":"点赞","o4":"上课教学","o5":"分享","o6":"家长点评反馈"}
	 ,"BM075":{"o0":"浏览机构网站","o1":"注册","o2":"咨询","o3":"报名","o4":"关注学生","o5":"孩子入学","o99":"其他"}
	 ,"BM076":{"o0":"待支付","o1":"支付成功","o2":"支付失败"}
	 ,"BM077":{"o1":"微信二次开发支付","o10":"投票礼品","o2":"联合运营资金支付","o3":"增值服务支付","o4":"购买课程支付","o5":"广告图片制作支付","o6":"优惠活动支付","o7":"家长打赏支付","o8":"培训费用支付","o9":"商品购买"}
	 ,"BM078":{"o001":"少儿专区","o002":"父母专区","o003":"老年专区"}
	 ,"BM079":{"o001":"收入","o001001":"营销红包","o001002":"注册红包","o001003":"点评互动红包","o001004":"网上报名红包","o002":"支出","o002001":"购物消费支付","o002002":"培训费用支付"}
	 ,"BM080":{"o1":"个体户","o2":"小型","o3":"中型","o4":"大型","o5":"超大型"}
	 ,"BM081":{"o0":"建档无沟通","o1":"陌生拜访","o2":"产品内容沟通","o3":"产品价格沟通","o4":"成交"}
	 ,"BM082":{"o0":"无法判断","o1":"无兴趣","o2":"兴趣弱","o3":"兴趣一般","o4":"兴趣较强","o5":"兴趣强"}
	 ,"BM083":{"o1":"上门拜访","o2":"电话联系"}
	 ,"BM084":{"o1":"保证金模式","o2":"平台使用费模式"}
	 ,"BM085":{"o001001":"浏览微网站","o002001":"教学点评发布","o002002":"浏览教学点评","o002003":"教学点评点赞","o002004":"教学点评打赏","o002005":"教学点评分享","o002006":"家长满意度反馈","o002007":"教师上课提示","o002008":"教师下课提示","o003001":"浏览优惠券","o003002":"优惠券分享","o003003":"优惠券抢购","o004001":"体验课浏览","o004002":"体验课分享","o004003":"体验课报名","o005001":"特价课浏览","o005002":"特价课分享","o005003":"特价课抢购","o006001":"转介绍浏览","o006002":"转介绍分享","o007001":"投票比赛浏览","o007002":"投票比赛分享","o007003":"投票比赛投票","o008001":"机构公众号关注","o008002":"机构公众号关注取消","o009001":"机构运营周报","o009002":"机构运营月报","o010001":"课程在线报名","o010002":"课程在线支付"}
	 ,"BM086":{"o01":"模板1","o02":"模板2","o03":"模板3"}
	 ,"BM087":{"o0":"不补贴","o1":"最多补贴1人","o3":"最多补贴3人","o5":"最多补贴5人"}
	 ,"BM088":{"o1":"关注提醒","o2":"已支付","o3":"已退款"}
	 ,"BM089":{"o0":"待发布","o1":"已发布","o2":"拼团成功","o3":"已失效","o4":"已作废"}
	 ,"BM090":{"o001001":"转介绍代理","o001002":"砍价优惠活动","o001003":"免单优惠活动","o001004":"拼团优惠活动","o001005":"积赞有奖","o002001":"投票比赛","o002002":"亲子活动","o002003":"才艺秀","o003001":"机构风采"}
	 ,"BM091":{"o001":"声律启蒙","o002001":"亲情友情","o002002":"品格习惯","o002003":"儿童启发","o002004":"鼠小弟系列","o002005":"米莉茉莉系列","o002006":"小兔汤姆系列","o002007":"青蛙弗洛格系列","o002008":"小熊宝宝系列","o002009":"霸王龙系列","o002010":"不一样的卡梅拉","o002011":"大卫系列","o002012":"大脚丫系列","o002013":"布鲁姆博士","o002014":"艾玛","o002015":"巴巴爸爸","o002016":"嘻哈农场系列","o002017":"蹦蹦和跳跳","o002018":"提姆与莎兰","o002019":"玛蒂娜","o002020":"世界上最好的爸爸","o002021":"小袋袋","o002022":"神奇校车","o002023":"11只猫系列"}
	 ,"BM092":{"o1":"兴趣邦制作","o2":"机构制作","o3":"用户制作","o4":"用户制作转收录"}
	 ,"BM093":{"o1":"未接电话","o2":"接电话未形成沟通","o3":"沟通后拒绝","o4":"有意愿","o5":"后续沟通无效","o6":"成单"}
	 ,"BM201":{"o1":"奇瑞","o10":"雪佛兰","o11":"别克","o2":"铃木","o3":"大众","o4":"丰田","o5":"起亚","o6":"本田","o7":"现代","o8":"日产","o9":"比亚迪"}
	 ,"BM202":{"o1":"手动","o2":"自动","o3":"手自一体"}
	 ,"BM203":{"o1":"待租","o2":"正租","o3":"已出售"}
	 ,"BM204":{"o1":"练手车","o2":"二手车","o3":"新车"}
	 ,"BM205":{"o1":" 外形","o2":"内配"}
	 ,"BM206":{"o1":" 继续跟踪","o2":"放弃跟踪","o3":"已成交"}
	 ,"BM207":{"o1":" 未使用","o2":"已使用","o3":"已退款"}
 
} 
