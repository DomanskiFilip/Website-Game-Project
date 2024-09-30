// GAME LOOP MODULE
// Variable to store the player's score
let score = 0; 

// Flag to check if the game has ended
let gameEnded = false; 

// Display a victory message with the player's score
function renderVictoryMessage() {
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "40px Arial";
    ctx.fillText("Victory!", canvas.width / 2 - 80, canvas.height / 2 - 20);
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

// Function to start the game loop
function startGame() {
    startTime = Date.now();
    gameEnded = false;
    loop();
}

// Game loop function
function loop() {
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