var connectObj = new XMLHttpRequest();
connectObj.open("get", "https://countriesnow.space/api/v0.1/countries/codes", true);
connectObj.send();
const phoneCountryCode = document.querySelector("input[list=phoneCountryCode]");
const selectCountry = document.getElementById("phoneCountryCode");


connectObj.onreadystatechange = function () {
    if (connectObj.readyState == 4 && connectObj.status == 200) {
        var response = connectObj.responseText;
        // console.log(response);
        var result = JSON.parse(response);
        // console.log(result.data);
        fillDataListCountriesWithCode(result.data);
    }
}

function fillDataListCountriesWithCode(countries) {
    for (let i = 0; i < countries.length; i++) {
        selectCountry.innerHTML += "<option>" + countries[i].dial_code + " " + countries[i].name + "</option>";
    }
    phoneCountryCode.addEventListener("input", loadStates);
}

function loadStates(event) {
    // console.log(event.target.value);
    var codeAndCountry = event.target.value.split(" ");
    // console.log(codeAndCountry);

    connectObj.open("get", "https://countriesnow.space/api/v0.1/"+codeAndCountry[1]+"/states", true);
    connectObj.send();

    connectObj.onreadystatechange = function () {
        if (connectObj.readyState == 4 && connectObj.status == 200) {
            var response = connectObj.responseText;
            // console.log(response);
            var result = JSON.parse(response);
            // console.log(result.data);
            fillDataListCountriesWithCode(result.data);
        }
    }
}