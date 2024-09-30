// DECLARATIONS MODULE
// Attributes of the player
let player = {
    x: 0,
    y: 0,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: 20,
    width: 20
};

// class for platforms
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#138b1f";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y,this.width, this.height);
    }
}

// array to store platforms
let platforms = [];

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

//class for coins
class Coins {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#ced11c";
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y,this.width, this.height);
    }
}

// array to store coins
let coins = [];

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

// canvas and context (ctx) declarations
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//canvas size initially set to screen resolution - the nav bar height
let navHeight = document.getElementsByTagName("nav")[0].clientHeight;
let canvasHeight = window.innerHeight - navHeight;
let canvasWidth = window.innerWidth;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

// Calculate the center of the canvas
const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;

// Calculate the total width of the platforms group
const minX = Math.min(...predefinedPlatforms.map(p => p.x));
const maxX = Math.max(...predefinedPlatforms.map(p => p.x)) + 150;
const totalPlatformGroupWidth = maxX - minX;

// Calculate the total height of the platforms group
const minY = Math.min(...predefinedPlatforms.map(p => p.y));
const maxY = Math.max(...predefinedPlatforms.map(p => p.y)) + 150;
const totalPlatformGroupHeight = maxY - minY;

// Calculate the center of the platforms group
const platformsCenterX = minX + totalPlatformGroupWidth / 2;
const platformsCenterY = minY + totalPlatformGroupHeight / 2;

// Re-center the player based on the platforms group center and canvas center
player.x = centerX - (platformsCenterX - minX -95); // -95 is to adjust the player position
player.y = centerY - (platformsCenterY - minY);

// Define player starting position
const playerStartX = player.x;
const playerStartY = player.y;

// Calculate the starting x, y positions for the first platform to center the group
const offsetX = centerX - (totalPlatformGroupWidth / 2);
const offsetY = centerY - (totalPlatformGroupHeight / 2);

// Function to create platforms with predefined positions
function createplat() {
    console.log("Platforms created");
   for (let i = 0; i < predefinedPlatforms.length; i++) {
        platforms.push(new Platform(predefinedPlatforms[i].x - minX + offsetX, predefinedPlatforms[i].y - minY + offsetY, 125, 15));
    }
}

// Function to create coins with predefined positions
function createcoins() {
    console.log("Coins created");
    for (let i = 0; i < predefinedCoins.length; i++) {
        coins.push(new Coins(predefinedCoins[i].x - minX + offsetX, predefinedCoins[i].y - minY + offsetY, 10, 10));
    }
}

// coin counter to keep track of coins collected
let coinCounter = 0;
