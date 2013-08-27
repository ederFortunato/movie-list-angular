<?php
header('Content-Type: application/json');
if(isset($_GET['q'])){
    $url =('http://mymovieapi.com/?title='.$_GET['q'].'&type=json&plot=simple&episode=0&limit=50&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0');
    $cURL = curl_init($url);
    curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
    $resultado = curl_exec($cURL);
    curl_close($cURL);
    print_r($resultado);
}
?>