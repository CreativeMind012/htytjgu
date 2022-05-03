status = "";
img = "";
objectss = [];

function preload(){
    img = loadImage('AC.jpg');
}
function setup(){
    canvas = createCanvas(380, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    status = "true";
    console.log("Model Loaded!");
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objectss = results;
    }
}
function draw(){
    image(img, 0, 0, 380, 420);
    if(status != "")
    {
        for (i = 0; i < objectss.length; i++) {
            percentage = floor(objectss[i].confidence * 100);

            fill(r,g,b);
            text(objectss[i].label + "" + percentage + "%", objectss[i].x + 15,  objectss[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect( objectss[i].x, objectss[i].y, objectss[i].width, objectss[i].height);
            
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "No. of objects in the image: "+ objectss.length +" No. of objects detected: " + objectss[i].length;
        }
    }
}
/*
*/