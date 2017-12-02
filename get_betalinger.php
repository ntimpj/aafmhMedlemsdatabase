<?php

header("Content-Type: application/json");
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if ($_SESSION["session_level"] > 1) {

    //need variable "membership" with membership number 
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

    $sql = "SELECT betalinger.ID, kontingent.BetalingsNavn, betalinger.BetalingsDate, kontingent.Beloeb  FROM betalinger INNER join kontingent On betalinger.KontingentID = kontingent.ID  AND betalinger.MedlemskabID = " . $data->membership;
    $result = $mysqli->query($sql);

    if ($result->num_rows == 0) {
        echo "No Data";
    } else {
        $msretval = $result->fetch_all(MYSQLI_ASSOC);
    }

    echo json_encode($msretval);
} else {
    echo 'Your not authorized for this';
}

