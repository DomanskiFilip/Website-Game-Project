// INITIAL DECLARATIONS SECTION
// Attributes of the player
var player = {
    x: 650,
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

// Define player starting position
const playerStartX = player.x;
const playerStartY = player.y;

// gravity 
var gravity = 0.6;

// canvas
document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight - document.getElementsByTagName("nav")[0].clientHeight;
ctx.canvas.width = window.innerWidth;

//canvas size initially set to screen resolution - the nav bar height
var navHeight = document.getElementsByTagName("nav")[0].clientHeight;
var canvasHeight = window.innerHeight - navHeight;
var canvasWidth = window.innerWidth;

// platforms
var platforms = [];

// Define constants for platform color and dimensions
const PLATFORM_COLOR = 'green';
const PLATFORM_WIDTH = 110;
const PLATFORM_HEIGHT = 15;

// Define platform positions
const predefinedPlatforms = [
    { x: 650, y: 200 },
    { x: 600, y: 300 },
    { x: 800, y: 400 },
    { x: 850, y: 200 },
    { x: 1000, y: 200 },
    { x: 1200, y: 100 },
    { x: 1300, y: 300 },
    { x: 1100, y: 350 },
    { x: 960, y: 380 },
];

// Calculate the total width of the platforms group
const minX = Math.min(...predefinedPlatforms.map(p => p.x));
const maxX = Math.max(...predefinedPlatforms.map(p => p.x)) + PLATFORM_WIDTH;
const totalWidth = maxX - minX;

// Calculate the total height of the platforms group
const minY = Math.min(...predefinedPlatforms.map(p => p.y));
const maxY = Math.max(...predefinedPlatforms.map(p => p.y)) + PLATFORM_HEIGHT;
const totalHeight = maxY - minY;

// Calculate the center of the canvas
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;

// Calculate the starting x, y positions for the first platform to center the group
const offsetX = centerX - (totalWidth / 2);
const offsetY = centerY - (totalHeight / 2);

// Function to create platforms with predefined positions
function createplat() {
    console.log("Platforms created");
    for (let i = 0; i < predefinedPlatforms.length; i++) {
        platforms.push({
            x: predefinedPlatforms[i].x - minX + offsetX,
            y: predefinedPlatforms[i].y - minY + offsetY,
            width: PLATFORM_WIDTH,
            height: PLATFORM_HEIGHT,
            color: PLATFORM_COLOR
        });
    }
}


// coins
var coins = [];

// Define constants for coin color and dimensions
const COIN_COLOR = 'yellow';
const COIN_WIDTH = 10;
const COIN_HEIGHT = 10;

// Define coin positions
const predefinedCoins = [
    { x: 650, y: 280 },
    { x: 850, y: 380 },
    { x: 900, y: 180 },
    { x: 1050, y: 180 },
    { x: 1250, y: 80 },
    { x: 1350, y: 280 },
    { x: 1150, y: 330 },
    { x: 1010, y: 360 },
];

// Create coins
function createcoins() {
    console.log("Coins created");
    for (let i = 0; i < predefinedCoins.length; i++) {
        coins.push({
            x: predefinedCoins[i].x - minX + offsetX,
            y: predefinedCoins[i].y - minY + offsetY,
            width: COIN_WIDTH,
            height: COIN_HEIGHT,
            color: COIN_COLOR
        });
    }
}

var coinCounter = 0;

//RENDER SECTION

// Function to render the canvas
function rendercanvas() {
    ctx.fillStyle = "#2a44d7";
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

// Function to render coins
function rendercoins() {
    for (let i = 0; i < coins.length; i++) {
        ctx.fillStyle = coins[i].color;
        ctx.fillRect(coins[i].x, coins[i].y, coins[i].width, coins[i].height);
    }
}

// Function to render the coin counter
function renderCoinCounter() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "1000px Arial";
    const text = coinCounter.toString();
    const textWidth = ctx.measureText(text).width; 
    ctx.fillText(text, (canvasWidth / 2) - (textWidth / 2), 800); // Centered horizontally and vertically
}


// MOVEMENT SECTION
// Event listeners for keydown and keyup events
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(e) {
    if (e.keyCode == 37) {
        keys.left = true;
    }
    if (e.keyCode == 39) {
        keys.right = true;
    }
    if (e.keyCode == 38) {
        keys.up = true;
        if (!player.jump) {
            player.y_v = -14; // Adjust the jump velocity as needed
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
    if (e.keyCode == 38) {
        keys.up = false;
    }
}


// GAME SECTION
let score = 0; // Variable to store the player's score
let gameEnded = false; // Flag to check if the game has ended

function renderVictoryMessage() {
    ctx.globalAlpha = 1.0; // Ensure full opacity
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "40px Arial";
    ctx.fillText("Victory!", canvas.width / 2 - 80, canvas.height / 2 - 20);
    ctx.font = "20px Arial";
    score = Math.floor(((coinCounter / elapsedTime) * 1000000));
    ctx.fillText("your score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 20);
    return score;
}

function startGame() {
    console.log("Game started");
    startTime = Date.now();
    gameEnded = false;
}

function loop() {
    console.log("Game loop running");
    if (gameEnded) {
        elapsedTime = ((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
        renderVictoryMessage();
        return; // Stop the game loop
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity if the player is in the air
    if (player.y + player.height < canvasHeight) {
        player.y_v += gravity;
        player.jump = true;
    }

    // Handle horizontal movement
    if (keys.left) {
        player.x_v = -2.5;
    } else if (keys.right) {
        player.x_v = 2.5;
    } else {
        player.x_v = 0;
    }

    // Update player position
    player.x += player.x_v;
    player.y += player.y_v;

    // Check for collisions with platforms
    for (let i = 0; i < platforms.length; i++) {
        if ((player.y + player.height > platforms[i].y && player.y + player.height <= platforms[i].y + platforms[i].height) &&
            (player.x + player.width > platforms[i].x && player.x < platforms[i].x + platforms[i].width)) {
            player.jump = false;
            player.y = platforms[i].y - player.height; // Adjust player position to be on top of the platform
            player.y_v = 0;
        }
    }

    // Ensure the player stays within the canvas bounds
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvasWidth) {
        player.x = canvasWidth - player.width;
    }
    if (player.y + player.height > canvasHeight) {
        player.y = playerStartY;
        player.x = playerStartX;
        player.x_v = 0;
        player.y_v = 0;
        player.jump = false;
        if (coinCounter > 0) {
            coinCounter--;
        }
    }

    // Check for collisions with coins
    for (let i = 0; i < coins.length; i++) {
        if (player.x < coins[i].x + coins[i].width &&
            player.x + player.width > coins[i].x &&
            player.y < coins[i].y + coins[i].height &&
            player.y + player.height > coins[i].y) {
            // Collision detected, remove the coin and increment the counter
            coins.splice(i, 1);
            coinCounter++;
            break; // Exit the loop to avoid skipping coins
        }
    }

    // Check if all coins are collected
    if (coins.length === 0) {
        gameEnded = true;
    }

    // Render the player, platforms, coins, and coin counter
    rendercanvas();
    renderplat();
    rendercoins();
    renderplayer();
    renderCoinCounter();

    requestAnimationFrame(loop);
}




 // LOGIN SECTION

 //login button starting the game
 function startButton(event) {
    event.preventDefault(); // preventing form element to cause unexpected behaviour by preventing event default behaviour
    console.log("Start button clicked");   

    // username and password requirements
    loginError = document.getElementById("loginError");
    if (document.getElementById("username").value === "") {
        loginError.innerHTML = "Please enter your username";
        return;
    }

    if (document.getElementById("password").value === "") {
        loginError.innerHTML = "Please enter your password";
        return;
    }



    //hide login and show game canvas
    document.getElementById("login").style.display = "none";
    const canvasElement = document.getElementById("canvas");
    if (canvasElement) {
        canvasElement.style.display = "block";
        console.log("Canvas displayed");
    } else {
        console.error("Canvas element not found");
    }
    //initialize game
    createplat();
    createcoins();
    // start game
    startGame();
    loop();
 }

 document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton").addEventListener("click", startButton);
});

 


// LEADERBOARD SECTION

