console.log("rabotaet");
var email = document.getElementById("emailInput");
var emailErr = document.getElementById("emailError");
var nick = document.getElementById("nickInput");
var nickErr = document.getElementById("nickError");
var pass = document.getElementById("passInput");
var passErr = document.getElementById("passError");

var btn =  document.getElementById("submit");
btn.onclick= function () {
    var flag = true;
    if (email.value == ""){
        emailErr.innerHTML= "lox";
        flag = false;
    }

    if (nick.value == ""){
        nickErr.innerHTML= "lox";
        flag = false;
    }

    if (pass.value == ""){
        passErr.innerHTML= "lox";
        flag = false;
    }
    console.log("eblan");
if (flag == false) return false;
};