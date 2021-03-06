let Inputs = document.getElementsByClassName("form-control");

//This is to validate the text entered on the form login --> Regular Expressions
const expressions = {
  nameRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters y spaces, accents allowed
  lastnameRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters y spaces, accents allowed
  emailRegex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password1Regex: /^(?!.* ).{8,12}$/, // 8 to 12 digits.
  password2Regex: /^(?!.* ).{8,12}$/, // 8 to 12 digits.
};

const Fields = {
  firstname: false,
  lastname: false,
  email: false,
  password1: false,
  password2: false,
};


//Function to load the functions when the form is filled
document.getElementById("Register-Button")
  .addEventListener("click", function () {
    validateRegister();
    AddStudent();
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



//Functions to validate the fields of the register form.
function validateRegister() {
  let firstNameInput = document.getElementById("firstName");
  let lastNameImput = document.getElementById("lastName");
  let EmailInput = document.getElementById("email");
  let PasswordInput = document.getElementById("password");
  let Password2Input = document.getElementById("passwordConfirm");

  validateFields(expressions.nameRegex, firstNameInput, firstNameInput.name);
  validateFields(expressions.lastnameRegex, lastNameImput, lastNameImput.name);
  validateFields(expressions.emailRegex, EmailInput, EmailInput.name);
  validateFields(expressions.password1Regex, PasswordInput, PasswordInput.name);
  validateFields(
    expressions.password2Regex,
    Password2Input,
    Password2Input.name
  );

  validateBothPasswords();
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

function getStatusField() {
  return Fields.name && Fields.email && Fields.password1 && Fields.password2;
}

function validateBothPasswords() {
  if (Fields.password1 && Fields.password2) {
    let idMessage = "MessagePasswords";
    let ExistingMessage = document.getElementById(idMessage);
    let idContainer = "InvalidPasswords";
    let Text = "Both passwords must match";
    let inputPassword1 = document.getElementById("password");
    let inputPassword2 = document.getElementById("passwordConfirm");
    if (inputPassword1.value != inputPassword2.value) {
      if (!ExistingMessage) {
        CreateMessage(idContainer, idMessage, Text);
      }
      Fields["password1"] = false;
    } else {
      if (ExistingMessage) {
        DeleteMessage(idMessage);
      }
    }
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

//Warning messages according of the invalid field(s)
function getTextContentMessage(Field) {
  switch (Field) {
    case "name":
      return "Invalid name";

    case "lastname":
      return "Invalid lastname";

    case "email":
      return "Invalid Email";

    case "password1":
      return "Invalid Password";

    case "password2":
      return "Invalid Password";
  }
}


//Use ajax +JSON to save the data from a new user and send it to the PHP page 
//to save it in the database.
function AddStudent() {
  let firstNameInput = document.getElementById("firstName").value;
  let lastNameInput = document.getElementById("lastName").value;
  let EmailInput = document.getElementById("email").value;
  let PasswordInput = document.getElementById("password").value;
  

  if (getStatusField()) {
    var Student = {
      UsertFirstName: firstNameInput,
      UserLastName: lastNameInput,
      UserEmail: EmailInput,
      UserPassword: PasswordInput,
    };

    UserJsonParse = JSON.stringify(Student);

    $.ajax({
      type: "POST",
      url: "../services/db_SignUp.php",
      data: {
        JSON: UserJsonParse
      },
    }).done(function (Result) {
      try {
        let UserServer = JSON.parse(Result);

        if (UserServer != null) {
          User = UserServer;
          CreateSessionCokie(User);
          CreateLocaLStorage(User);
          alert("User Registered Succesfully");
          location.href = "mySchedule.html";
        }
      } catch (error) {
        console.error();
      }
    });
  }
}

function CancelBTN(){
  location.href = "index.html";
}




//Create the local storage file to keep local the user data 
const KeyList = "SubjectStored";

function CreateLocaLStorage(User) {
  const KeyList = "SubjectStored";
  localStorage.setItem(KeyList, JSON.stringify(User));
}



//Functions to manipulate Cookies
function CreateSessionCokie(User) {
  let CookieName = "Session";
  let Duration = 1;
  let ParseUser = JSON.stringify(User);
  setCookie(CookieName, ParseUser, Duration);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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