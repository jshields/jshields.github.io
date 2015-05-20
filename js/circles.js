(function(){
	console.log('script start');
	document.addEventListener('DOMContentLoaded', function(ev) { 
		console.log('DOM Content Loaded');

		document.getElementById('btnSubmit').onclick = function(ev){
			ev.preventDefault();
			console.log('contact submit clicked');
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
				console.log('name empty\a');	
			}
			if (usrMsg === ""){
				console.log('msg empty\a');
				document.write('\\a');
			}
		};
	});
	window.onload = function(){
		console.log('window loaded inclouding frames, images, etc.');
	};
}());