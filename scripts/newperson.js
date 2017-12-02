function ModalNewPerson()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/NewMember.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;


        //Open the Modal box
        document.getElementById('modaltext').innerHTML = "Venligst udfyld navn";
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };

    xmlhttp.send();
}

function SendNewMember()
{
    //Send nyt medlemskab til database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_newmember.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Medlem registreret!");
            var MemberName = document.getElementById('newmember').value;
            CloseModal();
            ShowVarSearchTabel(MemberName);
        }


    };

    //make json to send to database php
    var sendval = JSON.stringify({Navn: document.getElementById('newmember').value,
        MembershipID: document.getElementById('membershipnumber').innerHTML,
        Membertype: document.getElementById('membertype').value,
        Comments: document.getElementById('comments').value
    });
    xmlhttp.send(sendval);

}
