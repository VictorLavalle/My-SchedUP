var User = {};

//Fields to validate
const Fields = {
  Subject: false,
  Teacher: false,
  StartTime: false,
  EndTime: false,
};


//This is to validate the text entered on the form login --> Regular Expressions
const expressions = {
  SubjectRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters y spaces, accents allowed
  TeacherRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters y spaces, accents allowed.
};





//Delete the cookie session when the user click the logout button
document.getElementById("LogOut").addEventListener("click", function () {
  User = {};
  deleteCookie();
  location.href = "login.html";
});


//If the user hasn't logged can't access the schedule page, instead in goes to login
document.getElementById("MySchedUP").addEventListener("click", function () {
  let CookieUser = readCookie("Session");
  if (CookieUser != null) {
    location.href = "mySchedule.html";
  } else {
    location.href = "login.html";
  }
});


//Function to change in the nav bar "Login" to User's name
function ChangeDOMBySession(LoadUser) {
  let idContainer = "IDUser";

  let removeAref = document.getElementById("Changelogin");
  let father = removeAref.parentNode;
  father.removeChild(removeAref);

  let Container = document.getElementById(idContainer);
  const fragment = document.createDocumentFragment();
  const NameUser = document.createElement("p");
  NameUser.setAttribute("id", "IDNameUser");
  NameUser.setAttribute("style", "color: #212529;");
  NameUser.style.fontSize = "25px";
  NameUser.textContent = LoadUser.firstName;
  fragment.appendChild(NameUser);
  Container.appendChild(NameUser);
  Container.style.paddingLeft = "25px";
  Container.style.marginLeft = "10px";
  Container.style.marginTop = "8.5px";

  for (let i = 0; i < User.UserSchedule.length; i++) {
    AddSubjectToSchedule(User.UserSchedule[i]);
  }
}




//Functions to validate the inputs of a new subject
function getStatusField() {
  return Fields.Subject && Fields.Teacher && Fields.StartTime && Fields.EndTime;
}

function validateRegister() {
  let SubjectInput = document.getElementById("Subject");
  let TeacherInput = document.getElementById("Teacher");

  validateFields(expressions.SubjectRegex, SubjectInput, SubjectInput.name);
  validateFields(expressions.TeacherRegex, TeacherInput, TeacherInput.name);

  ValidateStarAndEndTime();
}

function ValidateStarAndEndTime() {
  let StartedTimetInput = document.getElementById("StartTime").value;
  let EndTimeInput = document.getElementById("EndTime").value;

  if (StartedTimetInput != "" && EndTimeInput != "" && EndTimeInput > StartedTimetInput) {
    Fields["StartTime"] = true;
    Fields["EndTime"] = true;
    let idMessage = "MessageStartTime";
    let ExistingMessage = document.getElementById(idMessage);
    if (ExistingMessage) {
      DeleteMessage(idMessage);
    }
  } else {
    Fields["StartTime"] = true;
    Fields["EndTime"] = false;
    let idMessage = "MessageStartTime";
    let ExistingMessage = document.getElementById(idMessage);
    if (!ExistingMessage) {
      let idContainer = "InvalidStartTime";
      let Contet = "Enter valid hours";
      CreateMessage(idContainer, idMessage, Contet);
    }
  }
}



function validateFields(Expression, Input, Field) {
  let PaserExpression = new RegExp(Expression);
  let idMessage = "Message" + Field;
  let ExistingMessage = document.getElementById(idMessage);
  if (!PaserExpression.test(Input.value)) {
    if (!ExistingMessage) {
      let idContainer = "Invalid" + Field;
      let Contet = new String(getTextContentMessage(Field));
      CreateMessage(idContainer, idMessage, Contet);
    }
    Fields[Field] = false;
  } else {
    if (ExistingMessage) {
      DeleteMessage(idMessage);
    }
    Fields[Field] = true;
  }
}

//Functions to show/dissapear warning messages when the user has entered invalid text
function CreateMessage(idContainer, idMessage, TextContentMessage) {
  let Container = document.getElementById(idContainer);
  const fragment = document.createDocumentFragment();
  const Message = document.createElement("p");
  Message.setAttribute("id", idMessage);
  Message.setAttribute("style", "color: red;");
  Message.textContent = TextContentMessage;
  fragment.appendChild(Message);
  Container.appendChild(Message);
}

function DeleteMessage(idMessage) {
  let Message = document.getElementById(idMessage);
  let father = Message.parentNode;
  father.removeChild(Message);
}


function getTextContentMessage(Field) {
  switch (Field) {
    case "Subject":
      return "Invalid Subject";

    case "Teacher":
      return "Invalid lastname";
  }
}




//Function that loads the functions to add a subject when it's clicked
document.getElementById("AddSubjectBTN").addEventListener("click", function () {
  validateRegister();
  if (getStatusField()) {
    AddSubject();
  }

});

//Save the text entered in the fields into a JSON, use ajax to send it
//to it's according PHP page to save it on the database
function AddSubject() {
  const SubjectInput = document.getElementById("Subject").value;
  const TeacherInput = document.getElementById("Teacher").value;
  const StartTimeInput = document.getElementById("StartTime").value;
  const EndTimeInput = document.getElementById("EndTime").value;
  const DaysInput = document.getElementById("Days").value;

  let DataSubjectJSON = {
    SubjectName: SubjectInput,
    TeacherName: TeacherInput,
    StartTime: StartTimeInput,
    EndTime: EndTimeInput,
    Day: DaysInput,
    Email: User.email,
  };

  let SubjectParse = JSON.stringify(DataSubjectJSON);

  $.ajax({
    type: "POST",
    url: "../services/db_AddSubject.php",
    data: {
      "JSON": SubjectParse
    },
  }).done(function (Result) {

    try {
      let SubjectServer = JSON.parse(Result);
      //console.log(SubjectServer);
      User.UserSchedule.push(SubjectServer);
      SaveList(User);
      UpdateCookie(User);
      AddSubjectToSchedule(SubjectServer);

    } catch (error) {

      alert(Result);

    }


  });
}






//Functions to manipulate Cookies
function UpdateCookie(User) {
  let CookieName = "Session";
  let Duration = 1;
  let ParseUser = JSON.stringify(User);
  setCookie(CookieName, ParseUser, Duration);
}


function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function deleteCookie() {
  setCookie("Session", "", -1);
}


function loadCookieSession() {
  let CookieUser = readCookie("Session");
  if (CookieUser != null) {
    User = JSON.parse(CookieUser);
    //console.log(User);
    ChangeDOMBySession(User);
  } else {
    document.getElementById("LogOut").setAttribute("style", "display: none");
  }
}

loadCookieSession();



//Functions to manipulate the data on the local storage
const KeyList = "SubjectStored";

function DeleteData(idSubject) {
  let newArray = [];
  for (let j = 0; j < User.UserSchedule.length; j++) {
    if (User.UserSchedule[j].id_Subject != idSubject) {
      newArray.push(User.UserSchedule[j]);
    }
  }
  User["UserSchedule"] = newArray;
}

function LoadList() {
  let StoredList = localStorage.getItem(KeyList);
  if (StoredList != null) {
    User = JSON.parse(StoredList);
  }
}

function SaveList(list) {
  localStorage.setItem(KeyList, JSON.stringify(list));
}


LoadList();


//Rewrite the DOM
function AddSubjectToSchedule(Subject) {
  let idContainer = Subject.sbj_Day + "Cell";
  let ElementDiv = "div";
  let ElementP = "p";
  let idElement = Subject.id_Subject + "-subjectbox";
  let Container = document.getElementById(idContainer);
  const fragment = document.createDocumentFragment();
  const DivSubject = document.createElement(ElementDiv);

  appendChildElement(ElementP, "Materia: " + Subject.sbj_Name, DivSubject);
  appendChildElement(ElementP, "Profesor: " + Subject.sbj_teacher, DivSubject);
  appendChildElement(ElementP, "Inicio: " + Subject.startTime, DivSubject);
  appendChildElement(ElementP, "Fin: " + Subject.endTime, DivSubject);

  const BTN = document.createElement("input");
  BTN.setAttribute("type", "button");
  BTN.setAttribute("value", "Delete");
  BTN.setAttribute("class", "DeleteBTN");
  BTN.setAttribute("id", Subject.id_Subject);
  DivSubject.appendChild(BTN);

  DivSubject.setAttribute("class", "subjectbox");
  DivSubject.setAttribute("id", idElement);
  DivSubject.style.border = "solid 5px #3498db";
  DivSubject.style.cssText = "background-color:" + get_rand_color();
  DivSubject.style.borderRadius = "10px";

  fragment.appendChild(DivSubject);
  Container.appendChild(DivSubject);
}

function DeleteSubjectToSchedule(idMessage) {
  let Message = document.getElementById(idMessage);
  let father = Message.parentNode;
  father.removeChild(Message);
}

function appendChildElement(ElementType, ValueText, FatherNode) {
  const SonNode = document.createElement(ElementType);
  SonNode.textContent = ValueText;
  FatherNode.appendChild(SonNode);
}





//Function to download a picture of the schedule created 
function DownloadSchedule() {
  domtoimage.toBlob(document.getElementById('mainTable'))
    .then(function (blob) {
      window.saveAs(blob, 'My-SchedUP.png');
    });

}


//function to get a random color for the created subjects
function get_rand_color() {
  var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
  while (color.length < 6) {
    color = "0" + color;
  }
  return "#" + color;
}



//Delete a specific subjects on the schedule table
$(document).ready(function () {
  $("#mainTable").click(function (e) {
    let ClassNameBTN = e.target.className;

    if (ClassNameBTN == "DeleteBTN") {
      let JSONDeleteSubject = {
        EmailUser: User.email,
        IdSubject: e.target.id,
      };

      JSONDeleteSubjectParse = JSON.stringify(JSONDeleteSubject);

      $.ajax({
        type: "POST",
        url: "../services/db_DeleteSubject.php",
        data: {
          "JSON": JSONDeleteSubjectParse
        },
      }).done(function (Result) {
        DeleteData(JSONDeleteSubject.IdSubject);
        DeleteSubjectToSchedule(JSONDeleteSubject.IdSubject + "-subjectbox");
        SaveList(User);
        UpdateCookie(User);
        //console.log(User);
      });
    }
  });
});