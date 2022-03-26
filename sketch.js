let faceapi;
let video;
let detections;



// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function setup() {
    createCanvas(900, 900);
    asciiDiv = createDiv();
    createCanvas(windowWidth, windowHeight);
    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
     video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    textAlign(RIGHT);
}


function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(0);
    image(video, 0,0, width, height)
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            drawBox(detections)
            drawLandmarks(detections)
        }

    }
    faceapi.detect(gotResults)
}

function drawBox(detections){
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height
        
        stroke(162, 5, 21);
        strokeWeight(10);
      //  rect(x, y, boxWidth, boxHeight);
    }
    
}

function drawLandmarks(detections){
    stroke(0)
    strokeWeight(5)
  //  stroke(255);
    if (mouseIsPressed === true) {
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
    
  //  ellipse(mouseX, mouseY, 80, 80);

    for(let i = 0; i < detections.length; i++){
        // const mouth = detections[i].parts.mouth; 
        // const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        // const rightEyeBrow = detections[i].parts.rightEyeBrow;
        // const leftEyeBrow = detections[i].parts.leftEyeBrow;
       // const forehead = detections[i].parts.forehead;

      //  drawPart(mouth, true);
      //  drawPart(nose, false);
        drawPart(leftEye, true);
      //  drawPart(forehead,true);
       // drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
       // drawPart(rightEyeBrow, false);

    }

}

function drawPart(feature, closed){
    
    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x
        const y = feature[i]._y
        vertex(x, y)
        
    }
    
    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }
    
    
}