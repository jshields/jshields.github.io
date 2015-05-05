<?php
	if( isset($_POST) ){
		$from = "From: contact form";
		$to = "josh@joshuashields.com";
		$subject = "joshuashields.com Contact";
		$email = $_POST['email'];
		$name = $_POST['name'];
		$message = $_POST['message'];
		$body = "From: ".$name."\n"."E-Mail: ".$email."\n Message: ".$message;
		if (mail ($to, $subject, $body, $from)) {
	        $returnMsg = '<p>Your message has been sent! Thanks.</p>';
	    } else {
	        $returnMsg = '<p>Sorry, something went wrong with sending the message. Please email me directly at <a href="mailto:shields.h.josh@gmail.com?subject='.$subject." - fallback".'&body='.$body.'">josh@joshuashields.com</a>.';
	    }
		session_start();
	    $_SESSION['cf_return'] = $returnMsg;
		header('location:index.php#contactModal');
	}
?>