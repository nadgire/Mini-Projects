var txtPassword = document.querySelector("input[type=text]");
txtPassword.disabled = true;
var btnCopy = document.querySelector(".fa-copy");
var btnGenerate = document.querySelector("input[type=button]");
var txtLength = document.querySelector("input[type=number");
var checkSetting = document.querySelectorAll("input[type=checkbox]");

// var upperCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// var lowerCharSet = 'abcdefghijklmnopqrstuvwxyz';
// var numberCharSet = '0123456789';
// var spCharSet = '!@#$%^&*()-_=+[{]}<>./?';

var password = "";

var allCharSet = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', '!@#$%^&*()-_=+[{]}<>./?'];

// sp char length 23

btnCopy.addEventListener("click", function () {
    if(txtPassword.value==""){
        alert("Please generate password!");
    }
    else{
        navigator.clipboard.writeText(txtPassword.value);
        alert("Copied!");
    }
})


btnGenerate.addEventListener("click", function () {
    password = "";
    var passLength = parseInt(txtLength.value);
    var charSet = [];

    for (let i = 0; i < checkSetting.length; i++) {
        if (checkSetting[i].checked == true) {
            charSet.push(allCharSet[i]);
        }
    }

    if (charSet.length == 0) {
        alert("Please select atleast 1 checkbox");
    }
    else {
        for (let i = 0; i < passLength; i++) {
            // const randomCharSet = Math.floor(Math.random() * charSet.length);
            const str = charSet[Math.floor(Math.random() * charSet.length)];
            // console.log(str);
            // const strIndex = Math.floor(Math.random() * str.length);
            password += str[Math.floor(Math.random() * str.length)];
        }
    }

    txtPassword.value = password;
})



