const txtInput = document.querySelector("input[type=text]");
const btns = document.querySelectorAll("input[type=button]");
var expressionToEvaluate;
var isMinus = false;

btns.forEach(element => {
    element.addEventListener("click", funcBtnOps);
});

function funcBtnOps(event) {
    if (event.target.value == "AC") {
        txtInput.value = "";
        txtInput.readOnly = false;
        txtInput.style.backgroundColor = "white";
        isMinus = false;
        txtInput.style.color = "black";
    }
    else if (event.target.value == "=") {
        evaluate = txtInput.value;
        expressionToEvaluate = "";
        for (let i = 0; i < evaluate.length; i++) {
            if (evaluate[i] == "÷") {
                expressionToEvaluate += "/"
            }
            else {
                expressionToEvaluate += evaluate[i];
            }
        }
        txtInput.value += "=" + eval(expressionToEvaluate);
        txtInput.readOnly = true;
        txtInput.style.backgroundColor = "gray";
        txtInput.style.color = "white";
    }
    else if (event.target.value == "+/-") {
        if (isMinus == false) {
            txtInput.value += "(-";
            isMinus = true;
        }
        else {
            txtInput.value += ")";
            isMinus = false;
        }
    }
    else if (event.target.value == "x") {
        txtInput.value += "*";
    }
    else {
        txtInput.value += event.target.value;
    }
}