


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
    var modalList = [];
    $('.modal').each(function(){
        modalList.push('#'+($(this).attr('id')));
    });
    console.log(modalList);
    
    function openModal(modal){
        if (($.inArray(modal, modalList)!=-1) && (!modalActive)){
            modalActive = true;
            var content = $(modal).find('.modal-content');
            // scroll the start of the modal contents into view, in case we're on a small screen
            $(modal).fadeIn('fast', function(){
                	$('html, body').scrollTop($(content).offset().top);
            });
        }
    }
    function closeModals(){
        modalActive = false;
        $('.modal').fadeOut('fast');
    }

    $(document).ready(function(){
        //modal open/close
        var winhash = window.location.hash;
        if (winhash){
            console.log('window hash: '+winhash);
            openModal(winhash);
        }
        $('.copy-link').click(function(){
            console.log('copy-link clicked: '+window.location);
        }); 
        $('.modal-btn').click(function(ev){
            var ref = $(this).attr('href');
            // It would be nice to set the window.location to the modal ID but this causes scroll jumping too
            ev.preventDefault();
            closeModals();
            openModal(ref);
        });
        /* we may want to scrollTop onto the modal contents when the window gets resized as well, which keeps the modal in view
        However, this causes scroll position jumps on android because the navbar popping in and out triggers the resize event
        $(window).resize(function(){
    	});*/
        
        $('.close-btn').click(function(){
            closeModals();
        });
        $(document).click(function(event) {
            if ($(event.target).is('.modal-front, .modal-back')) {
                console.log(event.target+' clicked', 'related target?: '+event.relatedTarget);
                closeModals();
            }
        });
        //key commands
        $(document).keydown(function(ev){
            //esc key
            if (ev.keyCode == 27){
                closeModals();
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