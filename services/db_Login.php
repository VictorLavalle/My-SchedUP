<?php 
    include ("db_connection.php");

    if(isset($_POST['JSON'])){
        $JsonSubject = json_decode($_POST['JSON'],true);
         $email = $connection -> real_escape_string($JsonSubject["email"]);
         $password = $connection -> real_escape_string($JsonSubject["password"]);
         $passwordHash = md5($password);

         $Query= "SELECT * FROM users WHERE email='$email' AND password='$passwordHash'";
        $Validationresult = mysqli_query($connection,$Query);
      
        if(mysqli_num_rows($Validationresult)!=0){
            
            $NewQuery = "SELECT * from subjects  JOIN usersubjects  on usersubjects.id_Subject=subjects.id_Subject  WHERE email='$email'  ";

            $result =  mysqli_query($connection,$NewQuery);
            $json_arraySubjects = array(); 

            if(mysqli_num_rows($result)!=0){

                while($row = mysqli_fetch_assoc($result)){
                    $json_arraySubjects[] = $row;
                }
            }

            $json_array = array();
            while($row = mysqli_fetch_assoc($Validationresult)){
                $json_array[] = $row;
            }
            
            $json_array[0]["UserSchedule"]=$json_arraySubjects;
            echo json_encode( $json_array[0] );
        }
        
       
    }

?>