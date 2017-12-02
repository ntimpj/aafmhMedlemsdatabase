
//get betalings data from database
function BetalingTabel()
{
        //Send betaling to database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_betalinger.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
             FillBetalingTabel(xmlhttp.responseText);
        }
    };

    //make json to send to database php
    var sendval = JSON.stringify({membership: document.getElementById('membershipnumber').innerHTML});
    xmlhttp.send(sendval);
}

//create betaling tabel on the membership page
function FillBetalingTabel(data)
{
    var myPayments = JSON.parse(data);

    var Page = "<thead><tr><th>ID</th><th>Betaling</th><th>Dato</th><th>Beløb</th></tr></thead>";

    for (var i = 0; i < myPayments.length; i++)
    {
        Page += "<tr onclick='DeleteBetaling(this)'><td>" + myPayments[i].ID + "</td><td>" + myPayments[i].BetalingsNavn + "</td><td>" + myPayments[i].BetalingsDate + "</td><td>" + myPayments[i].Beloeb + "</td></tr>";
    }
    document.getElementById('betalingtabel').innerHTML = Page;
}

//Betalings dialog
function ModalBetaling()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/Betaling.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

        FillBetalingsDialog();

        //Open the Modal box
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };
    xmlhttp.send();
}

function FillBetalingsDialog()
{
    //Make toptext
    var MyModalText = document.getElementById('modaltext');
    var ipNumber = document.getElementById('membershipnumber');
    var ipAdresse = document.getElementById('adresse');
    MyModalText.innerHTML = "Registrer Kontingent Betaling for " + ipNumber.innerHTML + " " + ipAdresse.value;

    //get kontingenter from database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_kontingenter.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            var myObj = JSON.parse(xmlhttp.responseText);
            //fill table with rows
            var Page = "";
            for (var i = 0; i < myObj.length; i++)
            {
                Page += "<tr onclick='PayThis(this)'><td>" + myObj[i].ID + "</td><td>" + myObj[i].BetalingsNavn + "</td><td>" + myObj[i].Beloeb + "</td> </tr>";
            }
            document.getElementById('kontingenttabel').innerHTML += Page;

            //set default values
            document.getElementById('betalid').innerHTML = myObj[0].ID;
            document.getElementById('betalnavn').innerHTML = myObj[0].BetalingsNavn + " kr." + myObj[0].Beloeb;

        }
    };

    xmlhttp.send();

    var MyModalBox = document.getElementById('modalbox');
    MyModalBox.style.display = "block";

}
function SendBetaling()
{
    //Send betaling to database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_betaling.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Betaling registreret!");
        }
        BetalingTabel();
        CloseModal();
    };

    //make json to send to database php
    var sendval = JSON.stringify({konID: document.getElementById('betalid').innerHTML, msID: document.getElementById('membershipnumber').innerHTML});
    xmlhttp.send(sendval);

}

//Set the selected kontingent
function PayThis(data)
{
    var ipID = document.getElementById('betalid');
    var ipNavn = document.getElementById('betalnavn');

    ipID.innerHTML = data.children[0].innerHTML;
    ipNavn.innerHTML = data.children[1].innerHTML + " kr." + data.children[2].innerHTML;

}

function DeleteBetaling(data)
{
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/DeleteBetaling.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

        FillDeleteBetaling(data);

        //Open the Modal box
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };
    xmlhttp.send();

}

//delete line from tabel
function FillDeleteBetaling(data)
{
    document.getElementById('removetext').innerHTML = "Fjern Kontingent Betaling for " + document.getElementById('membershipnumber').innerHTML + " " + document.getElementById('adresse').value;
    document.getElementById('removeid').innerHTML = data.children[0].innerHTML;
    document.getElementById('betalnavn').innerHTML = data.children[1].innerHTML + " d." +data.children[2].innerHTML +" kr."+ data.children[3].innerHTML;
}

function RemoveBetaling()
{
    var ID = document.getElementById('removeid').innerHTML;

    var myObj = {
        ID: ID,
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_remove_betaling.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Betaling fjernet");
        }
        BetalingTabel();
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);
}
