function MemberPageFromTable(data)
{
    var memberNumber = data.parentNode.children[0].innerHTML;
    MemberPage(memberNumber);
}


function MemberPage(memberNumber)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/Member.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('Content').innerHTML = this.responseText;

        GetMember(memberNumber);
    };
    xmlhttp.send();
}

function GetMember(memberNumber)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_member.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillMemberpage(xmlhttp.responseText);
            MailTable();
            MakeMemberButtons();
        }
    };

    var sendval = JSON.stringify({member: memberNumber});
    xmlhttp.send(sendval);
    MemberPageFromTable

}

function FillMemberpage(data)
{
    var myObj = JSON.parse(data);

    document.getElementById('membernumber').innerHTML = myObj.ID;
    document.getElementById('navn').value = myObj.Navn;
    document.getElementById('kommentar').value = myObj.Comments;

}

function MembersTabel()
{
    //Send betaling to database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_members.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillMembersTabel(xmlhttp.responseText);

        }
    };

    var sendval = JSON.stringify({membership: document.getElementById('membershipnumber').innerHTML});
    xmlhttp.send(sendval);
}

function FillMembersTabel(data)
{
    var myMembers = JSON.parse(data);

    var Page = "<thead><tr><th>ID</th><th>Navn</th><th>Medlems Type</th><th></th></tr></thead>";

    for (var i = 0; i < myMembers.length; i++)
    {
        Page += "<tr><td onclick='MemberPageFromTable(this)'>" + myMembers[i].ID + "</td><td onclick='MemberPageFromTable(this)'>" + myMembers[i].Navn + "</td><td onclick='MemberPageFromTable(this)'>" + myMembers[i].MedlemsTypeID + "</td><td onclick='DeleteMember(this)'><img src=\"./Pics/Trash.png\" alt=\"D\"></img></td></tr>";
    }
    document.getElementById('medlemmertabel').innerHTML = Page;
}

function MailTable()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_mails.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillMailTabel(xmlhttp.responseText);
            PhoneTable();
        }
    };

    var sendval = JSON.stringify({membernumber: document.getElementById('membernumber').innerHTML});
    xmlhttp.send(sendval);

}

function FillMailTabel(data)
{
    try {


        var myMails = JSON.parse(data);

        var Page = "<thead><tr><th>ID</th><th>E-Mail</th></tr></thead>";

        for (var i = 0; i < myMails.length; i++)
        {
            Page += "<tr onclick='editmail(this)'><td>" + myMails[i].ID + "</td><td>" + myMails[i].Mail + "</td></tr>";
        }
        document.getElementById('mailtabel').innerHTML = Page;
    } catch (e) {

    }

}


function PhoneTable()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_phones.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillPhoneTabel(xmlhttp.responseText);
            EgenskaberTable();
        }
    };

    var sendval = JSON.stringify({membernumber: document.getElementById('membernumber').innerHTML});
    xmlhttp.send(sendval);

}

function FillPhoneTabel(data)
{
    try {


        var myMails = JSON.parse(data);

        var Page = "<thead><tr><th>ID</th><th>Telefon Nummer</th><th>Mobil</th></tr></thead>";

        for (var i = 0; i < myMails.length; i++)
        {
            Page += "<tr onclick='editphone(this)'><td>" + myMails[i].ID + "</td><td>" + myMails[i].TelefonNummer + "</td><td>" + myMails[i].Mobil + "</td></tr>";
        }
        document.getElementById('telefontabel').innerHTML = Page;
    } catch (e) {

    }

}

function EgenskaberTable()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_egenskaber.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillEgenskaberTabel(xmlhttp.responseText);
        }
    };

    var sendval = JSON.stringify({membernumber: document.getElementById('membernumber').innerHTML});
    xmlhttp.send(sendval);

}

function FillEgenskaberTabel(data)
{
    try {

        var myMails = JSON.parse(data);

        var Page = "<thead><tr><th>TID</th><th>CID</th><th>Egenskab</th></tr></thead>";

        for (var i = 0; i < myMails.length; i++)
        {
            Page += "<tr onclick='editegenskab(this)'><td>" + myMails[i].TID + "</td><td>" + myMails[i].CID + "</td><td>" + myMails[i].Beskrivelse + "</td></tr>";
        }
        document.getElementById('egenskabstabel').innerHTML = Page;
    } catch (e) {

    }

}

function MakeMemberButtons()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/MemberButtons.html', true);
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

function DeleteMembership(data)
{

    data = data.parentNode;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/DeleteMemberShip.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

        FillDeleteMembership(data);
    };
    xmlhttp.send();

    var MyModalBox = document.getElementById('modalbox');
    MyModalBox.style.display = "block";
}

function FillDeleteMembership(data)
{
    document.getElementById('modaltext').innerHTML = 'Slet alle medlemmer på denne adresse og alle data der vedrøre denne adresse';
    document.getElementById('removeadresse').innerHTML = data.cells[2].innerHTML;
    document.getElementById('removeadresseid').innerHTML = data.cells[0].innerHTML;

}

function removemembership(data)
{
    var ID = document.getElementById('removeadresseid').innerHTML;

    var myObj = {
        ID: ID,
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_remove_membership.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Medlemsskab fjernet");
        }
        ShowMainTabel();
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);




}

function DeleteMember(data)
{

    data = data.parentNode;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/DeleteMember.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

        FillDeleteMember(data);
    };
    xmlhttp.send();

    var MyModalBox = document.getElementById('modalbox');
    MyModalBox.style.display = "block";
}

function FillDeleteMember(data)
{
    document.getElementById('modaltext').innerHTML = 'Slet medlemmet og alle data der vedrøre dette medlem';
    document.getElementById('removeperson').innerHTML = data.cells[1].innerHTML;
    document.getElementById('removepersonid').innerHTML = data.cells[0].innerHTML;

}

function removemember(data)
{
    var ID = document.getElementById('removepersonid').innerHTML;

    var myObj = {
        ID: ID
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_remove_member.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Medlemsskab fjernet");
        }
        ShowMainTabel();
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);




}