<?php
    require_once('functions.php'); 
    include_once('header.php')
?>
<?php
    if ($_SESSION["session_email"]!="")
    {
        
        $_SESSION["session_first_name"] = "";
        $_SESSION["session_last_name"] = "";
        $_SESSION["session_email"] = "";
        $_SESSION["session_level"] = "";
        
        //header("Refresh:0");
        echo '<p>Du logger nu ud af Århus folkemusikhus medlemsdatabase </p>';
        echo '<div id="submitbutton" class="submitbutton" onclick="GotoLoggedout()">OK</div>';

    }
?>
<?php 
include_once('footer.php');
