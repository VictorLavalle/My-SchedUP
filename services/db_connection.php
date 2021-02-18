<?php
$connection = mysqli_connect("localhost", "root", "", "myschedup" );

if (!$connection) {
    die('Not connected : ' . mysql_error());
}
?>