<?php 

include ("db_connection.php");

if(isset($_POST["JSON"])){

    $JsonSubject = json_decode($_POST['JSON'],true);

    $UserFirstName = $connection -> real_escape_string($JsonSubject["UsertFirstName"]);
    $UserLastName = $connection -> real_escape_string($JsonSubject["UserLastName"]);
    $UserEmail = $connection -> real_escape_string($JsonSubject["UserEmail"]);
    $UserPassword = $connection -> real_escape_string($JsonSubject["UserPassword"]);
    $UserPasswordHash = md5($UserPassword);

    //$typeFile = $_FILES['avatar-file']['type'];
    //$nameFile = $_FILES['avatar-file']['name'];
    //$sizeFile = $_FILES['avatar-file']['size'];
    //$imgUploaded = fopen($_FILES['avatar-file']['tmp_name'],'r');
    //$binarysImg = fread($imgUploaded,$sizeFile);
    //$binarysImg = mysqli_escape_string($connection,$binarysImg);

    $Query= "SELECT * FROM users WHERE email='$UserEmail'";
    $Validationresult = mysqli_query($connection,$Query);

    if(mysqli_num_rows($Validationresult)==0){
        $query = "INSERT INTO users(firstName, lastName, email, password)
                  VALUES ('$UserFirstName','$UserLastName','$UserEmail', '$UserPasswordHash')";
        $result = mysqli_query($connection,$query);
        $getData = mysqli_query($connection,$Query);
        $json_array = array();

         //Se tranforma el resultado de la sentencia  a un array
        while($row = mysqli_fetch_assoc($getData)){
            $json_array[] = $row;
        }
        $json_array[0]["UserSchedule"]=[];
        echo json_encode($json_array[0]);
        
    }else{
        echo "There is already an account associated with this email";
    } 


}

?>