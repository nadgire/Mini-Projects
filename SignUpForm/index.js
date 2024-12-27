// var headers = new Headers();
// headers.append("X-CSCAPI-KEY", "T3ZVT2FFcUpQQnJBVk5xVDhoUlJPMFNuQ1JJanlPamJMWkJCYmIxaQ==");

// var requestOptions = {
//    method: 'GET',
//    headers: headers,
//    redirect: 'follow'
// };

// fetch("https://api.countrystatecity.in/v1/countries/", requestOptions)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log('error', error));

const phoneCountryCode = document.querySelector("input[list=phoneCountryCode]");
const selectCountry = document.getElementById("phoneCountryCode");
const selectstate = document.getElementById("states");
const selectcity = document.getElementById("city");
const txtState = document.getElementById("txtState");
const txtCity = document.getElementById("txtCity");

var countryResponse, stateResponse, cityResponse;
var countryResult, statesResult, cityResult;
var iso2CountryCode = "", iso2StateCode = "";
var connectObj = new XMLHttpRequest();
connectObj.open("get", "https://api.countrystatecity.in/v1/countries/", true);
connectObj.setRequestHeader('X-CSCAPI-KEY', 'T3ZVT2FFcUpQQnJBVk5xVDhoUlJPMFNuQ1JJanlPamJMWkJCYmIxaQ==');
connectObj.send();

connectObj.onreadystatechange = function () {
    if (connectObj.readyState == 4 && connectObj.status == 200) {
        countryResponse = connectObj.responseText;
        // console.log(response);
        countryResult = JSON.parse(countryResponse);
        // console.log(result);
        fillDataListCountriesWithCode();
    }
}

function fillDataListCountriesWithCode() {
    for (let i = 0; i < countryResult.length; i++) {
        selectCountry.innerHTML += "<option>+" + countryResult[i].phonecode + " " + countryResult[i].name + "</option>";
    }
    phoneCountryCode.addEventListener("input", loadStates);
}

function loadStates(event) {
    var codeAndCountry = event.target.value.split(" ");
    var country = codeAndCountry.slice(1).join(" ");
    // console.log(country)
    for (let i = 0; i < countryResult.length; i++) {
        if (countryResult[i].name == country) {
            iso2CountryCode = countryResult[i].iso2;
        }
    }
    connectObj.open("get", "https://api.countrystatecity.in/v1/countries/" + iso2CountryCode + "/states", true);
    connectObj.setRequestHeader('X-CSCAPI-KEY', 'T3ZVT2FFcUpQQnJBVk5xVDhoUlJPMFNuQ1JJanlPamJMWkJCYmIxaQ==');
    connectObj.send();

    connectObj.onreadystatechange = function () {
        if (connectObj.readyState == 4 && connectObj.status == 200) {
            stateResponse = connectObj.responseText;
            // console.log(response);
            statesResult = JSON.parse(stateResponse);
            fillDataListStates();
        }
    }

}

function fillDataListStates() {
    for (let i = 0; i < statesResult.length; i++) {
        selectstate.innerHTML += "<option>" + statesResult[i].name + "</option>";
    }
    txtState.addEventListener("input", loadCities);
}

function loadCities(event) {
    // console.log(event.target.value);
    var stateName = event.target.value;
    for (let i = 0; i < statesResult.length; i++) {
        if (statesResult[i].name == stateName) {
            iso2StateCode = statesResult[i].iso2;
        }
    }
    // console.log(iso2StateCode)
    // str = "https://api.countrystatecity.in/v1/countries/"+iso2CountryCode
    connectObj.open("get", "https://api.countrystatecity.in/v1/countries/" + iso2CountryCode + "/states/" + iso2StateCode + "/cities", true);
    connectObj.setRequestHeader('X-CSCAPI-KEY', 'T3ZVT2FFcUpQQnJBVk5xVDhoUlJPMFNuQ1JJanlPamJMWkJCYmIxaQ==');
    connectObj.send();

    connectObj.onreadystatechange = function () {
        if (connectObj.readyState == 4 && connectObj.status == 200) {
            cityResponse = connectObj.responseText;
            // console.log(cityResponse);
            cityResult = JSON.parse(cityResponse);
            // console.log(cityResult)
            fillDataListCity();
        }
    }
}

function fillDataListCity(){
    for (let i = 0; i < cityResult.length; i++) {
        selectcity.innerHTML += "<option>" + cityResult[i].name + "</option>";
    }
}