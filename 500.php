<!-- PHP Wrapper - 500 Server Error -->
<html>
<head>
	<meta name="robots" content="noindex">
	<title>500 Server Error</title>
	<link rel="stylesheet" href="css/portfolioShields.css" type="text/css" />
</head>
<body>
<div class="mainCol">
<h1>Error</h1>
<h2>500 Server Error</h2>
<h3>A misconfiguration on the server caused a hiccup.
Check the server logs, fix the problem, then try again.
<hr>

<?
  echo "URL: http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."<br>\n";
  $fixer = "checksuexec ".escapeshellarg($_SERVER['DOCUMENT_ROOT'].$_SERVER['REQUEST_URI']);
  echo `$fixer`;
?>
</h3>
</div>
</body>
</html>
