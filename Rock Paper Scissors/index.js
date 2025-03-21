const rps = ["rock.png", "paper.png", "scissors.png"];
const rpsInt = [0, 1, 2];
const footerImages = document.querySelectorAll(".footerImages");
const youImage = document.getElementById("youImage");
const compImage = document.getElementById("compImage");
const divResult = document.getElementById("divResult");
const compSore = document.getElementById("compScore");
const youSore = document.getElementById("youScore");
const btn = document.querySelector("input[type=button]");
const start = document.querySelector("#start");

var yoursWinCount = 0;
var compsWinCount = 0;
var userSelection = 0;
var compSelection = 0;
var drawCount = 0;

footerImages.forEach(element => {
    element.addEventListener("click", funPlay);
});
btn.addEventListener("click", reset);

function funPlay(event) {
    start.classList.add("hidden");
    setUserImage();
    setCompUser();
    calcResult();
}

function setUserImage() {
    userSelection = rps.indexOf(event.target.getAttribute("src"));
    youImage.firstElementChild.classList.remove("hidden");
    youSore.classList.remove("hidden");
    youImage.firstElementChild.setAttribute("src", event.target.getAttribute("src"));
}

function setCompUser() {
    // var randomImage = ;
    compSelection = Math.floor(Math.random() * 3);
    compImage.firstElementChild.classList.remove("hidden");
    compSore.classList.remove("hidden");
    compImage.firstElementChild.setAttribute("src", rps[compSelection]);
}

function calcResult() {
    
    if ((userSelection == 0 && compSelection == 0) || 
        (userSelection == 1 && compSelection == 1) || 
        (userSelection == 2 && compSelection == 2)) {

        drawCount++;
        console.log(userSelection, compSelection)
    }
    else {
        if ((userSelection == 0 && compSelection == 1) || 
            (userSelection == 1 && compSelection == 2) || 
            (userSelection == 2 && compSelection == 0)) {

            compsWinCount++;
        }
        if ((userSelection == 0 && compSelection == 2) || 
            (userSelection == 1 && compSelection == 0) || 
            (userSelection == 2 && compSelection == 1)) {

            yoursWinCount++;
        }
    }
    showResult();
}

function showResult() {
    youSore.innerHTML = "<b>Your Score : " + yoursWinCount+"</b>";
    compSore.innerHTML = "<b>BOT Score : " + compsWinCount+"</b>";
    if(yoursWinCount==10){
        alert("Congratulations! You win the game.");
        reset();
    }
    if(compsWinCount==10){
        alert("Bad luck! BOT win the game.");
        reset();
    }
}

function reset(){
    location.reload();
}
