<?php
header('Content-Type: application/json');
$url = '';
if(isset($_GET['q'])&& $_GET['q'] != ''){
    $url = 'http://mymovieapi.com/?title='.$_GET['q'].'&type=json&plot=simple&episode=0&limit=50&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0';
}

if(isset($_GET['ids']) && $_GET['ids'] != ''){
    $url = 'http://mymovieapi.com/?ids='.$_GET['ids'].'&type=json&plot=none&episode=1&lang=en-US&aka=simple&release=simple&business=0&tech=0';
}

if($url != ''){
    $cURL = curl_init($url);
    curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
    $resultado = curl_exec($cURL);
    curl_close($cURL);
    print_r($resultado);
}



/*
include("imdb.php");

$movieName = $_REQUEST["q"];
$output = "json";

$i = new Imdb();
$mArr = array_change_key_case($i->getMovieInfo($movieName), CASE_UPPER);


///////////////[ JSON Output ]/////////////////
if($output == "json") {
	header('Content-type: application/json');
	echo json_encode($mArr);
} //End JSON Outout
*/


?>