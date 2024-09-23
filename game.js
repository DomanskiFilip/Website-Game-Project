 // Attributes of the player
 var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: 20,
    width: 20
    };

var keys = {
    right: false,
    left: false,
    up: false,
    };
// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.7;
// The platforms
var platforms = [];
//canvas size initially set to screen resolution - the nav bar height
var navHeight = document.getElementsByTagName("nav")[0].clientHeight;
var canvasHeight = window.innerHeight - navHeight;
var canvasWidth = window.innerWidth;

// Define constants for platform color and dimensions
const PLATFORM_COLOR = 'green';
const PLATFORM_WIDTH = 110;
const PLATFORM_HEIGHT = 15;

// Define player starting position
const playerStartX = player.x;
const playerStartY = player.y;

// Define predefined platform positions
const predefinedPlatforms = [
    { x: playerStartX - PLATFORM_WIDTH / 2, y: playerStartY + 20 }, // Platform directly under the player
    { x: 100, y: 300 },
    { x: 300, y: 400 },
    { x: 500, y: 200 },
    // Add more predefined positions as needed
];

// Function to create platforms with predefined positions
function createplat() {
    for (let i = 0; i < predefinedPlatforms.length; i++) {
        platforms.push({
            x: predefinedPlatforms[i].x,
            y: predefinedPlatforms[i].y,
            width: PLATFORM_WIDTH,
            height: PLATFORM_HEIGHT,
            color: PLATFORM_COLOR
        });
    }
}

// Function to render the canvas
function rendercanvas() {
    ctx.fillStyle = "#fff0f0";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

// Function to render the player
function renderplayer() {
    ctx.fillStyle = "#F08080";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to render platforms
function renderplat() {
    for (let i = 0; i < platforms.length; i++) {
        ctx.fillStyle = platforms[i].color;
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

function keydown(e) {
    if (e.keyCode == 37) {
        keys.left = true;
    }
    if (e.keyCode == 39) {
        keys.right = true;
    }
    if (e.keyCode == 32) {
        if (!player.jump) {
            player.y_v = -10; // Adjust the jump velocity as needed
            player.jump = true;
        }
    }
}

// Function to handle keyup events
function keyup(e) {
    if (e.keyCode == 37) {
        keys.left = false;
    }
    if (e.keyCode == 39) {
        keys.right = false;
    }
}

// The main game loop
function loop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If the player is not jumping apply the effect of friction
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
        player.x_v = -2.5;
    }
    if (keys.right) {
        player.x_v = 2.5;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collisions with the platform
    for (let i = 0; i < platforms.length; i++) {
        if ((player.y + player.height > platforms[i].y && player.y + player.height <= platforms[i].y + platforms[i].height) &&
            (player.x + player.width > platforms[i].x && player.x < platforms[i].x + platforms[i].width)) {
            player.jump = false;
            player.y = platforms[i].y - player.height; // Adjust player position to be on top of the platform
            player.y_v = 0;
        }
    }
    // Render the player
    rendercanvas();
    renderplat();
    renderplayer();
}

// Initialize the game
document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight - document.getElementsByTagName("nav")[0].clientHeight;
ctx.canvas.width = window.innerWidth;
createplat();
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
setInterval(loop,22);