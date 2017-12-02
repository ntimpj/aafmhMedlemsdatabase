//Betalings dialog
function ModalEgenskaber()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/Egenskaber.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

        FillEgenskabDialog();

        //Open the Modal box
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };
    xmlhttp.send();
}

function FillEgenskabDialog()
{
    //Make toptext
    var MyModalText = document.getElementById('modaltext');
    var ipNumber = document.getElementById('membernumber');
    var ipNavn = document.getElementById('navn');
    MyModalText.innerHTML = "Registrer egenskab for " + ipNumber.innerHTML + " " + ipNavn.value;

    //get kontingenter from database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_all_egenskaber.php", true);
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
                Page += "<tr onclick='SendEgenskabThis(this)'><td>" + myObj[i].ID + "</td><td>" + myObj[i].Beskrivelse + "</td></tr>";
            }
            document.getElementById('egenskabtabel').innerHTML += Page;

            //set default values
            document.getElementById('egenskabid').innerHTML = myObj[0].ID;
            document.getElementById('egenskabnavn').innerHTML = myObj[0].Beskrivelse;

        }
    };

    xmlhttp.send();

    var MyModalBox = document.getElementById('modalbox');
    MyModalBox.style.display = "block";

}
function SendEgenskab()
{
    //Send betaling to database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_egenskab.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Egenskab registreret!");
        }
        MemberPage(document.getElementById('membernumber').innerHTML);
        CloseModal();
    };

    //make json to send to database php
    var sendval = JSON.stringify({egnID: document.getElementById('egenskabid').innerHTML, msID: document.getElementById('membernumber').innerHTML});
    xmlhttp.send(sendval);

}
function SendEgenskabThis(data)
{
    var ipID = document.getElementById('egenskabid');
    var ipNavn = document.getElementById('egenskabnavn');

    ipID.innerHTML = data.children[0].innerHTML;
    ipNavn.innerHTML = data.children[1].innerHTML;

}

function editegenskab(data)
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/RemoveEgenskab.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

        FillEditEgenskabDialog(data);

        //Open the Modal box
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };
    xmlhttp.send();
}

function FillEditEgenskabDialog(data)
{
    document.getElementById('modaltext').innerHTML = "Fjern Egenskab " + data.children[2].innerHTML + " fra " + document.getElementById('navn').value;

    document.getElementById('removeid').innerHTML = data.children[1].innerHTML;
    document.getElementById('egenskabnavn').innerHTML = data.children[2].innerHTML;
}

function RemoveEgenskab()
{

    var ID = document.getElementById('removeid').innerHTML;

    var myObj = {
        ID: ID,
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_remove_egenskab.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Egenskab fjernet");
        }
        MemberPage(document.getElementById('membernumber').innerHTML);
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);


}



function ShowEgenskaberTabel()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/EgenskaberTabel.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('Content').innerHTML = this.responseText;

        GetEgenskaberTable();
    };
    xmlhttp.send();
}

// get data for main table
function GetEgenskaberTable()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_all_egenskaber.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillEgenskaberTable(xmlhttp.responseText);
        }
    };
    xmlhttp.send();
}

function FillEgenskaberTable(data)
{
    var myTable = JSON.parse(data);

    var mt = "<thead><tr><th>ID</th><th>Navn</th></tr></thead>";

    for (var i = 0; i < myTable.length; i++)
    {
        mt += "<tr onclick='SelectEgenskaberRow(this)'>";
        mt += "<td>" + myTable[i].ID + "</td>";
        mt += "<td>" + myTable[i].Beskrivelse + "</td>";
        mt += "</tr>";
    }
    document.getElementById('egenskabertable').innerHTML = mt;
    //document.getElementById('knapmenu').innerHTML =''
    MakeNewEgenskaberButton();
}

function MakeNewEgenskaberButton()
{


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/NewEgenskaberButton.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('knapmenu').innerHTML = this.responseText;

        // GetMembership();
    };
    xmlhttp.send();

}

function ModalNewEgenskaber()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/newEgenskab.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;


        //Open the Modal box
        document.getElementById('modaltext').innerHTML = "Venligst udfyld mail";
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };

    xmlhttp.send();
}

function SendNewEgenskab()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_new_global_egenskab.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Egenskab registreret!");
            CloseModal();
            ShowEgenskaberTabel();
        }


    };

    //make json to send to database php
    var sendval = JSON.stringify({Description: document.getElementById('newegenskab').value
    });
    xmlhttp.send(sendval);
}

function SelectEgenskaberRow(data)
{
          var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/RemoveGlobalEgenskab.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

   document.getElementById('modaltext').innerHTML = "Fjern Egenskab " + data.children[1].innerHTML;

    document.getElementById('removeid').innerHTML = data.children[0].innerHTML;
    document.getElementById('egenskabnavn').innerHTML = data.children[1].innerHTML;
        //Open the Modal box
        
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };

    xmlhttp.send();
    
    
}

function RemoveGlobalEgenskab()
{
          var ID = document.getElementById('removeid').innerHTML;

    var myObj = {
        ID: ID,
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_remove_global_egenskab.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Egenskab fjernet");
        }
        
        CloseModal();
        ShowEgenskaberTabel();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);

}