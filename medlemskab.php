<?php

include_once('header.php')
?>
<?php

if ($_SESSION["session_level"] > 1) {
    ?>    
    <p id="msetext" >Editer Medlemsskab</p>
    <!--<form action="set_membership.php" method="post">-->
    <div style="width:25%" ID="msMedlemskab" class="medlemmerskab" > 
        <table>
            <tr>
                <td>Medlemsnummer</td>
                <td id="membershipnumber" type="text" name="membershipnumber"></td>    
            </tr>
            <tr>
                <td>Adresse</td>
                <td><input id="adresse" type="text" name="adresse" /></td>    
            </tr>
            <tr>
                <td>Adresse2</td>
                <td><input id="adresse2" type="text" name="adresse2" /></td>    
            </tr>
            <tr>
                <td>PostNummer</td>
                <td><input id="postnummer" type="text" name="postnummer" /></td>    
            </tr>
            <tr>
                <td>By</td>
                <td><input id="bynavn" type="text" name="bynavn" /></td>    
            </tr>
            <tr>
                <td>Land</td>
                <td><input id="land" type="text" name="land" /></td>    
            </tr>
            <tr>
                <td>Kommentarer</td>
                <td><input id="kommentar" type="text" name="kommentar" /></td>    
            </tr>
        </table>
    </div>
    <?php
} else {
    echo 'Du har ikke adgang til denne funktion';
}
?>
<?php

include_once('footer.php');


