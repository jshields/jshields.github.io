(function(){
	console.log('script start');
	document.addEventListener("DOMContentLoaded", function(ev) { 
		console.log('DOM Content Loaded');

		document.getElementById('btnSubmit').onclick = function(ev){
			ev.preventDefault();
			console.log('contact submit clicked');
			// category, action, label, value
			//ga('send', 'event', 'category', 'action', 'label', 0);
			var message = "From: Bob Subject:Look at me Message: Hi Josh this is a test. Hi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a testHi Josh this is a test";
			ga('send', 'event', 'contact', 'submit', message, 1);
		}
	});
	window.onload = function(){
		console.log('window loaded inclouding frames, images, etc.');
	}
}());