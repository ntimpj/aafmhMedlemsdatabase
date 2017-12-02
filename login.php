<?php 
    include_once('header.php')
?>
<?php
    //session_start();
    if ($_SESSION["session_username"]=="")
    {
        if (!isset($_POST['submit']))
        {
?>
	<form action="login.php" method="post">
            <table style="width:100%">
                <tr>
                    <td>E-mail:</td>
                    <td><input type="type" name="email"/></td>    
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="password" name="password" /></td>
                </tr>
            </table> 
            <input type="submit" name="submit" value="Login" />
        </form>
            
<?php
       }       
        else 
        {
            //Check if login is provided
            
            require_once("db_provider.php");
            $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            //check connection
            if ($mysqli->connect_errno) 
            {
                echo "<p>MySQL fejl nummer {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
                exit();
            }
 
            require_once ('functions.php'); 
            $email = test_input($_POST['email']);
            $password = test_input(MD5($_POST['password']));
 
            $sql = "SELECT * from users WHERE email = '{$email}' AND password = '{$password}' LIMIT 1";
            $result = $mysqli->query($sql);
            //Check if user exist and has correct password
            if (!$result->num_rows == 1) 
            {
                echo "<p>Dit login til ".Database_Name()." blev afvist</p>";
                echo '<div id="submitbutton" class="submitbutton" onclick="GotoLogin()">Prøv igen</div>';

            }
            else 
            {
	
                //Setting session variable
            
                $firstrow = mysqli_fetch_assoc($result);
                //session_start();

             //   $_SESSION["session_username"] = $firstrow['username'];
                $_SESSION["session_first_name"] = $firstrow['first_name'];
                $_SESSION["session_last_name"] = $firstrow['last_name'];
                $_SESSION["session_email"] = $firstrow['email'];
                $_SESSION["session_level"] = $firstrow['priviledge'];
            
                if($firstrow['priviledge']> 0)
                {
                echo "<p>Du logger nu ind i ".Database_Name()."</p>";
                echo '<div id="submitbutton" class="submitbutton" onclick="GotoLoggedin()">OK</div>';
                }
            }
        }
    }         
?>
<?php 
include_once('footer.php');

