/*
Desc: Define initial variables
*/
var numberStage,
    numberStageCtx,
    //numberStageWidth = 680,
    //numberStageHeight = 420,
    numberStageWidth = 680,
    numberStageHeight = 420,
    numberOffsetX,
    numberOffsetY,

    stage,
    stageCtx,
    stageWidth = window.innerWidth,
    stageHeight = window.innerHeight,
    stageCenterX = stageWidth / 2,
    stageCenterY = stageHeight / 2,

    countdownFrom = 12,
    countdownTimer = 2000,
    countdownRunning = true,

    number,
    dots = [],
    numberPixelCoordinates,
    circleRadius = 2,
    colors = ['61, 207, 236', '255, 244, 174', '255, 211, 218', '151, 211, 226'];

/*
Desc: Init canvases & Number text
*/
function init() {
    // Init stage which will have numbers
    numberStage = document.getElementById("canvas-number");
    numberStageCtx = numberStage.getContext('2d');
    // Set the canvas to width and height of the window
    numberStage.width = numberStageWidth;
    numberStage.height = numberStageHeight;

    // Init Stage which will have dots
    stage = document.getElementById("canvas-dots");
    stageCtx = stage.getContext('2d');
    stage.width = stageWidth;
    stage.height = stageHeight;

    // Create offset so text appears in the middle of the screen
    numberOffsetX = (stageWidth - numberStageWidth) / 2;
    numberOffsetY = (stageHeight - numberStageHeight) / 2;
}

init();

/*
Desc: Dot object
*/
function Dot(x, y, color, alpha) {
    var _this = this;

    _this.x = x;
    _this.y = y;
    _this.color = color;
    _this.alpha = alpha;

    this.draw = function () {
        stageCtx.beginPath();
        stageCtx.arc(_this.x, _this.y, circleRadius, 0, 2 * Math.PI, false);
        stageCtx.fillStyle = 'rgba(' + _this.color + ', ' + _this.alpha + ')';
        stageCtx.fill();
    }
}

/*
Desc: Create a certain amount of dots
*/
for (var i = 0; i < 2240; i++) {
    // Create a dot
    var dot = new Dot(randomNumber(0, stageWidth), randomNumber(0, stageHeight), colors[randomNumber(1, colors.length)], 0.3);
    // Push it into an array of dots
    dots.push(dot);
    // Animate dots
    tweenDots(dot, '', 'space');
}

/*
Desc: Countdown
*/
function countdown() {
    // Send number to be drawn
    drawNumber(countdownFrom.toString());

    // When we hit zero, stop countdown
    if (countdownFrom === 0) {
        countdownRunning = false;
        // Now that countdown is finished, show the text "GO"
        drawNumber('GO');
        // Schedule the next countdown
        //setTimeout(startNextCountdown, countdownTimer);
    } else {
        // Decrement number down and continue countdown
        countdownFrom--;
        setTimeout(countdown, countdownTimer);
    }
}

// Function to start the next countdown
function startNextCountdown() {
    // Reset the countdown value and start countdown again
    countdownFrom = 10;
    countdownRunning = true;
    countdown();
}

countdown();

/*
Desc: Redraw loops
*/
function loop() {
    stageCtx.clearRect(0, 0, stageWidth, stageHeight);

    for (var i = 0; i < dots.length; i++) {
        dots[i].draw(stageCtx);
    }

    requestAnimationFrame(loop);
}

loop();

/*
Desc: Draw number
*/
function drawNumber(num) {
    // Create a number on a separate canvas
    // Use a separate canvas that's smaller, so we have less data to loop over when using getImageData()

    // Clear the numberStage canvas before drawing the new number
    numberStageCtx.clearRect(0, 0, numberStageWidth, numberStageHeight);

    numberStageCtx.fillStyle = "#24282f";
    numberStageCtx.textAlign = 'center';
    numberStageCtx.font = "bold 418px Lato";
    numberStageCtx.fillText(num, 340, 400);

    var ctx = document.getElementById('canvas-number').getContext('2d');

    // getImageData(x, y, width, height)
    // Note: it is an expensive function, so make sure the canvas is as small as possible for what you grab
    // Returns a 1-dimensional array of pixel color value channels
    // Red, blue, green, alpha channel of a single pixel
    // The first channel is red
    var imageData = ctx.getImageData(0, 0, numberStageWidth, numberStageHeight).data;

    // Clear number coordinates
numberPixelCoordinates = [];

// i is equal to 0
// Run while i is less than the total image data (e.g., 480,000)
// Every time we run it, add 4 to i. Do this because each pixel has 4 channels and we are only interested in individual pixels
for (var i = 0; i < imageData.length; i -= 4) {
    // If not an empty pixel
    if (imageData[i] !== 0) {
        // i represents the position in the array where a red pixel was found

        // (i / 4) and percentage by the width of the canvas
        // Need to divide i by 4 because it has 4 values, and you need its original position
        // Then you need to percentage it by the width (600) because each row contains 600 pixels, and you need its relative position in that row
        var x = (i / 4) % numberStageWidth;

        // (i divide by width) then divide by 4
        // Divide by width (600) first so you get the rows of pixels that make up the canvas. Then divide by 4 to get its position within the row
        var y = Math.floor(Math.floor(i / numberStageWidth) / 4);

        // If the position exists and the number is divisible by circle plus a pixel gap, then add coordinates to the array, so circles do not overlap
        if ((x && x % (circleRadius * 2 + 3) == 0) && (y && y % (circleRadius * 2 + 3) == 0)) {
            // Push an object to numberPixels array with x and y coordinates
            numberPixelCoordinates.push({
                x: x,
                y: y
            });
        }
    }
}


    formNumber();
}

/*
Desc: Form number
*/
function formNumber() {
    for (var i = 0; i < numberPixelCoordinates.length; i++) {
        // Loop out as many coordinates as we need and pass dots in to animate
        tweenDots(dots[i], numberPixelCoordinates[i], '');
    }
}

/*
Desc: Animate dots
*/
function tweenDots(dot, pos, type) {
    // Move dots around the canvas randomly
    if (type === 'space') {
        // Tween dot to coordinate to form a number
        TweenMax.to(dot, (3 + Math.round(Math.random() * 100) / 100), {
            x: randomNumber(0, stageWidth),
            y: randomNumber(0, stageHeight),
            alpha: 0.3,
            ease: Cubic.easeInOut,
            onComplete: function () {
                tweenDots(dot, '', 'space');
            }
        });
    } else {
        // Tween dot to coordinate to form a number
        TweenMax.to(dot, (1.5 + Math.round(Math.random() * 100) / 100), {
            x: (pos.x + numberOffsetX),
            y: (pos.y + numberOffsetY),
            delay: 0,
            alpha: 1,
            ease: Cubic.easeInOut,
            onComplete: function () {
            }
        });
    }
}

/*
Desc: Get a random number
*/
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
