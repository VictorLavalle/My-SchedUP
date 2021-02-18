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
  const NameUser = document.createElement("p");
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


//Functions to manipulate Cookies
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

function UpdateCookie(User) {
  let CookieName = "Session";
  let Duration = 1;
  let ParseUser = JSON.stringify(User);
  setCookie(CookieName, ParseUser, Duration);
}




//Updating the local storage that contains the user currrent session info
function UpdateLocaLStorage(User) {
  const KeyList = "SubjectStored";
  localStorage.setItem(KeyList, JSON.stringify(User));
}



//If the user hasn't logged in goes to login, otherwise goes to the schedule page
function getstarted() {
  let CookieUser = readCookie("Session");
  if (CookieUser != null) {
    location.href = "mySchedule.php";
  } else {
    location.href = "login.php";
  }
}

document.getElementById("GetStarted").addEventListener("click", function () {
  getstarted();
});



//If the user hasn't logged can't access the schedule page, instead in goes to login
document.getElementById("MySchedUP").addEventListener("click", function () {
  let CookieUser = readCookie("Session");
  if (CookieUser != null) {
    location.href = "mySchedule.php";
  } else {
    location.href = "login.php";
  }
});



//The next block of functions are useful when there's a click on the user's name,
//create a pop-up to Delete the current User or Modify the name into the Database.
//Sweet Alert 2 --> Library
function singleInput(title, text, prefill, callback) {
  Swal.fire({
    title: title,
    text: text,
    input: "text",
    inputValue: prefill,
    showCancelButton: true,
    html: `<button class="DeleteUser" id="DeleteUserBTN" onclick="DeleteUser()">Delete Current Profile</button>`,
  }).then((result) => {
    callback(result);
  });
}

function isEmpty(val) {
  return (val === undefined || val == null || val.length <= 0 || val == "") ? true : false;
}

function updateName(NewName) {
  User['firstName'] = NewName;
}

document.getElementById("IDNameUser").addEventListener("click", function () {
  singleInput(
    "Modify student",
    "Enter new name",
    "",
    function (result) {
      if (!isEmpty(result) && !isEmpty(result['value'])) {
        let DataJSON = {
          ID: User.id_User,
          Value: result['value']
        }
        updateName(DataJSON.Value);
        UpdateCookie(User);
        UpdateLocaLStorage(User);
        DataParser = JSON.stringify(DataJSON);

        $.ajax({
          type: "POST",
          url: "../services/db_ModifyName.php",
          data: {
            "Data": DataParser
          },
        }).done(function (Result) {
          try {
            location.reload();
          } catch (error) {
            console.error();
          }
        });
      }
    }
  );
});



function DeleteUser() {

  let UserDataJSON = {
    ID: User.id_User,
  };

  UserDataParser = JSON.stringify(UserDataJSON);

  $.ajax({
    type: "POST",
    url: "../services/db_DeleteUser.php",
    data: {
      "Data": UserDataParser
    },
  }).done(function (Result) {
    try {

      alert("User Deleted Succesfully");
      localStorage.clear();
      setCookie("Session", "", -1);
      location.reload();


    } catch (error) {
      console.error();
    }
  });

}