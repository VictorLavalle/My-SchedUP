const InputEmail = document.getElementById("inputEmail");
const InputPassword = document.getElementById("inputPassword");
 

var User = {};
const expressions = {
    emailRegex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    passwordRegex: /^(?!.* ).{8,12}$/, // 8 a 12 digitos.
}


const Fields = {
    email: false,
	password: false,
}

document.getElementById("logButton").addEventListener("click",function(){
    validateLogin();
    Login();
    loadCookieSession();
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


function validateLogin(){

    validateFields(expressions.emailRegex,InputEmail,InputEmail.name);
    validateFields(expressions.passwordRegex,InputPassword,InputPassword.name);
}

function validateFields(Expression,Input,Field){
    
   let ParserExpression = new RegExp(Expression);
   let idMessage = "Message"+Field;
   let ExistingMessage = document.getElementById(idMessage);
    if(!ParserExpression.test(Input.value)){
        if(!ExistingMessage){
            let idContainer = "Invalid"+Field;
            let Content = new String (getTextContentMessage(Field));
            CreateMessage(idContainer,idMessage,Content);
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
    return Fields.email && Fields.password;
}

function getTextContentMessage(Field){
    switch(Field){
        case "email":
        return "Invalid Email";    
        
        case "password":
        return "Invalid Password";
    }

}

//Buscando al usuario ;v
var StudentsList= [];
const KeyList = "StudentsList";

function LoadList(){
    let StoredList = localStorage.getItem(KeyList);
    if (StoredList!=null){
        StudentsList = JSON.parse(StoredList);
    }else{
        StudentsList = [];
    }
}

LoadList();

function Login(){

    if(getStatusField()){

        let DataUser = UserSearch(InputEmail.value,InputPassword.value);
        
       if(DataUser!=null){
            User = DataUser;
            CreateSessionCokie(User);
            alert("Access Granted");
            location.href = "mySchedule.html";
       }else{
        let idMessage = "cuatro";
        let ExistingMessage = document.getElementById(idMessage);
           if(!ExistingMessage){
            let idContainer = "InvalidBoth" ;
            let TextContentMessage = "Email and password do not match"; 
            CreateMessage(idContainer,idMessage,TextContentMessage);
           }
          
       }
    }  
}

function UserSearch(Email, Password){
    for(let i = 0;i < StudentsList.length ; i++){
        if(Email == StudentsList[i].StudentEmail && Password == StudentsList[i].StudenPassword){
            return  StudentsList[i];  
        }
    }
    return null;
}


//Sesion de usuario.



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

function ChangeDOMBySession(LoadUser){
    
    let idContainer = "IDUser";

    let removeAref = document.getElementById("Changelogin");
    let father = removeAref.parentNode;
    father.removeChild(removeAref);

    let Container = document.getElementById(idContainer);
    const fragment = document.createDocumentFragment();
    const NameUser = document.createElement('p');
    NameUser.setAttribute("id","IDNameUser");
    NameUser.setAttribute("style","color: black; padding-top:0.5rem; padding-right:1.5rem;");
    NameUser.textContent = LoadUser.StudentFirstName;
    fragment.appendChild(NameUser);
    Container.appendChild(NameUser);
    Container.style.paddingLeft = "28px";
    Container.style.marginLeft = "10px";
    Container.style.marginTop = "8.5px";





}

function loadCookieSession(){
    let CookieUser = readCookie("Session");
    if(CookieUser!=null){
        User = JSON.parse(CookieUser);
        ChangeDOMBySession(User);
    }
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

loadCookieSession();

