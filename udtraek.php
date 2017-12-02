<?php
include_once('header.php');
?>
<?php
if ($_SESSION["session_level"] > 1) {
    ?>
    <div id="modalbox" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span onclick="CloseModal()" class="close">&times;</span>
            <p id="modaltext" >Text</p>
            <!--<form action="set_membership.php" method="post">-->
            <div style="width:100%" id="modalcontent"> 
                test
            </div>
        </div>
    </div>
    <div id="top">
        <div class="stack">
            <div id="udtraekbutton" class="submitbutton" onclick="ShowUdtraekTable()">Udtræk</div>
        </div>
   </div><br/><br/><br/>

    <label id="itemname"></label>

    <div ID="Content"></div>


    <div id='bottom' class="stack">

    </div>        

    <?php
} else {
    echo 'Du har ikke adgang til denne funktion';
}
?>
<?php
include_once('footer.php');


