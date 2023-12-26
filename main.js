var inputName = document.getElementById("exampleInputName1")
var inputEmail = document.getElementById("exampleInputEmail1")
var inputPass = document.getElementById("exampleInputPassword1")
var users = [
    {
        name: "admin",
        email: "admin@admin.com",
        password: "admin",
        loginState: 0
    }
]

if(localStorage.getItem("users") != null){
    users = JSON.parse(localStorage.getItem("users"))
}

document.querySelector(".signup")?.addEventListener("click", function () {
    emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    nameRegex = /^[a-zA-Z ]+$/
    passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if (emailRegex.test(inputEmail.value) == true && nameRegex.test(inputName.value) == true && passwordRegex.test(inputPass.value) == true){
        for(var i = 0 ; i < users.length ; i++){
            var alreayStored = false
            if(inputEmail.value == users[i].email){
                alreayStored = true
                break
            } 
        }
        if (alreayStored == true) {
            document.getElementById("error").innerHTML = "You have account already, please login"
            document.getElementById("error").style.color = "red"
        } else {
            var user = {
                name: inputName.value,
                email: inputEmail.value,
                password: inputPass.value,
                loginState: 0
            }
            users.push(user)
            document.getElementById("error").innerHTML = "Success"
            document.getElementById("error").style.color = "green"
            saveLocalStorage()
            clearForm()
        }
    } else {
        document.getElementById("error").innerHTML = "Your inputs not valid"
        document.getElementById("error").style.color = "red"
    }
    
})

var user_id

document.querySelector(".login")?.addEventListener("click", function () {
    emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(inputEmail.value) == true){  
        for(var i = 0 ; i < users.length ; i++){
            var login = false
            if(inputEmail.value == users[i].email && inputPass.value == users[i].password){
                login = true
                break
            }
        }
        if (login == true){
            users[i].loginState = 1
            user_id = i
            document.getElementById("state").innerHTML = "Success"
            document.getElementById("state").style.color = "green"
            if (users[i].loginState == 1){
                document.querySelector(".row-view").innerHTML = `
            <div class="col d-flex justify-content-center">
          <div class="w-50 d-flex justify-content-center flex-wrap">
            <h3 class="mt-5 fw-bold text-center border-1 bg-secondary p-2 w-100" id="welcome">Welcome ${users[i].name}</h3>
            <button onclick="logout()" class="btn btn-primary mt-4 w-25 logout">Logout</button>
          </div>
        </div>
            `
            }
        } else {
            document.getElementById("state").innerHTML = "Your password or email not correct"
            document.getElementById("state").style.color = "red"
        }
    } else {
        document.getElementById("state").innerHTML = "Your inputs not valid"
        document.getElementById("state").style.color = "red"
    }
    
})

function logout() {
    users[user_id].loginState = 0
    document.querySelector(".row-view").innerHTML = `
    <div class="col d-flex justify-content-center">
    <div class="w-50">
      <h4 class="mt-5 fw-bold text-center fw-bold" id="state">See you later :)</h4>
      <p class="mt-2">Want to login again? <a href="index.html">Login</a></p>
    </div>
  </div>
            `
}

function saveLocalStorage(){
    localStorage.setItem("users", JSON.stringify(users))
}

function clearForm(){
    inputName.value = ""
    inputEmail.value = ""
    inputPass.value = ""
}