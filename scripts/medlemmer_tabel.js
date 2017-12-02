//Scrip for memberdatabase'
//Mads Peter Jensen

//Show main table
function ShowMainTabel()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/Membertable.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('Content').innerHTML = this.responseText;

        GetMainTable();
    };
    xmlhttp.send();
}

// get data for main table
function GetMainTable()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_complete_members.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillMainTable(xmlhttp.responseText);
        }
    };
    xmlhttp.send();
}

function ShowSearchTabel()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/Membertable.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('Content').innerHTML = this.responseText;

        //var searchinput = document.getElementById('searchtext');
        GetSearchTable();

    };
    xmlhttp.send();
}



function GetSearchTable()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_search_members.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillMainTable(xmlhttp.responseText);
        }
    };

    var searchinput = document.getElementById('searchtext');

    var sendval = JSON.stringify({searchtext: searchinput.value});
    //var sendval = JSON.stringify({searchtext: searchtext});

    xmlhttp.send(sendval);

}

function ShowVarSearchTabel(searchtext)
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/Membertable.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('Content').innerHTML = this.responseText;

        //var searchinput = document.getElementById('searchtext');
        GetVarSearchTable(searchtext);

    };
    xmlhttp.send();
}

function GetVarSearchTable(searchtext)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_search_members.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillMainTable(xmlhttp.responseText);
        }
    };

    //var searchinput = document.getElementById('searchtext');

    //var sendval = JSON.stringify({searchtext: searchinput.value});
    var sendval = JSON.stringify({searchtext: searchtext});

    xmlhttp.send(sendval);

}


function FillMainTable(data)
{
    var myTable = JSON.parse(data);

    var mt = "<thead><tr><th>ID</th><th>Navn</th><th>Adresse</th><th>Adresse2</th><th>Postnummer</th><th>ByNavn</th><th></th></tr></thead>";

    for (var i = 0; i < myTable.length; i++)
    {
        mt += "<tr>";
        mt += "<td onclick='SelectMembershipRow(this)'>" + myTable[i].ID + "</td>";
        mt += "<td onclick='SelectMembershipRow(this)'>" + myTable[i].Navn + "</td>";
        mt += "<td onclick='SelectMembershipRow(this)'>" + myTable[i].Adresse + "</td>";
        mt += "<td onclick='SelectMembershipRow(this)'>" + myTable[i].Adresse2 + "</td>";
        mt += "<td onclick='SelectMembershipRow(this)'>" + myTable[i].PostNummer + "</td>";
        mt += "<td onclick='SelectMembershipRow(this)'>" + myTable[i].ByNavn + "</td>";
        mt += "<td onclick='DeleteMembership(this)'><img src=\"./Pics/Trash.png\" alt=\"D\"></img></td>";
        mt += "</tr>";
    }
    document.getElementById('maintable').innerHTML = mt;
    //document.getElementById('knapmenu').innerHTML =''
    MakeNewMembershipButton();
}


function SelectMembershipRow(data)
{
    data = data.parentNode;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/Membership.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('Content').innerHTML = this.responseText;

        GetMembership(data);
    };
    xmlhttp.send();
}

function GetMembership(data)
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_membership.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillMembership(xmlhttp.responseText);
        }
    };

    var sendval = JSON.stringify({membership: data.children[0].innerHTML});
    xmlhttp.send(sendval);

}

function FillMembership(data)
{

    var myObj = JSON.parse(data);
    document.getElementById('membershipnumber').innerHTML = myObj[0].ID;
    document.getElementById('adresse').value = myObj[0].Adresse;
    document.getElementById('adresse2').value = myObj[0].Adresse2;
    document.getElementById('postnummer').value = myObj[0].PostNummer;
    document.getElementById('bynavn').value = myObj[0].ByNavn;
    document.getElementById('land').value = myObj[0].Land;
    document.getElementById('kommentar').value = myObj[0].Comments;

    MembersTabel();
    BetalingTabel();

    MakeMembershipButtons();

}

function MakeMembershipButtons()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/MembershipButtons.html', true);
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

function UpdateMembership()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_membership.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Database opdateret");

        }
    };

    var myObj = {
        ID: document.getElementById('membershipnumber').innerHTML,
        Adresse: document.getElementById('adresse').value,
        Adresse2: document.getElementById('adresse2').value,
        Postnummer: document.getElementById('postnummer').value,
        Bynavn: document.getElementById('bynavn').value,
        Land: document.getElementById('land').value,
        Kommentar: document.getElementById('kommentar').value
    };

    var sendval = JSON.stringify(myObj);
    xmlhttp.send(sendval);

}


function CreateNewMembership() {


}

// When the user clicks on <span> (x), close the modal
function CloseModal() {
// Get the modal
    var MyModalBox = document.getElementById('modalbox');
    document.getElementById('modalcontent').innerHTML="";
// Hide modal Windue 
    MyModalBox.style.display = "none";

}

function GotoLoggedin()
{
    window.location.href = 'logged_in.php';
}

function GotoLoggedout()
{
    window.location.href = 'logged_out.php';
}

function GotoLogin()
{
    window.location.href = 'login.php';
}
