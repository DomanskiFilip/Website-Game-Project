// GAME LOOP MODULE
import { rendercanvas, renderplat, rendercoins, renderplayer, renderCoinCounter, renderVictoryMessage } from './render.js';
import { player, platforms, coins, ctx, canvasHeight, canvasWidth, playerStartX, playerStartY } from './definitions&centering.js';
import { keys, gravity,  } from './movement.js';

// Flag to check if the game has ended
let gameEnded = false; 

// coin counter to keep track of coins collected
let coinCounter = 0;

// Variable to store the elapsed time
let elapsedTime = 0;

// Function to start the game loop
function startGame() {
    let startTime = Date.now();
    gameEnded = false;
    loop(startTime);
}

// Game loop function
function loop(startTime) {
    if (gameEnded) {
        elapsedTime = ((Date.now() - startTime) / 100000000); // Calculate elapsed time in seconds normally it schould be 1000 but on live server Data.now() outputs insane numbers so I had to divide it by 10000000
        renderVictoryMessage();
        return elapsedTime;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply gravity if the player is in the air
    if (player.y + player.height < canvasHeight) {
        player.y_v += gravity;
        player.jump = true;
        
        // Cap the maximum y_v at 15
        if (player.y_v > 15) {
            player.y_v = 15;
        }
    }

    // Handle movement useing keys
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

    // Collision detected, remove the coin and increment the counter
    for (let i = 0; i < coins.length; i++) {
        if (player.x < coins[i].x + coins[i].width &&
            player.x + player.width > coins[i].x &&
            player.y < coins[i].y + coins[i].height &&
            player.y + player.height > coins[i].y) {
            coinCounter++;
           
            coins.splice(i, 1);
            
            break; // Exit the loop to avoid skipping coins
        }
    }

    // Check if all coins are collected if yes game ends
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

export { startGame, gameEnded, coinCounter, elapsedTime };