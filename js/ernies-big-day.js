$(document).ready(function (){
	//console.log("I'm here and I'm ready");
});

$('#btnShot').click(function(ev) {
	//console.log(ev);
	$('.jumbotron').append("<div class='disposable well well-sm'>SO FIRE AWAYYYY!!! <button class='dispose btn btn-lg btn-default'><span class='glyphicon glyphicon-remove'></span></button></div>");
});
$(document).on("click", ".dispose",function() {
	console.log("attempting dispose");
	$(this).parent().fadeOut('slow', function(){
		$(this).remove();
	});
});