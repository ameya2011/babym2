alarm="";
status="";
objects=[];

function preload(){
alarm=loadSound("ringing_old_phone");
}

function setup(){
canvas=createCanvas(400, 400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(400, 400);
objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
console.log("Model Loaded!")
status= true;
}

function gotResult(error, results){
if(error){
console.log(error)
}   
console.log(results);
objects= results;
}

function draw(){
image(video, 0, 0, 400, 400);


if(status != "")
{
r=random(255);
g=random(255);
b=random(255);

objectDetector.detect(video, gotResult);
for(i=0; i<objects.length; i++){
document.getElementById("status").innerHTML="Status: Object Detected";


fill(r, g, b);
percent= floor(objects[i].confidence*100);
textSize(20);
text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
noFill();
stroke(r, g, b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(object[i].label== "person"){
document.getElementById("noofobjects").innerHTML= "Baby found: ";
console.log("stop");
alarm.stop();
}else{
document.getElementById("noofobjects").innerHTML= "Baby not found: ";
console.log("play");
alarm.play();
}
}
}
}