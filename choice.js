
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
 let tempdistPhone = 0;
 let tempdistTalk = 0;

let overAllcntr = 0;
let focsCntr = 0;
let distTalk = 0;
let distPhone = 0;
let model;

let lastFive = [];

async function penis() {

    model = await tf.loadLayersModel(tensorURL);
    cloick = true;
}


if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: true
            // after allowing the camera start the video stream
    }).then(function(stream) {
        video.srcObject = stream
            //play the video
        video.play();
    }).catch(function(error) {
        console.log(error);
    });
}

var image = document.getElementById('image'),
    context = image.getContext('2d'); //setting for resolution of image

var imagee = document.getElementById('sadge'),
    sadge = imagee.getContext('2d');

function disppic() {
    context.drawImage(video, video.width / 2 + 50, video.height / 2 + 50, 400, 400, 0, 0, 150, 150);
    picture = sadge.drawImage(video, image.width / 2, image.height / 2, 200, 200, 0, 0, 28, 28);
}

function pngToTf(){
    if (cloick) {
    let img = tf.browser.fromPixels(document.getElementById("image"));
    const pp =  tf.scalar(255.0);
    img = img.div(pp);
    const prediction = model.predict(img.reshape([1, 150, 150, 3]));
    predictions = prediction.dataSync();
    tensorindex = predictions.indexOf(Math.max(...predictions));
   // console.log(tensorindex);

        let cuck;
        if (tensorindex == 0) {
            //console.log("phone");
            distPhone++;
            cuck = 0;
        } else if (tensorindex == 1) {
            //console.log("talk");
            distTalk++;
            cuck = 0;
        } else {
            //console.log("focus");
            focsCntr++;
            cuck = 1;
        }
        if(lastFive.length == 4){
            lastFive.shift();
        }

        lastFive.push(cuck);
        console.log(lastFive);
        if(((lastFive[0] + lastFive[1] + lastFive[2] + lastFive[3])/4) < 0.75){
            document.getElementById('noise').play();
            alert('Please Focus');
            lastFive=[];
        }
    
//do something with the prediction
    return prediction;
}
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
        setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        overAllcntr+=1;
        timer--;
        disppic();
        pngToTf();
		if(timer < 0){
        clearInterval(timer = 0);
        }
    }, 1000);
    
}

function hideTimer() {
    var v = document.getElementById("timer");
    var c = document.getElementById("pepepe");
    //console.log(overAllcntr);

    if (v.style.display === "none") {
       v.style.display = "block";
       c.style.display = "none";
    } else {
       v.style.display = "none";
      c.style.display = "block";
    }
 }

function sendPomos() {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", recordURL, true );
    xmlHttp.setRequestHeader("Content-Type", "application/json"); 

    var data = JSON.stringify({ "TotalTime": overAllcntr, "FocusTime": tempfocsCntr, "DistPhone": tempdistPhone, "DistTalk": tempdistTalk }); 
    xmlHttp.send(data); 
}


function pp() {
    let dick =  document.getElementById('time').textContent;
    document.getElementById('time').textContent = "";
    document.getElementById('poo').textContent = dick;
    tempoverAllcntr = overAllcntr;
    tempfocsCntr = focsCntr;
    tempdistPhone = distPhone;
    tempdistTalk = distTalk;
    cloick = false;
    //console.log(dick);
    //console.log(tempoverAllcntr);
    //console.log(tempfocsCntr);
    //console.log(tempdistCntr);
    
    }


//window onload for choice html countdown timer
window.onload = function() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", urlofURLS, true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/json"); 
    xmlHttp.send()
    xmlHttp.onload = function() { 
                // console.log(JSON.parse(xmlHttp.responseText).FocusTime);
            tensorURL = (xmlHttp.responseText);
            //console.log(tensorURL);
            penis();
            var length = 60 * 25,
            display = document.getElementById('time');
            startTimer(length, display);

        }

}