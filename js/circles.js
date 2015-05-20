(function(){
//ga('send', 'event', 'category', 'action', 'label', value);
	console.log('script start');
	document.addEventListener('DOMContentLoaded', function(ev) {
		console.log('DOM Content Loaded');
	}, false);
	window.addEventListener('load', function(){
		console.log('window loaded including frames, images, script tag code referencing external APIs, etc.');
		document.getElementById('btnSubmit').addEventListener('click', function(ev){
			ev.preventDefault();
			console.log('contact submit clicked');
			//ga('send', 'event', 'submit', 'click', 'contact');
			var usrEmail, usrName, usrMsg;
			usrEmail = document.getElementById('txtEmail').value;
			usrName = document.getElementById('txtName').value;
			usrMsg = document.getElementById('txtMessage').value;
			console.log('name, email, msg='+usrName+', '+usrEmail+', '+usrMsg);
			//write regex for finding email, consider grabbing regex from the HTML5 living standard page on input type email
			if (!usrEmail.substr('@')){
				console.log('@ missing from email');
			}
			if (usrName === ""){
				console.log('name empty');	
			}
			if (usrMsg === ""){
				console.log('msg empty\\a');
			}
		}, false);
	}, false);
}());