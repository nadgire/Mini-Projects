var mobilMenuHidden = true;
var txtSearchBox = document.querySelector("#txtSearchBox");
var mobileNavbar = document.querySelector("#mobileNavbar");

var btns = document.querySelectorAll("i");
console.log(btns);

btns.forEach(element => {
    element.addEventListener("click", function(event){
        console.log(event.currentTarget.id);
        if(event.currentTarget.id=="showNavBar"){
            mobileNavbar.classList.remove("hidden");
        }
        if(event.currentTarget.id=="hideNavBar"){
            mobileNavbar.classList.add("hidden");
        }

        if(event.currentTarget.id=="searchIcon"){
            console.log(txtSearchBox);
            if(txtSearchBox.value.length==0){
                if(txtSearchBox.classList.contains("w-8")){
                    txtSearchBox.classList.remove("w-8");
                    txtSearchBox.classList.add("w-32");
                }  
                else{
                    txtSearchBox.classList.add("w-8");
                    txtSearchBox.classList.remove("w-32");   
                }
            }
            else{
                console.log("searhing");
            }
        }
    })
});