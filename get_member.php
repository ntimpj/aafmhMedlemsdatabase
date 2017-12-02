<?php
    header("Content-Type: application/json");
    if (session_status() == PHP_SESSION_NONE) 
    {
        session_start();
    }

    if($_SESSION["session_level"]>1)
    {
        
        $data = json_decode(stripslashes(file_get_contents("php://input")));
      
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
        $sql = "SELECT ID, Navn, Comments  FROM medlemmer WHERE  ID = ".$data->member;
        
        $result = $mysqli->query($sql);

        //Check if user exist and has correct password
        if ($result->num_rows == 0) 
        {
            echo "Ingen data";
        }
        else 
        {
            
            $row = $result->fetch_assoc();
            
            $msretval = new stdClass();
            
            $msretval->ID = $row["ID"];
            $msretval->Navn = $row["Navn"];
            $msretval->Comments = $row["Comments"];        
            
            
//            $sql = "SELECT ID, MedlemsTypeID, Navn FROM medlemmer WHERE ID = ".$data->membership;
//            $result = $mysqli->query($sql);
//
//            if ($result->num_rows == 0) 
//            {
//                $msretval->Members = "";
//            }
//            else 
//            {
//                $members = $result->fetch_all(MYSQLI_ASSOC);
//                $jsonmembers = json_encode($members);
//                $msretval->Members = $jsonmembers;
//            }
//            
//            $sql = "SELECT betalinger.ID, kontingent.BetalingsNavn, betalinger.BetalingsDate, kontingent.Beloeb  FROM betalinger INNER join kontingent On betalinger.KontingentID = kontingent.ID  AND betalinger.MedlemskabID = ".$data->membership;
//            $result = $mysqli->query($sql);
//
//            if ($result->num_rows == 0) 
//            {
//                $msretval->Payments = "";
//            }
//            else 
//            {
//                $payments = $result->fetch_all(MYSQLI_ASSOC);
//                $jsonPayments = json_encode($payments);
//                $msretval->Payments = $jsonPayments;
//            }
//            
//            
            $jsonretval = json_encode($msretval); 
            
            echo $jsonretval;
        }        
    }
else
{
    echo 'Your not authorized for this';
}




