<?php

header("Content-Type: application/json");
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if ($_SESSION["session_level"] > 1) {
    require_once ('functions.php');
    $Retval = file_get_contents("php://input");
    $jretval = json_decode($Retval);

    //Check if login is provided
    require_once("db_provider.php");
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    //check connection
    if ($mysqli->connect_errno) {
        echo "<p>MySQL fejl nummer {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
        exit();
    }

    $mysqli->set_charset("utf8");

    $sql = "DELETE FROM telefon WHERE ID = ". test_input($jretval->ID);

   // echo $sql;

    $mysqli->query($sql);
} else {
    echo 'Your not authorized for this';
}


