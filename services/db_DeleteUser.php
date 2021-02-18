<?php  
    include ("db_connection.php");

    if(isset($_POST["Data"])){
        $JsonUser = json_decode($_POST['Data'],true);

        $IDUser = $connection -> real_escape_string($JsonUser["ID"]);

        $sql = "DELETE FROM users WHERE id_User = '$IDUser' ";
        mysqli_query($connection,$sql); 
    }
?>