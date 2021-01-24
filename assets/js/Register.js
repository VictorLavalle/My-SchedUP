let Inputs = document.getElementsByClassName("form-control");

const expressions = {
    nameRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    lastnameRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    emailRegex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password1Regex:  /^(?!.* ).{8,12}$/, // 8 a 12 digitos.
    password2Regex:  /^(?!.* ).{8,12}$/, // 8 a 12 digitos.
}

const Fields = {
    name: false,
    lastname: false,
    email: false,
    password1: false,
    password2: false,
	
}

document.getElementById("Register-Button").addEventListener("click",function(){

    validateRegister();
    AddStudent();
});

document.getElementById("MySchedUP").addEventListener("click",function(){
    let CookieUser = readCookie("Session");
    if(CookieUser!=null){
        location.href = "mySchedule.html"
    }
    else{
        location.href = "login.html"
    }
});


//Validate Fields
function validateRegister(){
    
    let firstNameInput = document.getElementById("firstName");
    let lastNameImput = document.getElementById("lastName");
    let EmailInput = document.getElementById("email");
    let PasswordInput = document.getElementById("password");
    let Password2Input = document.getElementById("passwordConfirm");


    validateFields(expressions.nameRegex,firstNameInput,firstNameInput.name);
    validateFields(expressions.lastnameRegex,lastNameImput,lastNameImput.name);
    validateFields(expressions.emailRegex,EmailInput,EmailInput.name);
    validateFields(expressions.password1Regex,PasswordInput,PasswordInput.name);
    validateFields(expressions.password2Regex,Password2Input,Password2Input.name);
   

    validateBothPasswords();
}

function validateFields(Expression,Input,Field){
    
   let PaserExpression = new RegExp(Expression);
   let idMessage = "Menssage"+Field;
   let ExistingMessage = document.getElementById(idMessage);
    if(!PaserExpression.test(Input.value)){
        if(!ExistingMessage){
            let idContainer = "Invalid"+Field;
            let Contet = new String (getTextContentMessage(Field));
            CreateMessage(idContainer,idMessage,Contet);
        }
        Fields[Field] = false;
    }else{
        if(ExistingMessage){
            DeleteMessage(idMessage);   
        }
        Fields[Field] = true;
    }
}

function CreateMessage(idContainer,idMessage,TextContentMessage){
    let Container = document.getElementById(idContainer);
    const fragment = document.createDocumentFragment();
    const Menssage = document.createElement('p');
    Menssage.setAttribute("id",idMessage);
    Menssage.setAttribute("style","color: red;");
    Menssage.textContent = TextContentMessage;
    fragment.appendChild(Menssage);
    Container.appendChild(Menssage);
}

function DeleteMessage(idMessage){
    let Menssage = document.getElementById(idMessage);
    let father = Menssage.parentNode;
    father.removeChild(Menssage);
}

function getStatusField(){
    return Fields.name && Fields.email && Fields.password1 && Fields.password2;
}

function validateBothPasswords(){
    if(Fields.password1 && Fields.password2){
        let idMessage = "MessagePasswords";
        let ExistingMessage = document.getElementById(idMessage);
        let idContainer = "InvalidPasswords";
        let Text = "Both passwords must match";
        let inputPassword1 = document.getElementById("password");
        let inputPassword2 = document.getElementById("passwordConfirm");
        if(inputPassword1.value!=inputPassword2.value){
            if(!ExistingMessage){
                CreateMessage(idContainer,idMessage,Text);
            }
            Fields["password1"] = false;
        }else{
            if(ExistingMessage){
                DeleteMessage(idMessage);
            }
           
        }
    }
}

function getTextContentMessage(Field){
    switch(Field){
        case "name":
        return "Invalid name"

        case "lastname":
        return "Invalid lastname"

        case "email":
        return "Invalid Email"    
        
        case "password1":
        return "Invalid Password";

        case "password2":
        return "Invalid Password";
    }
}

var StudentsList= [];
const KeyList = "StudentsList";
//Register New Students

function AddStudent(){
    
    let firstNameInput = document.getElementById("firstName").value;
    let lastNameImput = document.getElementById("lastName").value;
    let EmailInput = document.getElementById("email").value;
    let PasswordInput = document.getElementById("password").value;
   
    if(getStatusField()){
        var Student = {
            StudentFirstName : firstNameInput ,
            StudentLastName : lastNameImput,
            StudentEmail : EmailInput ,
            StudenPassword: PasswordInput ,
            StudenSchedule: [] ,
        }
        StudentsList.push(Student);
        SaveList(StudentsList);
        alert("User Registered Succesfully");
        CreateSessionCokie(Student);
        location.href = "mySchedule.html"
    }
}



function LoadList(){
    let StoredList = localStorage.getItem(KeyList);
    if (StoredList!=null){
        StudentsList = JSON.parse(StoredList);
    }else{
        StudentsList = [];
    }
}

function SaveList(list){
    localStorage.setItem(KeyList,JSON.stringify(list));
}

LoadList();

//Cookies
function CreateSessionCokie(User){
    let CookieName = "Session";
    let Duration = 1;
    let ParseUser = JSON.stringify(User);
    setCookie(CookieName, ParseUser, Duration);
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

