$(function(){
	
	//-----------------------------------------
	$('.input_checkbox').click(function(){
		$(this).find('.checkbox').toggleClass('in')
		var checkbox=$(this).find('input:checkbox')
		checkbox.attr('checked',!checkbox.is(':checked'))
		console.log($(this).find('input:checkbox').is(':checked'))
	})
	$('.input_checkbox').each(function(index,element) {
        var obj=$(this).find('input:checkbox')
		obj.is(':checked')&&$(this).find('.checkbox').addClass('in')
    })
	//-----------------------------------------
	$('.input_radio').click(function(){
		var radio=$(this).find('input:radio')
		var name=$(this).find('input:radio').attr('name')
		
		!radio.is(':checked')&&
			$('input:radio[name="'+name+'"]').parent('.input_radio').find('.radio').removeClass('in')
			console.log('input:radio[name="'+name+'"]')
			$(this).find('.radio').addClass('in')
			radio.attr('checked',true)
		
		
	})
	$('.input_radio').each(function(index,element) {
        var obj=$(this).find('input:radio')
		obj.is(':checked')&&$(this).find('.radio').addClass('in')
    })
	//-----------------------------------------

	$('.input_select').focus(function(){
		$(this).addClass('in')
		$(this).find('.option_bar').stop().slideDown(400)
	})
	.each(function(index, element) {
        _value_=$(this).find('.menu[selected]').text()
		$(this).find('span').html(_value_)
		$(this).parents('.input_select').find('input').val($(this).find('.menu[selected]').attr('value'))
    })
	.blur(function(){
		$(this).removeClass('in')
		$(this).find('.option_bar').stop(true).slideUp(400)
	})
	.find('.menu').click(function(){
		if(!$(this).hasClass('title')){
			var value=$(this).html()
			if(value==$(this).parents('.input_select').blur().find('span').html()){
				//$(this).attr('change','no')
				//alert('no')
			}else{
				$(this).parents('.input_select').find('input').val($(this).attr('value'))
				$(this).parents('.input_select').blur().find('span').html(value)
				//$(this).parents('.input_select').find('input').attr('id',$(this))
				console.log(value)
				$(this).parents('.input_select').find('input').change()
				//$(this).attr('change','yes')
			}
		}
	})
	
	
	
	
	//-----------------------------------------
	
	var public_text_number

	$('.text_number').on('valuechange', function (e, previous) {
		//console.log($(this).val().length)
		var _number_=Number($(this).attr('fontLenght'))-$(this).val().length
		if(_number_<=0){
			_number_=0
		}
		$(this).val($(this).val().substr(0,Number($(this).attr('fontLenght'))))
		$(this).next('.textsizeview').text('还可以输入'+_number_+'个字')
		console.log('还可以输入'+_number_+'个字')
	})


	//-----------------------------------------file

	$('.input_file .input_text,.input_file .input_button').click(function(){
		$(this).parent().find('input[type="file"]').click()
	})
	$('.input_file input[type="file"]').change(function(){
		$('.input_file .input_text').val($('.input_file input[type="file"]').val())
	})






















})