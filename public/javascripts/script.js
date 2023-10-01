// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 544;
document.getElementById("Canvas").appendChild(canvas);

// Load images
var bgReady = false;
var FishReady = false;
var netCursorReady = false;

var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "../images/background.jpg";

var FishImage = new Image();
FishImage.onload = function() { 
    FishReady = true;
};
FishImage.src = "../images/Fish.png";

var netCursor = new Image();
netCursor.onload = function() {
    netCursorReady = true;
};
netCursor.src = "../images/Net.png";

// Game variables
var score = 0;
var hopInterval = 2000;
var Fish = {
    speed: 256,
    x: 0,
    y: 0
};

// Set up hopping interval
var hop = setInterval(function() {
    resetLocation();
}, hopInterval);

// Event listeners for cursor change
canvas.addEventListener("mouseenter", function() {
    if (netCursorReady) {
        canvas.style.cursor = "url(" + netCursor.src + ") 16 16, auto";
    }
});

canvas.addEventListener("mouseleave", function() {
    canvas.style.cursor = "auto";
});

// Handle mouse click events to check if the user clicked on the Fish
canvas.addEventListener("mousedown", clicked, false);

function clicked(e) {
    e.preventDefault();
    var x = e.clientX - canvas.getBoundingClientRect().left;
    var y = e.clientY - canvas.getBoundingClientRect().top;

    if (x > Fish.x && x < Fish.x + 150 && y > Fish.y && y < Fish.y + 150) {
        score += 10;
        resetLocation();

        if (hopInterval - 100 >= 50) {
            clearInterval(hop);
            hopInterval -= 100;
            hop = setInterval(function() {
                resetLocation();
            }, hopInterval);
        }
    }
}

// Reset Fish location
var resetLocation = function() {
    Fish.x = 32 + Math.random() * (canvas.width - 64);
    Fish.y = 32 + Math.random() * (canvas.height - 64);
};

// Reset hopping interval
var resetSpeed = function() {
    clearInterval(hop);
    hopInterval = 2000;
    hop = setInterval(function() {
        resetLocation();
    }, hopInterval);
};

// Reset score and speed
var resetScore = function() {
    score = 0;
    resetSpeed();
};

// Render function
var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (FishReady) {
        ctx.drawImage(FishImage, Fish.x, Fish.y);
    }
    ctx.fillStyle = "rgb(0, 0, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = "Score : " + score;
};

// Main game loop
var main = function() {
    render();
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame =
    w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.msRequestAnimationFrame ||
    w.mozRequestAnimationFrame;

// Start the game loop
main();
