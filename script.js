var video = document.querySelector("#videoElement");
var stopVideo = document.querySelector("#stop");
var canvas, ctx;


if (navigator.mediaDevices.getUserMedia) {
navigator.mediaDevices.getUserMedia({ video: true, audio: true})
    .then(function (stream) {
    video.srcObject = stream;
    })
    .catch(function (error) {
    console.log("Something went wrong!");
    });
}

    stopVideo.addEventListener("click", stop, false);

function stop(e) {
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
    }

    video.srcObject = null;
}

function init() {
    // Get the canvas and obtain a context for
    // drawing in it
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
  }

function snapshot() {
   // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0,0, canvas.width, canvas.height);
}