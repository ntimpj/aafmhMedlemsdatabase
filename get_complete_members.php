<?php
    header("Content-Type: application/json");
    if (session_status() == PHP_SESSION_NONE) 
    {
        session_start();
    }
    
    if($_SESSION["session_level"]>1)
    {
        
       // $data = json_decode(stripslashes(file_get_contents("php://input")));
      
        //Check if login is provided
        require_once("db_provider.php");
        $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        //check connection
        if ($mysqli->connect_errno) 
        {
            echo "<p>MySQL fejl nummer {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
            exit();
        }
        
        $mysqli->set_charset("utf8");
        $sql = "SELECT ID, Navn, Adresse, Adresse2, PostNummer, ByNavn, Medlemstype FROM v_medlemmer order by MedlemsType, Navn";
        
        $result = $mysqli->query($sql);

//        $msretval = new stdClass();
//        $msretval->ID = "Test";
//        echo json_encode($msretval);
        


$return_arr = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    
    $msretval = new stdClass();
    
            $msretval->ID = $row["ID"];
            $msretval->Navn = $row["Navn"];
            $msretval->Adresse = $row["Adresse"];
            $msretval->Adresse2 = $row["Adresse2"];
            $msretval->PostNummer = $row["PostNummer"];
            $msretval->ByNavn = $row["ByNavn"];
            $msretval->Land = $row["Land"];
            $msretval->Comments = $row["Comments"];     
    
            array_push($return_arr,$msretval);
}
            echo json_encode($return_arr);

    }
else
{
    echo 'Your not authorized for this';
}

