let user = {
    name: '',
    password: '',
    phone: '',
    birthday: '',
    topScore: 0,
}

function register() {
    user.name = document.getElementById('username').value;
    user.password = document.getElementById('password').value;
    user.phone = document.getElementById('phone').value;
    user.birthday = document.getElementById('birthDate').value;
    console.log(user);
    localStorage.setItem(user.name, JSON.stringify(user));
}


function registerButton(event) {
    event.preventDefault(); // preventing form element to cause unexpected behaviour by preventing event default behaviour
    let registerFeedback = document.getElementById("registerFeedback");
    if (document.getElementById("username").value === "") {
        registerFeedback.innerHTML = "Please enter your username";
        return;
    }

    if (document.getElementById("password").value === "") {
        registerFeedback.innerHTML = "Please enter your password";
        return;
    }
    if (document.getElementById("phone").value === "") {
        registerFeedback.innerHTML = "Please enter your phone number";
        return;
    }
    if (document.getElementById("birthDate").value === "") {
        registerFeedback.innerHTML = "Please enter your brith date";
        return;
    }
    if (localStorage.getItem(document.getElementById("username").value) !== null) {
        registerFeedback.innerHTML = "Username already exists";
        return;
    }
    register();
    registerFeedback.innerHTML = "Registered successfully!";
    document.getElementById('username').innerHTML = '';
    document.getElementById('password').innerHTML = '';
    document.getElementById('phone').innerHTML = '';
    document.getElementById('birthDate').innerHTML = '';
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerButton").addEventListener("click", registerButton);
});