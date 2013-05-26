function focus(a,b) {
	a.on('focus', function() {$(this).attr('value','');$('.answerer').hide();});
	a.on('blur', function() {$(this).attr('value','Представьтесь, пожалуйста');});
	b.on('focus', function() {$(this).text('');$('.answerer').hide();});
	b.on('blur', function() {$(this).text('Введите текст сообщения...');});
}
function focusAnswer(a,b) {
	a.on('focus', function() {$(this).attr('value','');});
	a.on('blur', function() {$(this).attr('value','Представьтесь, пожалуйста');});
    b.on('focus', function() {$(this).text('');});
	b.on('blur', function() {$(this).text('Введите текст сообщения...');});
}
function validation(n,c) {
	n.attr('value','Представьтесь, пожалуйста');
	c.text('Введите текст сообщения...');
	$('.warning').show();
	c.after($('.warning'));
	//if($('#name').val()==''){$('#name').css(' border-color', '#ff0000');}
	return false;
}
function dateAndTime() { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	$d = new Date();
	hour = $d.getHours();
	min = $d.getMinutes();
	day=new Array("воскресенье","понедельник","вторник","среда","четверг","пятница","суббота");
	date = $d.getDate();
	month = $d.getMonth() + 1;
	year = $d.getFullYear();
	if (hour <10) {hour = "0" + hour;}
	if (min <10) {min = "0" + min;}
	if (day < 10) {day = "0" + day;}
	if (month <10) {month = "0" + month;}
	alert(hour + ':' + min + ', ' + day[$d.getDay()] +', ' + date + '.' + month + '.' + year);
}
jQuery(document).ready(function() {	
	//$('#name').attr('value', today);

	focus($('#name'),$('#comment'));
	focusAnswer($('#name_answerer'),$('#comment_answerer'));

	$('#add_comment').on('click', function(event) {
		$('.answerer').hide();
		event.preventDefault();
		$('#name').attr('value','');
		$('#comment').text('');
		if(($('#name').val()=='')||($('#comment').val()=='')){
			validation($('#name'),$('#comment'));
		}
		else {
			$('.warning').hide();
			/*$comment = '<div class="comment"><div class="user_name">
			<p>Дуб<span>&emsp;17:58, пятница, 25.05.2013</span></p></div>
			<div class="user_message"><p>бурда</p></div><a href="#">Ответить</a></div>';*/

			//$('.new-comment').show();
			//$('.new-comment .user_name p').text($('#name').val());
			//$('.new-comment .user_message p').text($('#comment').val());
			//$('#add_comment').after($('.new-comment'));

			$('#name').attr('value','Представьтесь, пожалуйста');
			$('#comment').text('Введите текст сообщения...');
		}	
	});

	$('#add_comment_answerer').on('click', function(event) {
		event.preventDefault();
		$('#name_answerer').attr('value','');
		$('#comment_answerer').text('');
		if(($('#name_answerer').val()=='')||($('#comment_answerer').val()=='')){
			validation($('#name_answerer'),$('#comment_answerer'));
		}
		else {
			$('.warning').hide();	
			//$('.new-comment').show();
			//$('.new-comment .user_name p').text($('#name_answerer').val());
			//$('.new-comment .user_message p').text($('#comment_answerer').val());
			
			//$(this).after($('.new-comment'));
			//$('.answer').after($('.new-comment'));
			$('#name_answerer').attr('value','Представьтесь, пожалуйста');
			$('#comment_answerer').text('Введите текст сообщения...');
		}	
	});

	$('.comments a').on('click', function(){
		/*$form = '<div class="comment-form"><form action="#"><div class="field">
		<input type="text" id="name" value="Представьтесь, пожалуйста">
		<textarea id="comment">Введите текст сообщения...</textarea></div><div class="control">
		<input type="submit" id="add_comment" value="Добавить комментарий"></div></form></div>';*/
		//$(this).after($form);

		$('.warning').hide();
		$(this).after($('.answerer'));
		//$(this).parent().after($('.answerer'));
		$('.answerer').css('display', 'block')
		        //.css('margin-left', '50px')
		        .css('padding-top', '20px');             

		//$('#comment_answerer').text($(this).parent().find('.user_name p').text().split(' ')[0]+',');

	});

});