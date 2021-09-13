window.onscroll = function() {myFunction()};

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var element = document.getElementById("header");
    
    if (winScroll > 100) {
        element.classList.add("shadow-bottom");
    } else {
        element.classList.remove("shadow-bottom");
    }
}