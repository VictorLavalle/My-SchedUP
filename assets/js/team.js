var User = {};

//Check if the cookie "Session" exists to check if is necessary to change the nav bar
function loadCookieSession() {
    let CookieUser = readCookie("Session");
    if (CookieUser != null) {
        User = JSON.parse(CookieUser);
        ChangeDOMBySession(User);
    } else {
        ChangeDOMBySession(User);
    }
}

//reads the data in the cookie
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//Call to the function
loadCookieSession();




//Function to change in the nav bar "Login" to User's name
function ChangeDOMBySession(LoadUser) {

    let idContainer = "IDUser";
    let removeAref = document.getElementById("Changelogin");
    let father = removeAref.parentNode;
    
    father.removeChild(removeAref);

    let Container = document.getElementById(idContainer);
    const fragment = document.createDocumentFragment();
    const NameUser = document.createElement('p');
    NameUser.setAttribute("id", "IDNameUser");
    NameUser.setAttribute("style", "color: black;");
    NameUser.style.fontSize = "25px";
    NameUser.textContent = LoadUser.firstName;
    fragment.appendChild(NameUser);
    Container.appendChild(NameUser);
    Container.style.paddingLeft = "28px";
    Container.style.marginLeft = "10px";
    Container.style.marginTop = "8.5px";
}


//If the user hasn't logged can't access the schedule page, instead in goes to login
document.getElementById("MySchedUP").addEventListener("click", function () {
    let CookieUser = readCookie("Session");
    if (CookieUser != null) {
        location.href = "mySchedule.html"
    } else {
        location.href = "login.html"
    }
});