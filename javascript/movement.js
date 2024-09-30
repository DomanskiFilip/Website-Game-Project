// MOVEMENT MODULE
// declare movment keys
let keys = {
    right: false,
    left: false,
    up: false,
    };

// gravity 
let gravity = 0.6;

// Event listeners for keydown and keyup events
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

// Function to handle keydown events
function keydown(e) {
    if (e.keyCode == 37) {
        keys.left = true;
    }
    if (e.keyCode == 39) {
        keys.right = true;

        ctx.drawImage(playerLeft, player.x, player.y, player.width, player.height);
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

