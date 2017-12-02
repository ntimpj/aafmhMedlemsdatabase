<?php
require_once('functions.php'); 
include_once('header.php')
?>
<h1> <?php Database_Name(); ?> bruger registrering</h1>
<?php
if (!isset($_POST['submit'])) {
    ?>	<!-- The HTML registration form -->
    <form action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
        <table style="width:100%">
    <!--                <tr>
                <td>Username:</td>
                <td><input type="text" name="username" /></td>    
            </tr>-->
            <tr>
                <td>Email:</td>
                <td><input type="type" name="email" /></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><input type="password" name="password" /></td>
            </tr>
            <tr>
                <td>First name:</td>
                <td><input type="text" name="first_name" /></td>
            </tr>
            <tr>
                <td>Last name:</td>
                <td><input type="text" name="last_name" /></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="submit" name="submit" value="Register" /></td>
            </tr>
        </table> 
    </form>
    <?php
} else {

    //connect mysql server
    require_once("db_provider.php");
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    //check connection
    if ($mysqli->connect_errno) {
        echo "<p>MySQL error no {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
        exit();
    }

    //query database
    //prepare data for insertion
    require_once ('functions.php');
    $email = test_input($_POST['email']);
    $password = MD5($_POST['password']);
    $first_name = test_input($_POST['first_name']);
    $last_name = test_input($_POST['last_name']);
    

    //check if username and email exist else insert
    $exists = 0;
    //$result = $mysqli->query("SELECT username from users WHERE username = '{$username}' LIMIT 1");

    //if ($result->num_rows == 1) {
      //  $exists = 1;
        $result = $mysqli->query("SELECT email from users WHERE email = '{$email}' LIMIT 1");

        if ($result->num_rows == 1) {
            $exists = 2;
        }
    //} else {
      //  $result = $mysqli->query("SELECT email from users WHERE email = '{$email}' LIMIT 1");

        //if ($result->num_rows == 1) {
          //  $exists = 3;
        //}
    //}

    if ($exists == 1) {
        echo "<p>Brugernavn eksistere allerede prøv igen med et andet brugernavn!</p>";
    } else if ($exists == 2) {
        //echo "<p>Brugernavn og email eksistere allerede!</p>";
        echo "<p>Email eksistere allerede!</p>";
    } else if ($exists == 3) {
        echo "<p>Email eksistere allerede!</p>";
    } else {
        //insert data into mysql database
        $sql = "INSERT  INTO `users` (`password`, `first_name`, `last_name`, `email`) 
                VALUES ('{$password}', '{$first_name}', '{$last_name}', '{$email}')";

        if ($mysqli->query($sql)) {
            //echo "New Record has id ".$mysqli->insert_id;
            echo "<p>Du er nu registreret succesfuldt!</p>";

            // the message
            $msg = "Din registrering som bruger af ".Database_Name()." \nEr nu komplet. Du vil være istand til at bruge din login om få dage";

            // use wordwrap() if lines are longer than 70 characters
            $wmsg = wordwrap($msg, 70);

            $headers = "From: mpj@mpjsoft.dk" . "\r\n" . 'Reply-To: mads.peter.jensen@get2net.dk';

            // send email
            mail($email, "AaFMH Medlemsdatabase", $wmsg, $headers);

            echo "<p>Mail has been sendt to " . $email . "</p>";
        } else {
            echo "<p>MySQL error no {$mysqli->errno} : {$mysqli->error}</p>";
            exit();
        }
    }
}
?>		
<?php
include_once('footer.php');
