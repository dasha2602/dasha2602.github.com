jQuery(document).ready(function() {
    function fHide(){
        //$('#login').fadeOut(200);
        $('#login').slideUp(200);
        $('#dark').css("visibility", "hidden");
        $('#page').removeClass('blur');
    }
    $('#openLogin').on('click', function() {
        $('#page').addClass('blur');
        $('#dark').css('visibility', 'visible');
        //$('#login').fadeIn(200);   
        $('#login').slideDown(200);

    });
    $('#cancel').on('click', function(){
        fHide();  
    });
     $('#submit').on('click', function(event) {
        event.preventDefault();
        fHide();
    });
});