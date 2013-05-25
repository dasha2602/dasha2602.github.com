jQuery(document).ready(function() {	

	function validation(){
    }

	$('#name').on('focus', function() {$(this).attr('value','');});
	$('#name').on('blur', function() {$(this).attr('value','Представьтесь, пожалуйста');});

	$('#comment').on('focus', function() {$(this).text('');});
	$('#comment').on('blur', function() {$(this).text('Введите текст сообщения...');});

	$('#add_comment').on('click', function(event) {
		event.preventDefault();
		//alert($('.field').last().attr('id'));
		$('#name').attr('value','');
		$('#comment').text('');
		if(($('#name').val()=='')||($('#comment').val()=='')){
			//if($('.field').last().attr('id')=='comment') {
				$('#name').attr('value','Представьтесь, пожалуйста');
				$('#comment').text('Введите текст сообщения...');
				$('#comment').after('<img src="images/warning.png" style="float:left"><p>&ensp;Пожалуйста, заполните все поля перед отправкой</p>');
				//$('.field img').css('margin-left', '-20px');
				$('.field p').css('margin', '0')
						.css('color','#ff0000');
				return false;
			//}
		}
		else {
			$('.field img').remove();
			$('.field p').remove();
			/*$comment = '<div class="comment"><div class="user_name">
			<p>Дуб<span>&emsp;17:58, пятница, 25.05.2013</span></p></div>
			<div class="user_message"><p>бурда</p></div><a href="#">Ответить</a></div>';*/
			$('#add_comment').after($('.new-comment'));
			$('.new-comment').show();
			$('.new-comment .user_name p').text($('#name').val());
			$('.new-comment .user_message p').text($('#comment').val());
		}	
	});

	$('.comments a').on('click', function(){
		/*$form = '<div class="comment-form"><form action="#"><div class="field">
		<input type="text" id="name" value="Представьтесь, пожалуйста">
		<textarea id="comment">Введите текст сообщения...</textarea></div><div class="control">
		<input type="submit" id="add_comment" value="Добавить комментарий"></div></form></div>';*/
		//$(this).after($form);

		$(this).after($('.comment-form'));
		$('.comment-form').css('display', 'block')
		        //.css('margin-left', '50px')
		        .css('padding-top', '20px');

		$('#add_comment').on('click', function(event) {

		});        

	});

	/*<div class="comment-form">
		<form action="#" method="post">
			<div class="field">
				<input type="text" id="name" value="Представьтесь, пожалуйста">
				<textarea id="comment">Введите текст сообщения...</textarea>
			</div>
			<div class="control">
				<input type="submit" id="add_comment" value="Добавить комментарий">
			</div>
		</form>
	</div>*/

});