<?php

header("Content-Type: application/json");
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if ($_SESSION["session_level"] > 1) {

    $data = json_decode(stripslashes(file_get_contents("php://input")));

    //Check if login is provided
    require_once("db_provider.php");
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    //check connection
    if ($mysqli->connect_errno) {
        echo "<p>MySQL fejl nummer {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
        exit();
    }


    $mysqli->set_charset("utf8");
    
    //Edit from here

    $sql = "select ID, BetalingsNavn, Beloeb from kontingent order by OrderNo desc";

    $result = $mysqli->query($sql);

    //Check if user exist and has correct password
    if ($result->num_rows == 0) {
        echo "Ingen data";
    } else {
        
        $msretval = new stdClass();
        
        $msretval = $result->fetch_all(MYSQLI_ASSOC);

        //Edit to here
        $jsonretval = json_encode($msretval);

        echo $jsonretval;
    }
} else {
    echo 'Your not authorized for this';
}


