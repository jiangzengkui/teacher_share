<!--select下拉框-->
<#macro select dicts  name="" id=""      value="" isEmpty=true  required="false"  onchange=""  class="" style="">
<select  <#if id !="">id="${id}"</#if>  <#if  name !="">name="${name}"</#if>   <#if  required =="true">required="true"</#if>  
 <#if  onchange !="">onchange="${onchange}"</#if>  <#if  class !="">class="${class}"</#if> <#if  style !="">style="${style}"</#if>
>
<#if isEmpty==true><option value=""></option></#if>
	<#list dicts as  dict>
      <option value="${dict.code!}"   <#if  dict.code==value>selected</#if>  >${dict.name!}</option>
</#list>
</select>
</#macro>

<!--radio-->
<#macro  radio dicts   name=""      value=""  >
	<#list dicts as  dict>
     <input type="radio"  <#if  name !="">name="${name!}" id="${name!}_${dict_index!}"</#if>   value="${dict.code!}"     <#if dict.code==value>checked="checked"</#if> >${dict.name!}
</#list>

</#macro>

<!--数据字典显示--->
<#macro  dictShows         dict_name=""  dict_code=""  >
${dictShow(dict_name,dict_code)}
</#macro>

   <!----提示-->
<#macro  tips>
	<div id="tips">
    	<div class="icon"></div>
    	<div class="close"></div>
     <#nested>
      </div>
   </#macro>
   
   <!----导航链接-->
   <#macro  crumbs_org>
   <div id="crumbs">
   	<a href="${org_index_page!}">首页</a>
     <#nested>
</div>
      </#macro>