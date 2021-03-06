<?php 

include ("db_connection.php");

if(isset($_POST['JSON'])){

    $JsonSubject = json_decode($_POST['JSON'],true);

    $EmailUser = $connection -> real_escape_string($JsonSubject["EmailUser"]);
    $IdSubject = $connection -> real_escape_string($JsonSubject["IdSubject"]);

    $Query= "SELECT * FROM usersubjects WHERE email='$EmailUser' AND id_Subject='$IdSubject'";
    
    $Validationresult = mysqli_query($connection,$Query);

    if(mysqli_num_rows($Validationresult)>0){
        $sql = "DELETE FROM usersubjects WHERE email='$EmailUser' AND id_Subject='$IdSubject'";
        mysqli_query($connection,$sql);
    }else{
        echo "Subject does not exist.";
    }
}else{
    echo "There was a problem sending the data.";
}
?>