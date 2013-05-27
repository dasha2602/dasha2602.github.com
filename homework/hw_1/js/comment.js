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
function addComment(button,n,c) {
	n.attr('value','');
	c.text('');
	if((n.val()=='')||(c.val()=='')){
		n.attr('value','Представьтесь, пожалуйста');
		c.text('Введите текст сообщения...');
		$('.warning').show();
		c.after($('.warning'));
		//if(n.val()==''){n.css('border', '1px solid #ff0000');}
		return false;
	}
	else {
		$('.warning').hide();
		dateAndTime();
		$dateComment = hour + ":" + min + ", " + day[$d.getDay()] +", " + date + "." + month + "." + year;
		$('.new-comment').show();
		$('.new-comment .user_name').html('<p>'+n.val()+'<span>&emsp;'+$dateComment+'</span></p>');
		$('.new-comment .user_message').html('<p>'+c.val()+'</p>');
		button.after($('.new-comment'));
		n.attr('value','Представьтесь, пожалуйста');
		c.text('Введите текст сообщения...');
	}
}
jQuery(document).ready(function() {	

	focus($('#name'),$('#comment'));
	focusAnswer($('#name_answerer'),$('#comment_answerer'));

	$('#add_comment').on('click', function(event) {
		event.preventDefault();
		$('.answerer').hide();
		addComment($('#add_comment'),$('#name'),$('#comment'));	
	});

	$('#add_comment_answerer').on('click', function(event) {
		event.preventDefault();
		addComment($('#add_comment_answerer'),$('#name_answerer'),$('#comment_answerer'));
		$('.new-comment').addClass('answer');
	});

	$('.comments a').on('click', function(){
		$('.warning').hide();
		$('.new-comment').hide();
		$(this).after($('.answerer'));
		//$(this).parent().after($('.answerer'));
		$('.answerer').css('display', 'block')
		        .css('padding-top', '20px');             

		//$('#comment_answerer').text($(this).parent().find('.user_name p').text().split(' ')[0]+',');

	});

});