var hamburger = document.getElementById("hamburgerMenu");
var menus = document.getElementById("menus");
var txtSearch = document.getElementById("txtSearch");
var iconSearch = document.getElementById("iconSearch");
var transitionEffect = document.querySelector("ul");

iconSearch.addEventListener("click", function () {
    if (txtSearch.value.length <=0) {
        txtSearch.focus();
        txtSearch.classList.toggle("w-10");
        txtSearch.classList.toggle("w-32");       
    }
    else{
        console.log("Searching");
    }
})

iconSearch.addEventListener("click", function () {

})

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("fa-xmark");
    hamburger.classList.toggle("fa-bars");
    menus.classList.toggle("translate-y-0");
    menus.classList.toggle("-translate-y-full");

})