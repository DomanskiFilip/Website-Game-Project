// RENDER MODULE
// animations

// Load images
const PlayerStanding = new Image();
PlayerStanding.src = 'img/standing.png';

const playerRight = new Image();
playerRight.src = 'img/right.png';

const playerLeft = new Image();
playerLeft.src = 'img/left.png';

const playerJumpUp = new Image();
playerJumpUp.src = 'img/jumpingUp.png';

const CoinImg = new Image();
CoinImg.src = 'img/coin.png';

const canvasImg = new Image();
canvasImg.src = 'img/canvas.jpg';


// Function to render the canvas
function rendercanvas() {
    ctx.drawImage(canvasImg, 0, 0, canvasWidth, canvasHeight);
}

// Function to render the player
function renderplayer() {
    if (keys.left) {
        ctx.drawImage(playerLeft, player.x, player.y, player.width, player.height);
    } else if (keys.right) {
        ctx.drawImage(playerRight, player.x, player.y, player.width, player.height);
    } else if (keys.up) {
        ctx.drawImage(playerJumpUp, player.x, player.y, player.width, player.height);
    } else {
        ctx.drawImage(PlayerStanding, player.x, player.y, player.width, player.height);
    }
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
        ctx.drawImage(CoinImg, coins[i].x, coins[i].y, coins[i].width, coins[i].height);
    }
}

// Function to render the coin counter
function renderCoinCounter() {
    ctx.fillStyle = "rgba(70, 66, 66, 0.3)";
    ctx.font = "1000px Arial";
    const text = coinCounter.toString();
    const textWidth = ctx.measureText(text).width; 
    ctx.fillText(text, (canvasWidth / 2) - (textWidth / 2), 800); // Centered vertically
}

