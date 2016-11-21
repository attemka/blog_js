console.log("working");
var email = document.getElementById("nickInput");
var pass = document.getElementById("passInput");
var btn = document.getElementById("submit");
var emailErr = document.getElementById("nickError");
var passErr = document.getElementById("passError");

btn.onclick = function () {
    var flag = true;
    emailErr.innerHTML = "";
    passErr.innerHTML ="";
    if (email.value == ""){
        emailErr.innerHTML = "Enter Nickname";
        flag = false;
    }

    if (pass.value == ""){
        passErr.innerHTML = "Enter password";
        flag = false;
    }
    console.log(flag);
    if (flag == false) return false; // todo: popup
};

