 </article>

<footer>
    <?php
    require_once('functions.php'); 
    Database_Name(); 

    if($_SESSION["session_email"]== "")
    {
        echo ' Ikke logget ind'; 
    }
    else
    {
        require_once ('functions.php');
        $msg = " " .$_SESSION["session_first_name"] . " " .$_SESSION["session_last_name"]. " logged ind som: " . get_priviledge_name($_SESSION["session_level"]);
        echo $msg;
    }
    ?>
</footer>

</div>
    </body>
</html>