// DECLARATIONS MODULE
// Attributes of the player
let player = {
    x: 0,
    y: 0,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: 50,
    width: 50,
    color: "#F08080"
};

// class for platforms
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#895608ff";
    }
    // function to create platform
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y,this.width, this.height);
    }
}

// array to store platforms
let platforms = [];

// Define platform positions
const predefinedPlatforms = [
    { x: 600, y: 250 },
    { x: 400, y: 350 },
    { x: 200, y: 300 },
    { x: 600, y: 500 },
    { x: 350, y: 550 },
    { x: 200, y: 700 },
    { x: 500, y: 700 },
    { x: 100, y: 500 },
    { x: 10, y: 400 }
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
    // function to create coin
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y,this.width, this.height);
    }
}

// array to store coins
let coins = [];

// canvas and context (ctx) declarations
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//canvas size initially set to screen resolution - the nav bar height
let navHeight = document.getElementsByTagName("nav")[0].clientHeight;
let footerHeight = document.getElementsByTagName("footer")[0].clientHeight;
let canvasHeight = window.innerHeight - navHeight - footerHeight;
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
    for (let i = 0; i < predefinedPlatforms.length; i++) {
        platforms.push(new Platform(predefinedPlatforms[i].x - minX + offsetX, predefinedPlatforms[i].y - minY + offsetY, 150, 20));
    }
}

// Function to create coins with predefined positions
function createcoins() {
    for (let i = 0; i < predefinedPlatforms.length; i++) {
        coins.push(new Coins(predefinedPlatforms[i].x - minX + offsetX + 62.5, predefinedPlatforms[i].y - minY + offsetY - 30, 20, 15));
    }
}

export { player, platforms, coins, createcoins, createplat, ctx, canvasHeight, canvasWidth, playerStartX, playerStartY };