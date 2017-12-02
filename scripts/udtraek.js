function ShowUdtraekTable()
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/udtraek.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('Content').innerHTML = this.responseText;

        GetUdtrækTable();
    };
    xmlhttp.send();
}

// get data for main table
function GetUdtrækTable()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_udtraek_list.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            FillUdtraekTable(xmlhttp.responseText);
        }
    };
    xmlhttp.send();
}

function FillUdtraekTable(data)
{
    var myTable = JSON.parse(data);

    var mt = "<thead><tr><th>ID</th><th>Udtræk</th></tr></thead>";

    for (var i = 0; i < myTable.length; i++)
    {
        mt += "<tr onclick='SelectUdtraekRow(this)'>";
        mt += "<td>" + myTable[i].id + "</td>";
        mt += "<td>" + myTable[i].Name + "</td>";
        mt += "</tr>";
    }
    document.getElementById('udtraektabel').innerHTML = mt;
    //document.getElementById('knapmenu').innerHTML =''
}

function SelectUdtraekRow(data)
{
    var val = document.getElementById('udtraekid').innerHTML;
    document.getElementById('udtraekid').innerHTML = data.children[0].innerHTML;
    document.getElementById('udtraeknavn').innerHTML = data.children[1].innerHTML;
}

function Hentudtraek()
{

    var ID = document.getElementById('udtraekid').innerHTML;
    var mytext = document.getElementById('udtraeknavn').innerHTML;

    var myObj = {
        ID: ID,
    };

    var jString = JSON.stringify(myObj);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "get_udtraek_result.php", true);
    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200)
        {
            ModalUdtraek(xmlhttp.responseText, mytext);
//            var t = xmlhttp.responseText;
//            alert(t);
        }

    };

    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(jString);


}

function ModalUdtraek(data, mytext)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'html/udtraekpresent.html', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState !== 4)
            return;
        if (this.status !== 200)
            return; // or whatever error handling you want

        document.getElementById('modalcontent').innerHTML = this.responseText;
        document.getElementById('modaltext').innerHTML = mytext;

        FillTextArea(data);

        //Open the Modal box
        var MyModalBox = document.getElementById('modalbox');
        MyModalBox.style.display = "block";

    };
    xmlhttp.send();
}

function FillTextArea(data)
{
    var myTable = JSON.parse(data);

    var mytext = '';

    if (myTable.length > 0)
    {
        //Headder udfyldes
        var val = myTable[0];
        for (var j in val)
        {
            var sub_key = j;
            mytext = mytext + sub_key.trim() + ";";
        }
        mytext = mytext + "\r\n";

        //Værdier udfyldes
        for (var i in myTable)
        {
            var val = myTable[i];
            for (var j in val)
            {
                var sub_val = val[j];
                if (sub_val === null)
                {
                    mytext = mytext + ";";
                } else
                {
                    mytext = mytext + sub_val.trim() + ";";
                }
            }

            mytext = mytext + "\r\n";
        }

    }
    document.getElementById('presentid').innerHTML = mytext;
}
