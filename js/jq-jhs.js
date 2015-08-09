


(function($){
    function validate(){
        if (($('input[type=text]').val().length == 0) && ($('input[type=email]').val().length == 0) && ($('textarea').val().length == 0)){
            //if (!$('#contact-alert').html() ){
                $('#contact-message').append('<p id="contact-alert">Message not sent. There doesn\'t seem to be anything written.</p>');
            //}
            return false;
        }
        return true;
    }

    var modalActive = false;
    var currentModalContent = null;
    var delay = 500;
    
    var ref;
    var modalList = [];
    
    $('.modal').each(function(){
        modalList.push('#'+($(this).attr('id')));
    });
    console.log(modalList);
    
    $(document).ready(function(){
        //modal open/close
        var winhash = window.location.hash;
        if (winhash){
            console.log('window hash: '+winhash);
            modalActive = true;
            currentModalContent = $(winhash).find('.modal-content');
            $(winhash).delay(delay).fadeIn('fast', function(){
            	$('html, body').scrollTop($(currentModalContent).offset().top);
            });
        }
        $('.copy-link').click(function(){
            console.log('copy-link clicked: '+window.location);
        }); 
        $('.modal-btn').click(function(ev){
            ref = $(this).attr('href');
            if (($.inArray(ref, modalList)!=-1) && (!modalActive)){
                ev.preventDefault();
                $('.modal').fadeOut('fast');
                modalActive = true;
                currentModalContent = $(ref).find('.modal-content');
                $(ref).fadeIn('fast', function(){
                	$("html, body").scrollTop($(currentModalContent).offset().top);
            	});
            }
        });
        $(window).resize(function(){
        	if ((modalActive) && (currentModalContent!=null)){
        		$("html, body").scrollTop($(currentModalContent).offset().top);
        	}
    	});
        $(document).click(function(event) {
            if ($(event.target).is('.modal-front, .modal-back, .close-btn')) {
                modalActive = false;
                $('.modal').fadeOut('fast');
            }
        });
        //key commands
        $(document).keydown(function(ev){
            //esc key
            if (ev.keyCode == 27){
                modalActive = false;
                $('.modal').fadeOut('fast');
            }
            //enter key
            if (ev.keyCode == 13)
                $('form:first').submit();
            
            /*if ((ev.keyCode == 13) && (window.location.hash == "#contactModal") ){
                if (validate()){
                    $('form:first').submit();
                }
            }*/
        });
    });
})(jQuery);

    /*
    $('.hideOnStart').each(function(){
        $(this).delay(delay).fadeIn('slow');
        delay += 100;
    });
    $('.imgLinkWrapper a, .wallLink').click(function(ev){
        if (modalActive){
            ev.preventDefault();
        }
    });
    */