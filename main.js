stat="";
objects=[];

function preload(){
video=createVideo("video.mp4");
video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("Status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("My sister allowed this code to pass.");
    stat=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function setup(){
    canvas=createCanvas(480,300);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 300);

    if(stat!=""){
        objectDetector.detect(video, gotResult);

        for(i=0; i<objects.length;i++){
            fill("red");
            document.getElementById("Status").innerHTML="Status: Objects have been detected";
            document.getElementById("Objects").innerHTML="Number of objects detected are:"+objects.length;
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+ percent+" %", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}