function ModalNewPhone()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/NewPhone.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;


        //Open the Modal box
        document.getElementById('modaltext').innerHTML = "Venligst udfyld telefon nummer";
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };

    xmlhttp.send();
}

function SendNewPhone()
{
    //Send nyt medlemskab til database
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_new_phone.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Telefon nummer registreret!");
            //var MemberName = document.getElementById('newmember').value;
            MemberPage(document.getElementById('membernumber').innerHTML);
            CloseModal();
            //ShowVarSearchTabel(MemberName);
        }


    };

    var Mobil = document.getElementById('ismobil').checked;
    var myIsMobil = Mobil ? "1" : "0";

    //make json to send to database php
    var sendval = JSON.stringify({Phone: document.getElementById('newphone').value,
        IsMobil: myIsMobil,
        MemberID: document.getElementById('membernumber').innerHTML
    });
    xmlhttp.send(sendval);

}

function editphone(data)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/DeletePhone.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;


        //Open the Modal box
        fillphonebox(data)
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };

    xmlhttp.send();
}

function fillphonebox(data)
{

    document.getElementById('modaltext').innerHTML = "Venligst editer telefonnummer for: " + document.getElementById('navn').value;

    document.getElementById('editphoneid').innerHTML = data.children[0].innerHTML
    document.getElementById('editphonetext').value = data.children[1].innerHTML
    document.getElementById('editismobil').checked = data.children[2].innerHTML === "1" ? true : false;
}

function removephone()
{
    var ID = document.getElementById('editphoneid').innerHTML;

    var myObj = {
        ID: ID,
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_remove_phone.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Telefonnummer fjernet");
        }
        MemberPage(document.getElementById('membernumber').innerHTML);
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);


}

function updatephone()
{
    var ID = document.getElementById('editphoneid').innerHTML;
    var Phone = document.getElementById('editphonetext').value;
    var Mobil = document.getElementById('editismobil');
    var myIsMobil = Mobil.checked ? "1" : "0";

    

    var myObj = {
        ID: ID, Phone: Phone, IsMobil: myIsMobil
    };

    var jString = JSON.stringify(myObj);
    myObj

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "set_edit_phone.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            alert("Telefonnummer opdateret");
        }
        MemberPage(document.getElementById('membernumber').innerHTML);
        CloseModal();
    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);


}
