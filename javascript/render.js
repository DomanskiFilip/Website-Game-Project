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
    ctx.fillText(text, (canvasWidth / 2) - (textWidth / 2), 750); // Centered vertically
}

// Display a victory message with the player's score
function renderVictoryMessage() {
    ctx.globalAlpha = 1.0;
    ctx.font = "40px Arial";
 
     // Draw the shadow
     ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
     ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 100, 400, 240);

    // Display the victory message
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillText("Victory!", canvas.width / 2 - 80, canvas.height / 2 - 20);

    // reset font
    ctx.font = "20px Arial";

    // Calculate the score based on the number of coins collected and the elapsed time
    score = Math.floor(((coinCounter / elapsedTime) * 1000000));

    ctx.fillText("your score: " + score, canvas.width / 2 - 100, canvas.height / 2 + 20);
    let storedUser = JSON.parse(localStorage.getItem(username.value)); // Retrieve the user object from local storage
    // Update the user's top score if the current score is higher
    if(score > storedUser.topScore){
        storedUser.topScore = score;
        localStorage.setItem(storedUser.name, JSON.stringify(storedUser));
        ctx.fillText("New high score!", canvas.width / 2 - 90, canvas.height / 2 + 60);
        console.log("New high score set:", storedUser.topScore);
    }
}

