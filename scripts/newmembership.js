function MakeNewMembershipButton()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/NewMembershipbutton.html', true);
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

//New Membership dialog
function ModalNewMembership()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/NewMembership.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;

        //Open the Modal box
        document.getElementById('modaltext').innerHTML = "Venligst udfyld alle detaljer";
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };
    xmlhttp.send();
}

function SendNewMemberShip()
{
    //Send nyt medlemskab til database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_newmembership.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Medlemskab registreret!");
            var MemberName = document.getElementById('membername').value;
            CloseModal();
            ShowVarSearchTabel(MemberName);
        }

     };

    //make json to send to database php
    var sendval = JSON.stringify({Navn: document.getElementById('membername').value,
        Adresse: document.getElementById('adresse').value,
        Adresse2: document.getElementById('adresse2').value,
        PostNummer: document.getElementById('postnummer').value,
        ByNavn: document.getElementById('bynavn').value,
        Land: document.getElementById('land').value,
        Comments: document.getElementById('kommentar').value
    });
    xmlhttp.send(sendval);

}
