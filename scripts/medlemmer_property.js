//Betalings dialog
//function ModalProperty()
//{
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.open('GET', 'html/NewProperty.html', true);
//    xmlhttp.onreadystatechange = function () {
//        if (this.readyState !== 4)
//            return;
//        if (this.status !== 200)
//            return; // or whatever error handling you want
//
//        document.getElementById('modalcontent').innerHTML = this.responseText;
//
//        FillPropertiesDialog();
//
//        //Open the Modal box
//        var MyModalBox = document.getElementById('modalbox');
//        MyModalBox.style.display = "block";
//
//    };
//    xmlhttp.send();
//}
//
//function FillPropertiesDialog()
//{
//    //Make toptext
//    var MyModalText = document.getElementById('modaltext');
//    var ipNumber = document.getElementById('membernumber');
//    var ipNavn = document.getElementById('navn');
//    MyModalText.innerHTML = "Registrer Egenskab for " + ipNumber.innerHTML + " " + ipNavn.value;
//
//    //get kontingenter from database
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.open("POST", "get_property_list.php", true);
//    xmlhttp.setRequestHeader("Content-type", "application/json");
//    xmlhttp.onreadystatechange = function ()
//    {
//        if (this.readyState === 4 && this.status === 200)
//        {
//            var myObj = JSON.parse(xmlhttp.responseText);
//            //fill table with rows
//            var Page = "";
//            for (var i = 0; i < myObj.length; i++)
//            {
//                Page += "<tr onclick='PropertyThis(this)'><td>" + myObj[i].ID + "</td><td>" + myObj[i].BetalingsNavn + "</td><td>" + myObj[i].Beloeb + "</td> </tr>";
//            }
//            document.getElementById('kontingenttabel').innerHTML += Page;
//
//            //set default values
//            document.getElementById('betalid').innerHTML = myObj[0].ID;
//            document.getElementById('betalnavn').innerHTML = myObj[0].BetalingsNavn + " kr." + myObj[0].Beloeb;
//
//        }
//    };
//
//    xmlhttp.send();
//
//    var MyModalBox = document.getElementById('modalbox');
//    MyModalBox.style.display = "block";
//
//}
//function SendProperty()
//{
//    //Send betaling to database
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.open("POST", "set_betaling.php", true);
//    xmlhttp.setRequestHeader("Content-type", "application/json");
//    xmlhttp.onreadystatechange = function ()
//    {
//        if (this.readyState === 4 && this.status === 200)
//        {
//            alert("Betaling registreret!");
//        }
//        BetalingTabel();
//        CloseModal();
//    };
//
//    //make json to send to database php
//    var sendval = JSON.stringify({konID: document.getElementById('betalid').innerHTML, msID: document.getElementById('membershipnumber').innerHTML});
//    xmlhttp.send(sendval);
//
//}
//
////Set the selected kontingent
//function PropertyThis(data)
//{
//    var ipID = document.getElementById('betalid');
//    var ipNavn = document.getElementById('betalnavn');
//
//    ipID.innerHTML = data.children[0].innerHTML;
//    ipNavn.innerHTML = data.children[1].innerHTML + " kr." + data.children[2].innerHTML;
//
//}
//
//function editegenskab(data)
//{
//    
//        var xmlhttp = new XMLHttpRequest();
//    xmlhttp.open('GET', 'html/RemoveEgenskab.html', true);
//    xmlhttp.onreadystatechange = function () {
//        if (this.readyState !== 4)
//            return;
//        if (this.status !== 200)
//            return; // or whatever error handling you want
//
//        document.getElementById('modalcontent').innerHTML = this.responseText;
//
//        //FillPropertiesDialog();
//
//        //Open the Modal box
//        var MyModalBox = document.getElementById('modalbox');
//        MyModalBox.style.display = "block";
//
//    };
//    xmlhttp.send();
//    
//    
//    
//    
//}