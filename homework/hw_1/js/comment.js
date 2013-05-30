function focus(a,b) {
	a.on('focus', function() {$(this).attr('value','');});
	a.on('blur', function() {$(this).attr('value','Представьтесь, пожалуйста');});
    b.on('focus', function() {$(this).text('');});
	b.on('blur', function() {$(this).text('Введите текст сообщения...');});
}
function dateAndTime() {
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
}
function validation(n,c) {
	n.attr('value','Представьтесь, пожалуйста');
	c.text('Введите текст сообщения...');
	$('.warning').show();
	c.after($('.warning'));
	//if(n.val()==''){n.css('border', '1px solid #ff0000');}
	return false;
}
function addComment(n,c) {
	$('.warning').hide();
	dateAndTime();
	$dateComment = hour + ":" + min + ", " + day[$d.getDay()] +", " + date + "." + month + "." + year;
	n.attr('value','Представьтесь, пожалуйста');
	c.text('Введите текст сообщения...');

	$numberCurrent = $('.comments h4').text().charAt(13);
	$qtAnswer = parseFloat($numberCurrent)+1;
	$('.comments h4').text('Комментарии (' + $qtAnswer + ')');
	//n.val('Представьтесь, пожалуйста').html();
	//c.val('Введите текст сообщения...').html();
}
jQuery(document).ready(function() {	

	focus($('#name'),$('#comment'));
	focus($('#name_answerer'),$('#comment_answerer'));
	$('#name').on('focus', function() {$('.answerer').hide();});
	$('#comment').on('focus', function() {$('.answerer').hide();});

	$('#add_comment').on('click', function(event) {
		event.preventDefault();
		$('.answerer').hide();
		$('#name').attr('value','');
		$('#comment').text('');
		if(($('#name').val()=='')||($('#comment').val()=='')){validation($('#name'),$('#comment'));}
		else {
			addComment($('#name'),$('#comment'));
			$('.comment:first').before('<div class="comment "><p class="user_name">'+$('#name').val()+'<span>&emsp;'+$dateComment+'</span></p><p class="user_message">'+$('#comment').val()+'</p><div class="link_ans"><a href="#">Ответить</a></div></div>');
		}	
	});

	$('#add_comment_answerer').on('click', function(event) {
		event.preventDefault();
		$('#name_answerer').attr('value','');
		$('#comment_answerer').text('');
		if(($('#name_answerer').val()=='')||($('#comment_answerer').val()=='')){validation($('#name_answerer'),$('#comment_answerer'));}
		else {
			addComment($('#name_answerer'),$('#comment_answerer'));
			$(this).parent().parent().parent().parent().after('<div class="comment new-comment"><p class="user_name">'+$('#name_answerer').val()+'<span>&emsp;'+$dateComment+'&emsp;'+$(this).parent().parent().parent().parent().parent().find('.user_name p').text().split(' ')[0]+'</span></p><p class="user_message">'+$('#comment_answerer').val()+'</p><div class="link_ans"><a href="#">Ответить</a></div></div>');
			$('.new-comment').addClass('answer');
			$('.answerer').hide();
		}	
	});

	$('.comments a').on('click', function(event){
		event.preventDefault();
		$('.warning').hide();
		//$('.new-comment').hide();
		$(this).after($('.answerer'));
		//$(this).parent().after($('.answerer'));
		$('.answerer').css('display', 'block')
		        .css('padding-top', '20px');             

		//$('#comment_answerer').text($(this).parent().find('.user_name p').text().split(' ')[0]+',');

	});

});