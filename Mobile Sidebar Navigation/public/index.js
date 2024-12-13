var hamburger = document.getElementById("hamburgerMenu");
var menus = document.getElementById("menus");
var transitionEffect = document.querySelector("ul");
hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("fa-xmark");
    hamburger.classList.toggle("fa-bars");
})