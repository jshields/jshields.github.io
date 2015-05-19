(function(){
	console.log('script start');
	document.addEventListener('DOMContentLoaded', function(ev) { 
		console.log('DOM Content Loaded');

		document.getElementById('btnSubmit').onclick = function(ev){
			ev.preventDefault();
			console.log('contact submit clicked');
		}
	});
	window.onload = function(){
		console.log('window loaded inclouding frames, images, etc.');
	}
}());