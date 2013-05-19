jQuery(document).ready(function() {
    function fHide(){
        $('#login').fadeOut(200);
        $('#dark').css("visibility", "hidden");
    }
    $('#openLogin').on('click', function() {
        $('#page').addClass('blur');
        $('#dark').css('visibility', 'visible');
        //$('#login').show();
        //$('#login').show('scale');
        //$('#login').animate({'top':'-10px'},100);
        $('#login').fadeIn(200); 

    });
    $('#cancel').on('click', function(){
        //$('#login').animate({'top':'-10px'},100);
        fHide();
        $('#page').removeClass('blur');
    });
     $('#submit').on('click', function(event) {
        event.preventDefault();
        fHide();
    });
     
    //$('.main').text('dfgvd');
    /*$("#box").on( "click", function() {
        $( this ).css( "width", "+=200" );
    });*/
});