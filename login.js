 // LOGIN MODULE
 // login button starting the game
 function startButton(event) {
    event.preventDefault(); // preventing form element to cause unexpected behaviour by preventing event default behaviour

    // username and password requirements
    let loginError = document.getElementById("loginError");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username === "") {
        loginError.innerHTML = "Please enter your username";
        return;
    }else if (localStorage.getItem(username) === null) {
        loginError.innerHTML = "Username not found";
        return;
    }else {
        storedUser = JSON.parse(localStorage.getItem(username));
        if (password === "") {
            loginError.innerHTML = "Please enter your password";
            return;
        } else if (storedUser.password !== password) {
            loginError.innerHTML = "Incorrect password";
            return;
        } else {
            // hide login and show game canvas
            document.getElementById("login").style.display = "none";
            const canvasElement = document.getElementById("canvas");
            if (canvasElement) {
                canvasElement.style.display = "block";
            } else {
                console.error("Canvas element not found");
            }
            // initialize game
            createplat();
            createcoins();
            // start game
            startGame();
        }
    }
}

 document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton").addEventListener("click", startButton);
});
