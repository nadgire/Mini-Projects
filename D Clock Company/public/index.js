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

const arrDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const arrMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];

btnDarkMode.addEventListener("click", activateDarkMode);
function activateDarkMode(){

}

function setTime(){
    var currentDate = new Date();
    var currentHH24 = currentDate.getHours();
    var currentHH12 = currentHH24 % 12;
    var currentMM = currentDate.getMinutes();
    var currentSS = currentDate.getSeconds();
    var currentDD = currentDate.getDate();
    var currentMon = currentDate.getMonth();
    // var currentYYYY = currentDate.getFullYear();
    var currentDay = currentDate.getDay();
    var currentAMPM = currentHH24 < 13 ? 'AM' : 'PM';

    if (currentHH12 < 10) {
        currentHH12 = "0" + currentHH12;
    }

    if (currentMM < 10) {
        currentMM = "0" + currentMM;
    }

    if (currentSS < 10) {
        currentSS = "0" + currentSS;
    }



    digitalHH.innerHTML = currentHH12;
    digitalMM.innerHTML = currentMM;
    digitalSeconds.innerHTML = currentSS;
    digitalAMPM.innerHTML = currentAMPM;

    digitalDay.innerHTML = arrDay[currentDay] + ",";
    digitalMon.innerHTML = arrMonth[currentMon];
    digitalDate.innerHTML = currentDD;
}

setInterval(setTime,1000);

// 1 minute = 6 degree
