// RENDER MODULE
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
    ctx.fillText(text, (canvasWidth / 2) - (textWidth / 2), 800); // Centered vertically
}

