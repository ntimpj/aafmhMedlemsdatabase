function ModalNewMail()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/NewMail.html', true);
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

function SendNewMail()
{
    //Send nyt medlemskab til database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_new_mail.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Mail registreret!");
            //var MemberName = document.getElementById('newmember').value;
            MemberPage(document.getElementById('membernumber').innerHTML);
            CloseModal();
            //ShowVarSearchTabel(MemberName);
        }


    };

    //make json to send to database php
    var sendval = JSON.stringify({Mail: document.getElementById('newmail').value,
        MemberID: document.getElementById('membernumber').innerHTML
    });
    xmlhttp.send(sendval);

}

function editmail(data)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/DeleteMail.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;


        //Open the Modal box
        fillmailbox(data)
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };

    xmlhttp.send();
}

function fillmailbox(data)
{

    document.getElementById('modaltext').innerHTML = "Venligst editer mail for: " + document.getElementById('navn').value;

    document.getElementById('editmailid').innerHTML = data.children[0].innerHTML
    document.getElementById('editmailtext').value = data.children[1].innerHTML
}

function removemail()
{
    var ID = document.getElementById('editmailid').innerHTML;

    var myObj = {
        ID: ID,
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_remove_mail.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Mail fjernet");
        }
        MemberPage(document.getElementById('membernumber').innerHTML);
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);


}

function updatemail()
{
    var ID = document.getElementById('editmailid').innerHTML;
    var Mail = document.getElementById('editmailtext').value;

    var myObj = {
        ID: ID, Mail: Mail
    };

    var jString = JSON.stringify(myObj);
    myObj

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_edit_mail.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Mail opdateret");
        }
        MemberPage(document.getElementById('membernumber').innerHTML);
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);


}
