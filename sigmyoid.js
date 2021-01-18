var video = document.querySelector("#videoElement");
var cloick = false;
var didClick = false;
let tfBookURL = 'http://localhost:3000/static/model1.json';
let tfScreenURL = 'http://localhost:3000/fd/model2.json';
let tensorURL = "";
const getURL = "http://localhost:3000/lastpomo";
const recordURL = "http://localhost:3000/update";
const urlofURLS = "http://localhost:3000/url";
//counter vars in seconds
 let tempoverAllcntr = 0;
 let tempfocsCntr = 0;
 let tempdistCntr = 0;

let overAllcntr = 0;
let focsCntr = 0;
let distCntr = 0;
let model;

let lastFive = [];

function choseDig() {
tensorURL = tfScreenURL;
//console.log(tensorURL);

}
function choseTex() {
    tensorURL = tfBookURL;
    //console.log(tensorURL);
    }

    function sendURL() {
    
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "POST", urlofURLS, true );
        xmlHttp.setRequestHeader("Content-Type", "application/json"); 
    
        var data = JSON.stringify({ "url": tensorURL}); 
        xmlHttp.send(data); 
        xmlHttp.onload = function () {
            window.location.href='choice.html';
        }
    }

function colorChange(colorthing) {
    console.log(colorthing.id);
    var originalcolor = document.getElementById("textbook");
    var originalcolor2 = document.getElementById("digital");
    originalcolor.style = 'background-color: white';
    originalcolor2.style = 'background-color: white';
    var divcolor = document.getElementById(colorthing.id);
    divcolor.style = 'background-color: grey';

}
    