<?php
include_once('header.php')
?>
<?php
if ($_SESSION["session_level"] > 1) {
    ?>
    <form action="medlemmer.php" method="post">
        Søg: <input type="text" name="search"/>
        <input type="submit" name="submit" value="Søg"/>
    </form>
    <br/>
    <table ID="#medlemmer" >
        <thead>
            <tr>
                <th>ID</th>
                <th>Navn</th>
                <th>Adresse</th>
                <th>Adresse2</th>
                <th>Postnummer</th>
                <th>ByNavn</th>
            </tr>
        </thead>
        <?php
        //Check if login is provided
        require_once("db_provider.php");
        $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        //check connection
        if ($mysqli->connect_errno) {
            echo "<p>MySQL fejl nummer {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
            exit();
        }

        $mysqli->set_charset("utf8");
        $sql = "";
        if (isset($_POST['submit'])) {
            require_once ('functions.php');
            $search = test_input($_POST['search']);

            $sql = "SELECT ID, Navn, Adresse, Adresse2, PostNummer, ByNavn, Medlemstype FROM v_medlemmer WHERE Navn Like '%"
                    . $search
                    . "%' order by MedlemsType, Navn";
        } else {
            $sql = "SELECT ID, Navn, Adresse, Adresse2, PostNummer, ByNavn, Medlemstype FROM v_medlemmer order by MedlemsType, Navn";
        }

        $result = $mysqli->query($sql);

        //Check if user exist and has correct password
        if ($result->num_rows == 0) {
            echo "Ingen data";
        } else {
            while ($row = $result->fetch_assoc()) {
                echo "<tr onclick=\"SelectRow(this)\"><td>" . $row["ID"] . "</td><td>" . $row["Navn"] . "</td><td>" . $row["Adresse"] . "</td><td>" . $row["Adresse2"] . "</td><td>" . $row["PostNummer"] . "</td><td>" . $row["ByNavn"] . "</td></tr>";
            }
        }
        ?>         
    </table>

    <div id="medlemsskabsedit" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span onclick="CloseMedlemsSkabsEdit()" class="close">&times;</span>
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
            <div style="width:49%" ID="msMedlem" class="medlemmer" > 
                <table>
                        <tr>
                            <td>Medlem </td>
                            <td>Mads</td>
                        </tr>
                </table>
            </div>

            <div id="submitbutton" class="submitbutton" onclick="update_membership()">Opdater</div>
        </div>
    </div> 

    <?php
} else {
    echo 'Du har ikke adgang til denne funktion';
}
?>
<?php
include_once('footer.php');
