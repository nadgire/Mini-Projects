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
const btnDarkMode = document.querySelector("input[type=button");
const XII = document.getElementById("XII");
const III = document.getElementById("III");
const VI = document.getElementById("VI");
const IX = document.getElementById("IX");
const alarm = document.getElementById("alarm");
const timer = document.getElementById("timer");

const txtBoxes = document.querySelectorAll("input[type=number]");

const arrDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const arrMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];

var isDarkMode = true;


btnDarkMode.addEventListener("click", activateDarkMode);

function activateDarkMode() {

    const bodyTag = document.querySelector("body");
    if (isDarkMode) {
        bodyTag.classList.add("darkMode");

        hourHand.classList.toggle("bg-black");
        hourHand.classList.toggle("bg-white");
        minuteHand.classList.toggle("bg-black");
        minuteHand.classList.toggle("bg-white");

        btnDarkMode.classList.toggle("border-black");
        btnDarkMode.classList.toggle("border-white");

        btnDarkMode.classList.toggle("hover:text-black");
        btnDarkMode.value="Light Mode";

        txtBoxes.forEach(element => {
            element.classList.add("text-black");
        });

        XII.innerHTML = "XII";
        III.innerHTML = "III";
        VI.innerHTML = "VI";
        IX.innerHTML = "IX";

        timer.style.borderColor="white";
        alarm.style.borderColor="white";

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

        btnDarkMode.classList.toggle("hover:text-black");
        btnDarkMode.value="Dark Mode";

        txtBoxes.forEach(element => {
            element.classList.remove("text-black");
        });

        XII.innerHTML = "12";
        III.innerHTML = "3";
        VI.innerHTML = "6";
        IX.innerHTML = "9";

        timer.style.borderColor="black";
        alarm.style.borderColor="black";

        isDarkMode = true;

    }
}

function setTime() {


    var currentDate = new Date();
    var currentHH24 = currentDate.getHours();
    var currentHH12 = currentHH24 % 12;
    var currentMM = currentDate.getMinutes();
    var currentSS = currentDate.getSeconds();
    var currentDD = currentDate.getDate();
    var currentMon = currentDate.getMonth();
    // var currentYYYY = currentDate.getFullYear();
    var currentDay = currentDate.getDay();
    var currentAMPM = currentHH24 > 12 ? 'AM' : 'PM';

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
    var degree = currentSS * 6;

    // secondHand.style.rotate = `${currentSS*6}deg`;
    // minuteHand.style.rotate = `${currentMM*6}deg`;
    // hourHand.style.rotate = `${(currentHH12*30)+(currentMM*0.5)}deg`

    secondHand.style.transform = `translate(-50%, -100%) rotate(${(currentSS * 6)}deg)`
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${(currentMM * 6) + (currentSS * (1 / 10))}deg)`
    hourHand.style.transform = `translate(-50%, -100%) rotate(${(currentHH12 * 30) + (currentMM * 0.5)}deg)`
    

    // console.log(Math.abs(currentSS));

    digitalHH.innerHTML = currentHH24;
    digitalMM.innerHTML = currentMM;
    digitalSeconds.innerHTML = currentSS;
    // digitalAMPM.innerHTML = currentAMPM;

    digitalDay.innerHTML = arrDay[currentDay] + ",";
    digitalMon.innerHTML = arrMonth[currentMon];
    digitalDate.innerHTML = currentDD;
}

setInterval(setTime, 1000);

// 1 minute = 6 degree
