var video = document.querySelector("#videoElement");
var cloick = false;
var didClick = false;
let tfBookURL = 'http://localhost:3000/static/model1.json';
let tfScreenURL = 'http://localhost:3000/fd/model2.json';
let tensorURL = "";
const getURL = "http://localhost:3000/lastpomo";
const recordURL = "http://localhost:3000/update";
const urlofURLS = "http://localhost:3000/url";
const allData2 = "http://localhost:3000/history"
//counter vars in seconds
 let tempoverAllcntr = 0;
 let tempfocsCntr = 0;
 let tempdistCntr = 0;

let overAllcntr = 0;
let focsCntr = 0;
let distCntr = 0;
let model;

let lastFive = [];
let overallstuff = [];

let focused;
let distractedphone;
let distractedtalk;

window.onload = function () {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", getURL, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json"); 
    xmlHttp.send()
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
           // console.log(JSON.parse(xmlHttp.responseText).FocusTime);
            document.getElementById("overall").innerText = JSON.parse(xmlHttp.responseText).TotalTime;
            document.getElementById("focus").innerText = JSON.parse(xmlHttp.responseText).FocusTime;
            document.getElementById("distPhone").innerText = JSON.parse(xmlHttp.responseText).DistPhone;
            document.getElementById("distTalk").innerText = JSON.parse(xmlHttp.responseText).DistTalk;
            focused = parseInt(JSON.parse(xmlHttp.responseText).FocusTime);
            distractedPhone = parseInt(JSON.parse(xmlHttp.responseText).DistPhone);
            distractedTalk = parseInt(JSON.parse(xmlHttp.responseText).DistTalk);
            console.log(focused);
            console.log(distractedphone);

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
           
            function drawChart() {
           
              var data = google.visualization.arrayToDataTable([
                ['Focused', 'Hours per Day'],
                ['Focused',    Number(focused) ],
                ['Distracted by Phone',      Number(distractedPhone)],
                ['Distracted by Talking',      Number(distractedTalk)],
              ]);
           
              var options = {
                title: 'Your Summary',
                backgroundColor:'#cde2f7',
              };
           
              var chart = new google.visualization.PieChart(document.getElementById('piechart'));
           
              chart.draw(data, options);
            }
    }
    overall()


}

function hideSumm() {
    var v = document.getElementById("sumData");
    var c = document.getElementById("stop");

    if (v.style.display === "none") {
       v.style.display = "block";
       c.style.display = "none";
    } else {
       v.style.display = "none";
       c.style.display = "block";
    }
 }

function overall() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", allData2, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json"); 
    xmlHttp.send()
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            overallstuff = JSON.parse(xmlHttp.responseText).data;
            var dropdown = document.getElementById('dropdown');
            console.log(overallstuff);
            for (let i=0; i<overallstuff.length; i++) {    
                var option = document.createElement('option');
                option.innerText = "Pomodoro " + (i+1); 
                option.value = i;
                dropdown.appendChild(option);
            }
            
        }
}


function googlestuff(i) {
    google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
            var numberboi = parseInt(i)+1;
            document.getElementById("penistitle").innerText = `Pomodoro ${numberboi} Summary`;
            document.getElementById("overall").innerText = overallstuff[i].TotalTime;
            document.getElementById("focus").innerText = overallstuff[i].FocusTime;
            document.getElementById("distPhone").innerText = overallstuff[i].DistPhone;
            document.getElementById("distTalk").innerText = overallstuff[i].DistTalk;

            function drawChart() {
           
              var data = google.visualization.arrayToDataTable([
                ['Focused', 'Hours per Day'],
                ['Focused',    Number(overallstuff[i].FocusTime) ],
                ['Distracted by Phone',      Number(overallstuff[i].DistPhone)],
                ['Distracted by Talking',      Number(overallstuff[i].DistTalk)],
              ]);
           
              var options = {
                title: 'Your Summary',
                backgroundColor:'#cde2f7',
              };
           
              var chart = new google.visualization.PieChart(document.getElementById('piechart'));
           
              chart.draw(data, options);
    }
}
