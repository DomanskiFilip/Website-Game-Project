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
    if (document.getElementById("password").value.length < 8) {
        registerFeedback.innerHTML = "Password must be at least 8 characters long";
        return;
    }
    //password validation using regex
    if (!/[a-z]/.test(document.getElementById("password").value) || !/[A-Z]/.test(document.getElementById("password").value) || !/[0-9]/.test(document.getElementById("password").value)) { //password validation using regex
        registerFeedback.innerHTML = "Password must contain at least one number, one letter and one uppercase letter";
        return;
    }
    if (document.getElementById("phone").value === "") {
        registerFeedback.innerHTML = "Please enter your phone number";
        return;
    }
    // phone number validation useing regex
    if (!/^\d{10}$/.test(document.getElementById("phone").value)) { 
        registerFeedback.innerHTML = "Please enter a valid phone number in correct format";
        return;
    }
    // birth date validation the date must be at least 3 years in the past
    let birthDate = document.getElementById("birthDate").value;
    if (birthDate === "") {
        registerFeedback.innerHTML = "Please enter your birth date";
        return;
    }
    let birthDateObj = new Date(birthDate);
    let currentDate = new Date();
    let threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);
    if (birthDateObj > threeYearsAgo) {
        registerFeedback.innerHTML = "you must be at least 3 to register!";
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

