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

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y,this.width, this.height);
    }
}

// array to store platforms
let platforms = [];

// Define platform positions
const predefinedPlatforms = [
    { x: 600, y: 200 },
];

// Function to generate random positions
function getRandomPosition(minX, maxX, minY, maxY) {
    return {
        x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
        y: Math.floor(Math.random() * (maxY - minY + 1)) + minY
    };
}

// Generate random positions for the rest of the platforms
const numberOfPlatforms = 8; // Total number of platforms excluding the first one
const minPlatPosX = 500, maxPlatPosX = 1500; // Define the range for x coordinates
const minPlatPosY = 100, maxPlatPosY = 500; // Define the range for y coordinates

for (let i = 0; i < numberOfPlatforms; i++) {
    predefinedPlatforms.push(getRandomPosition(minPlatPosX, maxPlatPosX, minPlatPosY, maxPlatPosY));
}


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

// Minimum distance between platforms
const MIN_PLATFORM_DISTANCE = 50;
const MAX_PLATFORM_DISTANCE = 100;

// Function to create platforms with predefined positions
function createplat() {
   for (let i = 0; i < predefinedPlatforms.length; i++) {
        let newX = predefinedPlatforms[i].x - minX + offsetX;
        let newY = predefinedPlatforms[i].y - minY + offsetY;
        let tooClose = platforms.some(platform => {
            let dx = platform.x - newX;
            let dy = platform.y - newY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance < MIN_PLATFORM_DISTANCE || distance > MAX_PLATFORM_DISTANCE;
        });
        if (!tooClose) {
            platforms.push(new Platform(newX, newY, 125, 15));
        }
        }
}

// Function to create coins with predefined positions
function createcoins() {
    for (let i = 0; i < predefinedPlatforms.length; i++) {
        coins.push(new Coins(predefinedPlatforms[i].x - minX + offsetX + 62.5, predefinedPlatforms[i].y - minY + offsetY - 30, 20, 15));
    }
}

// coin counter to keep track of coins collected
let coinCounter = 0;

