<?php 

include ("db_connection.php");

if(isset($_POST['JSON'])){

    $JsonSubject = json_decode($_POST['JSON'],true);

    $SubjectName = $connection -> real_escape_string($JsonSubject["SubjectName"]);
    $TeacherName = $connection -> real_escape_string($JsonSubject["TeacherName"]);
    $StartTime = $connection -> real_escape_string($JsonSubject["StartTime"]);
    $EndTime = $connection -> real_escape_string($JsonSubject["EndTime"]);
    $Day = $connection -> real_escape_string($JsonSubject["Day"]);
    $Email = $connection -> real_escape_string($JsonSubject["Email"]);

    $Query= "SELECT * FROM subjects WHERE sbj_Name='$SubjectName' 
               AND sbj_teacher='$TeacherName'
               AND sbj_Day='$Day'
               AND startTime='$StartTime'
               AND endTime='$EndTime'";
    $Validationresult = mysqli_query($connection,$Query);

    if(mysqli_num_rows($Validationresult)==0){
        $sql = "INSERT INTO subjects (sbj_Name,sbj_teacher,sbj_Day,startTime,endTime) 
            VALUES('$SubjectName','$TeacherName','$Day','$StartTime','$EndTime')";
        mysqli_query($connection,$sql);

        //Get the data from mySQLO
         $result = mysqli_query($connection, $Query);
        $json_array = array();
         //Transform the sentence result into an array
         while($row = mysqli_fetch_assoc($result)){
            $json_array[] = $row;
        }
        $idSubject = $json_array[0]["id_Subject"];

        $IdSubjectINT = (int)$idSubject;

       $QueryIR = "INSERT INTO usersubjects (email,id_Subject) VALUES('$Email','$IdSubjectINT')";
        mysqli_query($connection,$QueryIR);

        //Returns using JSON
        echo json_encode($json_array[0]);

    }else{
      
        
        $result = mysqli_query($connection, $Query);
        $json_array = array();

        //Transform the sentence result into an array
         while($row = mysqli_fetch_assoc($result)){
            $json_array[] = $row;
        }
        $idSubject=$json_array[0]["id_Subject"];

        $Query= "SELECT * FROM usersubjects WHERE email='$Email' 
               AND id_Subject='$idSubject'";
        $Validationresult = mysqli_query($connection,$Query);

        if(mysqli_num_rows($Validationresult)==0){
            $QueryIR = "INSERT INTO usersubjects (email,id_Subject) VALUES('$Email','$idSubject')";
            echo json_encode($json_array[0]);
        }else{
            echo "The subject already exists.";
        }
        
    }
}else{
    echo "There was a problem sending the data.";
}
?>