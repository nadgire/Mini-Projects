const btnPrev = document.querySelector("input[value=Previous]");
const btnNext = document.querySelector("input[value=Next]");
const btnSubmit = document.querySelector("input[value=Submit]");
const totalSteps = document.querySelectorAll(".totalSteps");
const progressBar = document.getElementById("progressBar");
console.log(progressBar);
console.log(totalSteps);
let step = 0;
let progressWidth = 0;

btnNext.addEventListener("click", function () {
    if (step >= 0) {
        step++;
        updateProgressBar();
        setTimeout(btnColorToggle, 200);
        btnEnable(btnPrev);
    }
    if (step == totalSteps.length - 1) {
        submitButtonToggle();
    }
})

function btnEnable(btn) {
    btn.style.borderColor = "#60a5fa";
    btn.style.color = "black";
    btn.disabled = false;
}

function btnDisable(btn) {
    btn.style.borderColor = "#9ca3af";
    btn.style.color = "#9ca3af";
    btn.disabled = true;
}

btnPrev.addEventListener("click", function () {
    if (step <= totalSteps.length - 1) {
        btnColorToggle();
        if (step == totalSteps.length-1) {
            submitButtonToggle();
        }
        step--;
        updateProgressBar();
        btnEnable(btnNext);
        
    }
    if (step == 0) {
        btnDisable(btnPrev);
    }
})

function btnColorToggle() {
    if (step != 0) {
        totalSteps[step].classList.toggle("bg-slate-200");
        totalSteps[step].classList.toggle("bg-blue-400");
    }
}

function updateProgressBar() {
    progressBar.style.width = 100 / (totalSteps.length - 1) * step + "%";
}

function submitButtonToggle() {
    btnNext.classList.toggle("hidden");
    btnSubmit.classList.toggle("hidden");
}