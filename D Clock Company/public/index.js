const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const digitalHH = document.getElementById("digitalHH");
const digitalMM = document.getElementById("digitalMM");
const digitalSeconds = document.getElementById("digitalSeconds");
const digitalAMPM = document.getElementById("digitalAMPM");
const digitalDay = document.getElementById("digitalDay");
const digitalMon = document.getElementById("digitalMon");
const digitalDate = document.getElementById("digitalDate");
const btns = document.querySelectorAll("input[type=button");
const XII = document.getElementById("XII");
const III = document.getElementById("III");
const VI = document.getElementById("VI");
const IX = document.getElementById("IX");
const alarmDiv = document.getElementById("alarmDiv");
const timerDiv = document.getElementById("timerDiv")
const txtBoxes = document.querySelectorAll("input[type=number]");
const digitalClock = document.getElementById("digitalClock");
const clockSection = document.querySelector("clockSection");


const arrDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const arrMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var width=0;

var isDarkMode = true;
var currentDate = new Date();
var currentAMPM = "";
var alarmHH = 0, alarmMM = 0, timerSS = 0;;
var currentHH12 = 0, currentHH24 = 0, currentMM = 0, alarmAMPM = "";
let alarmInterval, timerInterval;

function activateDarkMode(btnDarkMode) {

    const bodyTag = document.querySelector("body");
    if (isDarkMode) {
        bodyTag.classList.add("darkMode");

        hourHand.classList.toggle("bg-black");
        hourHand.classList.toggle("bg-white");
        minuteHand.classList.toggle("bg-black");
        minuteHand.classList.toggle("bg-white");

        btnDarkMode.classList.toggle("border-black");
        btnDarkMode.classList.toggle("border-white");
        btnDarkMode.classList.toggle("bg-white");
        btnDarkMode.classList.toggle("text-black");
        btnDarkMode.classList.toggle("bg-black");
        btnDarkMode.classList.toggle("text-white");
        btnDarkMode.classList.toggle("hover:text-black");
        btnDarkMode.classList.toggle("hover:text-white");

        btnDarkMode.value = "Light Mode";
        
        if(alarmAMPM=="AM" ){
            btns[1].style.color="white";
        }

        if(alarmAMPM=="PM" ){
            btns[2].style.color="white";
        }

        txtBoxes.forEach(element => {
            element.classList.add("text-black");
        });

        XII.innerHTML = "XII";
        III.innerHTML = "III";
        VI.innerHTML = "VI";
        IX.innerHTML = "IX";

        timerDiv.style.borderColor = "white";
        alarmDiv.style.borderColor = "white";

        isDarkMode = false;
    }
    else {

        bodyTag.classList.remove("darkMode");

        hourHand.classList.toggle("bg-black");
        hourHand.classList.toggle("bg-white");
        minuteHand.classList.toggle("bg-black");
        minuteHand.classList.toggle("bg-white");

        btnDarkMode.classList.toggle("border-black");
        btnDarkMode.classList.toggle("border-white");
        btnDarkMode.classList.toggle("bg-white");
        btnDarkMode.classList.toggle("text-black");
        btnDarkMode.classList.toggle("bg-black");
        btnDarkMode.classList.toggle("text-white");
        btnDarkMode.classList.toggle("hover:text-black");
        btnDarkMode.classList.toggle("hover:text-white");

        btnDarkMode.value = "Dark Mode";

        if(alarmAMPM=="AM" ){
            btns[1].style.color="black";
        }

        if(alarmAMPM=="PM" ){
            btns[2].style.color="black";
        }

        txtBoxes.forEach(element => {
            element.classList.remove("text-black");
        });

        XII.innerHTML = "12";
        III.innerHTML = "3";
        VI.innerHTML = "6";
        IX.innerHTML = "9";

        // timerDiv.style.borderColor = "black";
        // alarmDiv.style.borderColor = "black";

        isDarkMode = true;

    }
}

function setTime() {

    currentDate = new Date();
    currentHH24 = currentDate.getHours();
    if (currentHH24 == 0) {
        currentHH12 = 12;
    }
    else {
        currentHH12 = currentHH24 >= 13 ? currentHH24 % 12 : currentHH24;
    }

    currentMM = currentDate.getMinutes();
    var currentSS = currentDate.getSeconds();
    var currentDD = currentDate.getDate();
    var currentMon = currentDate.getMonth();
    // var currentYYYY = currentDate.getFullYear();
    // console.log(currentHH12)
    var currentDay = currentDate.getDay();
    currentAMPM = currentHH24 >= 12 ? 'PM' : 'AM';

    // console.log(currentHH12);

    if (currentHH12 < 10) {
        currentHH12 = "0" + currentHH12;
    }

    if (currentMM < 10) {
        currentMM = "0" + currentMM;
    }

    if (currentSS < 10) {
        currentSS = "0" + currentSS;
    }

    // secondHand.style.rotate = `${currentSS*6}deg`;
    // minuteHand.style.rotate = `${currentMM*6}deg`;
    // hourHand.style.rotate = `${(currentHH12*30)+(currentMM*0.5)}deg`

    secondHand.style.transform = `translate(-50%, -100%) rotate(${(currentSS * 6)}deg)`
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${(currentMM * 6) + (currentSS * (1 / 10))}deg)`
    hourHand.style.transform = `translate(-50%, -100%) rotate(${(currentHH12 * 30) + (currentMM * 0.5)}deg)`


    // console.log(Math.abs(currentSS));

    digitalHH.innerHTML = currentHH12;
    digitalMM.innerHTML = currentMM;
    digitalSeconds.innerHTML = currentSS;
    digitalAMPM.innerHTML = currentAMPM;

    digitalDay.innerHTML = arrDay[currentDay] + ",";
    digitalMon.innerHTML = arrMonth[currentMon];
    digitalDate.innerHTML = currentDD;
}

btns.forEach(element => {
    element.addEventListener("click", funOperation);
});

txtBoxes.forEach(element=>{
    console.log(txtBoxes);
    element.style.borderColor="black";
    element.addEventListener("mouseover", function(){
        console.log(element+"focused");
        element.style.borderColor="darkred";
        element.style.borderWidth="2px";
    })
    element.addEventListener("mouseout", function(){
        console.log(element+"focused");
        element.style.borderColor="black";
        element.style.borderWidth="1px";
    })
});

function funOperation(event) {
    if (event.target.value == 'Dark Mode' || event.target.value == "Light Mode") {
        activateDarkMode(this);
    }

    if (event.target.value == "Cancel") {
        if (event.target.parentElement.id == "alarm") {
            console.log("Calling");
            cancelAlarm();
        }
        if (event.target.parentElement.id == "timer") {
            cancelTimer();
        }
    }

    if (event.target.value == "Save") {
        collectAlarmData();
    }

    if (event.target.value == "AM") {

        alarmAMPM = "AM";
        event.target.style.fontWeight = "bold";
        if(isDarkMode == false){
            event.target.style.color = "white";
        }
        else{
            event.target.style.color = "black";
        }
        // event.target.style.fontSize = "22px";
        event.target.parentElement.lastElementChild.style.fontWeight = "normal";
        event.target.parentElement.lastElementChild.style.color = "gray";
        // event.target.parentElement.lastElementChild.style.fontSize = "18px";

    }
    if (event.target.value == "PM") {
        alarmAMPM = "PM";
        event.target.style.fontWeight = "bold";
        if(isDarkMode == false){
            event.target.style.color = "white";
            event.target.style.hover = "color=red";
        }
        else{
            event.target.style.color = "black";
        }
        // event.target.style.fontSize = "22px";
        event.target.parentElement.firstElementChild.style.fontWeight = "normal";
        event.target.parentElement.firstElementChild.style.color = "gray";
        // event.target.parentElement.firstElementChild.style.fontSize = "18px";
    }

    if (event.target.value == "Start") {
        collectTimerData();
    }
}

function cancelAlarm() {
    clearInterval(alarmInterval);
    txtBoxes[0].value = "";
    txtBoxes[1].value = "";
    txtBoxes[0].style.backgroundColor = "white";
    txtBoxes[1].style.backgroundColor = "white";
    txtBoxes[0].disabled = false;
    txtBoxes[1].disabled = false;
    btns[1].disabled = false;
    btns[2].disabled = false;
    btns[1].style.fontWeight = "normal";
    btns[1].style.color = "gray";
    btns[2].style.fontWeight = "normal";
    btns[2].style.color = "gray";
}

function cancelTimer() {
    clearInterval(timerInterval);
    txtBoxes[2].value = "";
    txtBoxes[3].value = "";
    txtBoxes[4].value = "";
    txtBoxes[2].style.backgroundColor = "white";
    txtBoxes[3].style.backgroundColor = "white";
    txtBoxes[4].style.backgroundColor = "white";
    txtBoxes[2].disabled = false;
    txtBoxes[3].disabled = false;
    txtBoxes[4].disabled = false;
}

function collectAlarmData() {
    alarmHH = parseInt(txtBoxes[0].value);
    alarmMM = parseInt(txtBoxes[1].value);

    if (alarmHH >= 1 && alarmHH <= 12 && alarmMM >= 0 && alarmMM <= 59 && (alarmAMPM == "AM" || alarmAMPM == "PM")) {
        alarmInterval = setInterval(setAlarm, 1000);
        txtBoxes[0].style.backgroundColor = "gray";
        txtBoxes[1].style.backgroundColor = "gray";
        txtBoxes[0].disabled = true;
        txtBoxes[1].disabled = true;
        btns[1].disabled = true;
        btns[2].disabled = true;
        // setAlarm();
    }
    else {
        alert("Please enter valid data");
    }
}

function setAlarm() {
    if (alarmHH == digitalHH.innerHTML && alarmMM == digitalMM.innerHTML && alarmAMPM == digitalAMPM.innerHTML) {
        alert("Alarm Triggered");
        clearInterval(alarmInterval);
        cancelAlarm();
    }
}

function collectTimerData() {
    if (parseInt(txtBoxes[2].value) >= 0 && parseInt(txtBoxes[2].value) <= 99 &&
        parseInt(txtBoxes[3].value) >= 0 && parseInt(txtBoxes[3].value) <= 59 &&
        parseInt(txtBoxes[4].value) >= 5 && parseInt(txtBoxes[4].value) <= 59) {
        txtBoxes[2].style.backgroundColor = "gray";
        txtBoxes[3].style.backgroundColor = "gray";
        txtBoxes[4].style.backgroundColor = "gray";
        txtBoxes[2].disabled = true;
        txtBoxes[3].disabled = true;
        txtBoxes[4].disabled = true;
        timerSS = (parseInt(txtBoxes[2].value) * 3600) + (parseInt(txtBoxes[3].value) * 60) + parseInt(txtBoxes[4].value);
        timerInterval = setInterval(setTimer, 1000);
    }
    else {
        alert("Please enter valid data (Min 0,0,5).");
    }
}

function setTimer() {
    timerSS--;
    console.log(timerSS);
    if (timerSS == 0) {
        alert("Timer Triggered");
        clearInterval(timerInterval);
        cancelTimer();
    }
}

function handleResize() {
    const mainDiv = document.getElementById("mainDiv");
    width = window.innerWidth;
    if (width < 768) {
        mainDiv.appendChild(digitalClock);
    }
    if (width >= 768) {
        document.body.appendChild(digitalClock);
    }
}
setInterval(setTime, 1000);
window.addEventListener('resize', handleResize);
handleResize();