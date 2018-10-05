

var leftarrow =document.getElementById("leftarrow");
var rightarrow =document.getElementById("rightarrow");
var pic = document.getElementById("pic");
var box =document.getElementById("box");
var boxlist = document.getElementById("boxlist");
function show(){
    boxlist.innerHTML ="";
    var ban = document.getElementById("photo");
    ban.style.marginLeft = "";
    ban.style.marginRight = "";
    box.style.display = "block";
    var img = document.createElement("div");
    img.innerHTML = "<img src='../upload/bb2.jpg'>,<img src='../upload/bb3'>," +
    "<img src='../upload/bb2.jpg'>,<img src='../upload/bb5.jpg'>," +
    "<img src='../upload/bb4.jpg'>,<img src='../upload/bb5.jpg'>,";
    boxlist.appendChild(img);

    leftarrow.onclick = function() {
        var ban = document.getElementById("photo");
        if(ban.style.marginLeft == ""){
            ban.style.marginLeft = "0px";
        }
        ban.style.marginLeft = parseInt(ban.style.marginLeft) - 980 + "px";
        if(parseInt(ban.style.marginLeft) < -4900){
            ban.style.marginLeft = "0px";
        }
    }

    rightarrow.onclick = function (){

        var ban = document.getElementById("photo");
        if(ban.style.marginLeft == ""){
            ban.style.marginLeft = "0px";
        }
        ban.style.marginLeft = parseInt(ban.style.marginLeft) + 980 + "px";
        if(parseInt(ban.style.marginLeft) > 0){
            ban.style.marginLeft = "-4900px";
        }
    }
    //document.body.parentNode.style.overflowY = "hidden";

}
var close = document.createElement("div");
close.innerHTML = "<img src='../images/close.png' style='position: absolute;left: 80%;top: 20px;width: 50px'>"

box.appendChild(close);

close.onclick = function () {
//        alert("fffff");
    box.style.display = "none";
}

function play(){
    var play = document.getElementById("play");
    var v = document.getElementById("v");
    play.style.display = "block";
    var video = document.createElement("div");
    video.style.width = "90%";
    video.style.marginLeft ="25%";
    video.innerHTML = "<video src='../upload/video.mp4' autoplay = autoplay style='width: 100%'>";
    video.style.height = "400px";
    video.style.marginTop = "30%";
    v.appendChild(video);

    var close = document.createElement("div");
    close.innerHTML = "<img src='../images/close.png' style='position: absolute;left: 80%;top: 20px;width: 50px'>"

    play.appendChild(close);
    close.onclick = function () {
//        alert("fffff");
        play.style.display = "none";
    }
    //document.body.parentNode.style.overflowY = "hidden";
    //alert( document.body.parentNode.style.overflowY);
}