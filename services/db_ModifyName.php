<?php  
    include ("db_connection.php");

    if(isset($_POST["Data"])){
        $JsonSubject = json_decode($_POST['Data'],true);

        $IDUser = $connection -> real_escape_string($JsonSubject["ID"]);
        $NewName = $connection -> real_escape_string($JsonSubject["Value"]);
        
        $sql = "UPDATE users SET firstName ='$NewName' WHERE id_User='$IDUser'";
        mysqli_query($connection,$sql); 
    }
?>