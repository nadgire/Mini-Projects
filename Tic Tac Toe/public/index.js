var newGameSection = document.getElementById("newGameSection");
var gameSection = document.getElementById("gameSection");
var playerTurnAnimation = document.getElementById("playerTurnAnimation");
var winnerText = document.getElementsByTagName("h2");

var btnBoxes;
var winner = "";

playerXTurn = true;

function btnOperation(btn) {
    var btnID = btn.id;
    if (btnID == "btnNewGame") {
        
        newGameSection.classList.add("hidden");
        gameSection.classList.remove("hidden");
        if (btnBoxes == null) {
            btnBoxes = document.querySelectorAll('#boxes input[type="button"]');
            console.log(btnBoxes);
        }
        console.log("hi");
        enableAllBoxes();    
    }

    if (btnID == "btnReset") {
        btnBoxes.forEach(btnBox => {
            btnBox.disabled = false;
            btnBox.value = "";
            playerTurnAnimation.innerHTML = "player 'X' turn"
            playerXTurn = true;
            newGameSection.classList.remove("hidden");
            gameSection.classList.add("hidden");
        });
    }
}

function boxClick(btnBox) {
    if (playerXTurn) {
        btnBox.value = "X";
        btnBox.disabled = true;
        checkWinner();
        playerXTurn = false;
        playerTurnAnimation.innerHTML = "player 'O' turn";
    }
    else {
        btnBox.value = "O";
        btnBox.disabled = true;
        checkWinner();
        playerXTurn = true;
        playerTurnAnimation.innerHTML = "player 'X' turn";
    }
}

function checkWinner() {
    if ((btnBoxes[0].value == 'X' && btnBoxes[1].value == 'X' && btnBoxes[2].value == 'X') ||
        (btnBoxes[0].value == 'O' && btnBoxes[1].value == 'O' && btnBoxes[2].value == 'O') ||
        (btnBoxes[3].value == 'X' && btnBoxes[4].value == 'X' && btnBoxes[5].value == 'X') ||
        (btnBoxes[3].value == 'O' && btnBoxes[4].value == 'O' && btnBoxes[5].value == 'O') ||
        (btnBoxes[6].value == 'X' && btnBoxes[7].value == 'X' && btnBoxes[8].value == 'X') ||
        (btnBoxes[6].value == 'O' && btnBoxes[7].value == 'O' && btnBoxes[8].value == 'O') ||

        (btnBoxes[0].value == 'X' && btnBoxes[3].value == 'X' && btnBoxes[6].value == 'X') ||
        (btnBoxes[0].value == 'O' && btnBoxes[3].value == 'O' && btnBoxes[6].value == 'O') ||
        (btnBoxes[1].value == 'X' && btnBoxes[4].value == 'X' && btnBoxes[7].value == 'X') ||
        (btnBoxes[1].value == 'O' && btnBoxes[4].value == 'O' && btnBoxes[7].value == 'O') ||
        (btnBoxes[2].value == 'X' && btnBoxes[5].value == 'X' && btnBoxes[8].value == 'X') ||
        (btnBoxes[2].value == 'O' && btnBoxes[5].value == 'O' && btnBoxes[8].value == 'O') ||

        (btnBoxes[0].value == 'X' && btnBoxes[4].value == 'X' && btnBoxes[8].value == 'X') ||
        (btnBoxes[0].value == 'O' && btnBoxes[4].value == 'O' && btnBoxes[8].value == 'O') ||
        (btnBoxes[2].value == 'X' && btnBoxes[4].value == 'X' && btnBoxes[6].value == 'X') ||
        (btnBoxes[2].value == 'O' && btnBoxes[4].value == 'O' && btnBoxes[6].value == 'O')) {

        disableAllBoxes();
        callWinner();
    }
}

function disableAllBoxes() {
    btnBoxes.forEach(btnBox => {
        btnBox.disabled = true;
    });
}

function enableAllBoxes(){
    console.log("hi");
    btnBoxes.forEach(btnBox => {
        console.log(btnBox);
        btnBox.disabled = false;
        btnBox.value = "";
        playerTurnAnimation.innerHTML = "player 'X' turn"
        playerXTurn = true;
    });
}

function callWinner() {
    var winner;
    if (playerXTurn == true) {
        winner = "Player 'X' won the last round!";
    }
    else {
        winner = "Player 'O' won the last round!";
    }
    setTimeout(function() {
        alert(winner);
        gameSection.classList.add("hidden");
    newGameSection.classList.remove("hidden");
    }, 50);
    

    console.log(winner);
    console.log(winnerText);
    
}