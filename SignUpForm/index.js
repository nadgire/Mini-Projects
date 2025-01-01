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

const signupForm = document.getElementById("signupForm");
const phoneCountryCode = document.querySelector("input[list=phoneCountryCode]");
const selectCountry = document.getElementById("phoneCountryCode");
const selectstate = document.getElementById("states");
const selectcity = document.getElementById("city");
const userState = document.getElementById("userState");
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
    selectstate.innerHTML = "";
    for (let i = 0; i < statesResult.length; i++) {
        selectstate.innerHTML += "<option>" + statesResult[i].name + "</option>";
    }
    userState.addEventListener("input", loadCities);
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

function fillDataListCity() {
    selectcity.innerHTML = "";
    for (let i = 0; i < cityResult.length; i++) {
        selectcity.innerHTML += "<option>" + cityResult[i].name + "</option>";
    }
}

function checkForValidations() {
    fullnameValidation(); emailValidation(); passwordValidation(); dobValidation();
    tobValidation(); genderValidation(); countryAndPhoneValidation(); stateValidation(); cityValidation();
    ratingValidation(); urlValidation(); fileValidation();
    if (!fullnameValidation() || !emailValidation() || !passwordValidation() || !dobValidation() || !tobValidation() ||
        !genderValidation() || !countryAndPhoneValidation() || !stateValidation() || !cityValidation() || !ratingValidation() ||
        !urlValidation() || !fileValidation()) {
        return false;
    }
    else {
        return true;
    }

}

// signupForm.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//     }
// })

//Full Name Validation
function fullnameValidation() {
    var nameError = document.getElementById("nameError");

    if (document.forms["signupForm"]["userFName"].value === "") {
        nameError.classList.remove("hidden");
        nameError.innerHTML = "Name cannot be empty!";
        return false;
    }
    else {
        nameError.classList.add("hidden");
        var pattern = new RegExp("^[A-Za-z]+([-'\\s][A-Za-z]+){2}$");
        if (!(pattern.test(document.forms["signupForm"]["userFName"].value))) {
            nameError.classList.remove("hidden");
            nameError.innerHTML = "Enter 'Full name'";
            return false;
        }
        nameError.classList.add("hidden")
        return true;
    }
}

//Email Validation
function emailValidation() {
    var emailError = document.getElementById("emailError");

    if (document.forms["signupForm"]["userEmailAddress"].value === "") {
        emailError.classList.remove("hidden");
        emailError.innerHTML = "Email cannot be empty!";
        return false;
    }
    else {
        emailError.classList.add("hidden");
        var emailPattern = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
        // console.log(emailPattern.test(document.forms["signupForm"]["userEmailAddress"].value));
        if (!(emailPattern.test(document.forms["signupForm"]["userEmailAddress"].value))) {
            emailError.classList.remove("hidden");
            emailError.innerHTML = "Enter email in correct format";
            return false;
        }
        emailError.classList.add("hidden")
        return true;
    }
}

// Password validation
function passwordValidation() {
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    if (document.forms["signupForm"]["userPassword"].value == "") {
        passwordError.classList.remove("hidden");
        passwordError.innerHTML = "Enter Passward";
        confirmPasswordError.classList.add("hidden");
    }
    else if (document.forms["signupForm"]["userPasswordConfirm"].value == "") {
        confirmPasswordError.classList.remove("hidden");
        passwordError.classList.add("hidden");
        confirmPasswordError.innerHTML = "Enter Passward to Confirm";
    }
    else {

        var passwordPattern = new RegExp("[A-Za-z0-9!@#$%^&*-_.?]{8,20}");
        if (passwordPattern.test(document.forms["signupForm"]["userPasswordConfirm"].value)) {
            if (document.forms["signupForm"]["userPasswordConfirm"].value == document.forms["signupForm"]["userPassword"].value) {
                confirmPasswordError.classList.add("hidden");
                passwordError.classList.add("hidden");
                return true;
            }
            else {
                console.log("first else")

                confirmPasswordError.classList.remove("hidden");
                confirmPasswordError.innerHTML = "Please re-enter the password to match";
                return false;
            }
        }
        else {
            console.log("2nd else")
            passwordError.classList.remove("hidden");
            passwordError.innerHTML = "Password Criteria: <br>At least 1 uppercase letter<br>At least 1 lowercase letter<br>At least 1 number<br>At least 1 special Character (!@#$%^&*-_.?)<br>Length should be between 8-20.";
            return false;
        }
    }
}

function dobValidation() {
    const dobError = document.getElementById("dobError");
    var selectedDate = new Date(document.forms["signupForm"]["userDob"].value);
    var today = new Date();

    if (document.forms["signupForm"]["userDob"].value == "") {
        dobError.classList.remove("hidden");
        dobError.textContent = "Please enter DOB";
        return false;
    }

    else {
        if (selectedDate.getFullYear() <= (today.getFullYear() - 21)) {
            dobError.classList.add("hidden");
            return true;
        }
        else {
            dobError.classList.remove("hidden");
            dobError.textContent = "Please enter valid DOB"
            return false;
        }
    }
}

function tobValidation() {
    const tobError = document.getElementById("tobError");
    if (document.forms["signupForm"]["userTob"].value == "") {
        tobError.classList.remove("hidden");
        tobError.textContent = "Please enter TOB";
        return false;
    }
    else {
        tobError.classList.add("hidden");
        return true;
    }
}

function genderValidation() {
    const genderRadios = document.querySelectorAll("input[type=radio]");
    const genderError = document.getElementById("genderError");
    let selected = false;
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            genderError.classList.add("hidden");
            selected = true;
            return selected;
        }
    }
    if (selected == false) {
        genderError.classList.remove("hidden");
        genderError.textContent = "Please select gender";
        return false;
    }
}

function countryAndPhoneValidation() {
    const countryAndPhoneError = document.getElementById("countryAndPhoneError");
    if (document.forms["signupForm"]["userCountry"].value == "" || document.forms["signupForm"]["userMobile"].value == "") {
        countryAndPhoneError.classList.remove("hidden");
        countryAndPhoneError.textContent = "Enter Country Code and Phone Number";
        return false;
    }
    else {
        var countryCode = document.getElementById("countryCode");
        for (let i = 0; i < countryResult.length; i++) {
            if (countryCode.value == ("+" + countryResult[i].phonecode + " " + countryResult[i].name)) {
                countryAndPhoneError.classList.add("hidden");
                return true;
            }
        }
        countryAndPhoneError.classList.remove("hidden");
        countryAndPhoneError.textContent = "Please select value from the list."
        return false;
    }
}

function stateValidation() {
    var stateCityError = document.getElementById("stateCityError");

    if (document.forms["signupForm"]["userState"].value == "") {
        stateCityError.classList.remove("hidden");
        stateCityError.textContent = "Please enter state.";
        return false;
    }
    else {
        for (let i = 0; i < statesResult.length; i++) {
            if (document.forms["signupForm"]["userState"].value == statesResult[i].name) {
                stateCityError.classList.add("hidden");
                return true;
            }
        }
        stateCityError.classList.remove("hidden");
        stateCityError.textContent = "Please select value from the list."
        return false;
    }
}

function cityValidation() {
    var stateCityError = document.getElementById("stateCityError");

    if (document.forms["signupForm"]["userCity"].value == "") {
        stateCityError.classList.remove("hidden");
        stateCityError.textContent = "Please enter city.";
        return false;
    }
    stateCityError.classList.add("hidden");
    return true;
}

function ratingValidation() {
    var englishOutput = document.getElementById("englishOutput");
    var ratingError = document.getElementById("ratingError");

    if (englishOutput.textContent == "") {
        ratingError.classList.remove("hidden");
        ratingError.textContent = "Please rate yourself.";
        return false;
    }
    ratingError.classList.add("hidden");
    return true;
}

function urlValidation() {
    var urlError = document.getElementById("urlError");

    if (document.forms["signupForm"]["userLinkedUrl"].value == "") {
        urlError.classList.remove("hidden");
        urlError.textContent = "Please enter linkedin profile URL.";
        return false;
    }
    urlError.classList.add("hidden");
    return true;
}

function fileValidation() {
    var fileError = document.getElementById("fileError");
    if (document.forms["signupForm"]["userFile"].value == "") {
        fileError.classList.remove("hidden");
        fileError.textContent = "Please select the file.";
        return false;
    }
    fileError.classList.add("hidden");
    return true;
}