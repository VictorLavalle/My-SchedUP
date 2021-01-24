var User = {};

function loadCookieSession() {
    let CookieUser = readCookie("Session");
    if (CookieUser != null) {
        User = JSON.parse(CookieUser);
        ChangeDOMBySession(User);
    } else {
        document.getElementById("LogOut").setAttribute("style", "display: none");
    }
}

loadCookieSession();

function ChangeDOMBySession(LoadUser) {

    let idContainer = "IDUser";

    let removeAref = document.getElementById("Changelogin");
    let father = removeAref.parentNode;
    father.removeChild(removeAref);

    let Container = document.getElementById(idContainer);
    const fragment = document.createDocumentFragment();
    const NameUser = document.createElement('p');
    NameUser.setAttribute("id", "IDNameUser");
    NameUser.setAttribute("style", "color: #212529;");
    NameUser.style.fontSize = "25px";
    NameUser.textContent = LoadUser.StudentFirstName;
    fragment.appendChild(NameUser);
    Container.appendChild(NameUser);
    Container.style.paddingLeft = "28px";
    Container.style.marginLeft = "10px";
    Container.style.marginTop = "8.5px";


    for (let i = 0; i < User.StudenSchedule.length; i++) {
        AddSubjectToSchedule(User.StudenSchedule[i]);
    }
}

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


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function deleteCookie() {
    setCookie("Session", "", -1);
}


document.getElementById("LogOut").addEventListener("click", function () {
    User = {};
    deleteCookie();
    location.href = "login.html"
});

document.getElementById("MySchedUP").addEventListener("click", function () {
    let CookieUser = readCookie("Session");
    if (CookieUser != null) {
        location.href = "mySchedule.html"
    } else {
        location.href = "login.html"
    }
});

function AddSubject() {
    const SubjectInput = document.getElementById("Subject").value;
    const TeacherInput = document.getElementById("Teacher").value;
    const StartTimeInput = document.getElementById("StartTime").value;
    const EndTimeInput = document.getElementById("EndTime").value;
    const DaysInput = document.getElementById("Days").value;

    let Subject = {
        SubjectName: SubjectInput,
        TeacherName: TeacherInput,
        StartTime: StartTimeInput,
        EndTime: EndTimeInput,
        Day: DaysInput,
    }
    UpdateData(Subject);
    User.StudenSchedule.push(Subject);
    SaveList(StudentsList);
    UpdateCookie(User);
    AddSubjectToSchedule(Subject);

}


//UpdateBD

const KeyList = "StudentsList";
var StudentsList = [];

//UpdateLocalStorage
function UpdateData(Subject) {
    for (let i = 0; i < StudentsList.length; i++) {
        if (User.StudentEmail == StudentsList[i].StudentEmail) {
            StudentsList[i].StudenSchedule.push(Subject);
        }
    }
}

function LoadList() {
    let StoredList = localStorage.getItem(KeyList);
    if (StoredList != null) {
        StudentsList = JSON.parse(StoredList);
    } else {
        StudentsList = [];
    }
}

function SaveList(list) {
    localStorage.setItem(KeyList, JSON.stringify(list));
}


//UpdateCookie
function UpdateCookie(User) {
    let CookieName = "Session";
    let Duration = 1;
    let ParseUser = JSON.stringify(User);
    setCookie(CookieName, ParseUser, Duration);
}


LoadList();

//Rewrite the DOM
function AddSubjectToSchedule(Subject) {
    let idContainer = Subject.Day + "Cell";
    let ElementDiv = 'div';
    let ElementP = 'p'
    let idElement = Subject.SubjectName + "-" + Subject.Day;
    let Container = document.getElementById(idContainer);
    const fragment = document.createDocumentFragment();
    const DivSubject = document.createElement(ElementDiv);

    appendChildElement(ElementP, "Materia: " + Subject.SubjectName, DivSubject);
    appendChildElement(ElementP, "Profesor: " + Subject.TeacherName, DivSubject);
    appendChildElement(ElementP, "Inicio: " + Subject.StartTime, DivSubject);
    appendChildElement(ElementP, "Fin: " + Subject.EndTime, DivSubject);

    DivSubject.setAttribute("class", "subjectbox");
    DivSubject.setAttribute("id", idElement);
    DivSubject.style.border = "solid 5px #3498db";
    DivSubject.style.cssText = "background-color:" + get_rand_color();;
    DivSubject.style.borderRadius = "10px"
    fragment.appendChild(DivSubject);
    Container.appendChild(DivSubject);
}

function appendChildElement(ElementType, ValueText, FatherNode) {
    const SonNode = document.createElement(ElementType);
    SonNode.textContent = ValueText;
    FatherNode.appendChild(SonNode);
}

function ToStringSubject(Subject) {
    return "Materia: " + Subject.SubjectName + "\n" + " Nombre del profesor: " +
        Subject.TeacherName + "\n" + " Hora de inicio: " + Subject.StartTime + "\n" + "Hora de Termino: " + Subject.EndTime;
}

document.getElementById("AddSubjectBTN").addEventListener("click", function () {
    AddSubject();
});



function get_rand_color() {
    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}