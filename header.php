<?php
require_once('functions.php'); 
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title> <?php Database_Name(); ?> </title>
        <link rel="stylesheet" type="text/css" href="styles/layout.css">

        <script src="scripts/medlemmer_tabel.js"></script>
        <script src="scripts/medlemmer_betaling.js"></script>
        <script src="scripts/medlem_page.js"></script>
        <script src="scripts/newmembership.js"></script>
        <script src="scripts/newperson.js"></script>
        <script src="scripts/newmail.js"></script>
        <script src="scripts/newphone.js"></script>
        <script src="scripts/egenskab.js"></script>
        <script src="scripts/udtraek.js"></script>
    </head>
    <body>
        <div class="container">

            <header>
                <h1> <?php Database_Name(); ?> </h1>
            </header>

            <nav>
                <ul>
                    <?php
                    if ($_SESSION["session_email"] == "") {
                        echo'<li><a href="login.php">Log ind</a></li>';
                    } else {
                        echo '<li><a href="logout.php">Log ud</a></li>';
                    }
                    ?>    
                    <li><a href="registrer.php">Registrer</a></li>
                    <li><a href="http://wp.aafmh.dk/">Aafmh web site</a></li>
                    <?php
                    if ($_SESSION["session_level"] > 1) {
                        echo'<li><a href="database.php">Database</a></li>';
                    }
                    ?>
                    <?php
                    if ($_SESSION["session_level"] > 1) {
                        echo'<li><a href="egenskaber.php">Egenskaber</a></li>';
                    }
                    ?>
                                        <?php
                    if ($_SESSION["session_level"] > 1) {
                        echo'<li><a href="udtraek.php">Udtræk</a></li>';
                    }
                    ?>

                    <li>
                        <div id = "knapmenu">

                        </div>
                    </li>

                </ul>


            </nav>

            <article>