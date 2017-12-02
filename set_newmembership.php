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

    $MSGuid = trim(getGUID(), '{}');

    //Insert the new member ship
    $sql = "insert into medlemskab (Adresse, PostNummer, ByNavn, Land, Adresse2, Comments, MSGuid)
        values('" . test_input($jretval->Adresse) . "','" . test_input($jretval->PostNummer) .
            "','" . test_input($jretval->ByNavn) . "','" . test_input($jretval->Land) .
            "','" . test_input($jretval->Adresse2) . "','" . test_input($jretval->Comments) .
            "','" . $MSGuid . "')";

    echo $sql;

    $mysqli->query($sql);

    //Read the new membership ID from GUID
    $sql2 = "select ID from medlemskab where MSGuid = '" . $MSGuid ."'";
    $result = $mysqli->query($sql2);

    $membershipid = 0;
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        $membershipid = $row["ID"];
    }


    $MSGuid2 = trim(getGUID(), '{}');

    //Insert the new member into member table
    $sql3 = "INSERT INTO medlemmer (Navn, MedlemskabID, MedlemsTypeID, Comments, MSGuid)
    VALUES('" . test_input($jretval->Navn) . "','" . $membershipid .
            "', 1,'" . test_input($jretval->Comments) . "','" . $MSGuid2 . "')";


    // echo $sql;

    $mysqli->query($sql3);
} else {
    echo 'Your not authorized for this';
}


