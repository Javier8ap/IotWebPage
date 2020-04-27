"use strict";

let userEmail = document.querySelector('#userEmail');
let userPassword = document.querySelector('#userPassword');

function logIn(){
    
    let xhr = new XMLHttpRequest();

    let endpoint = 'https://equipo5.herokuapp.com/api/login'

    

    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "email":userEmail.value,
        "password":userPassword.value
    }));

    xhr.onload = () => {
        if (xhr.status == 200) {
            //console.log("Entra2")
            //let user = JSON.parse(xhr.response);
            //console.log(JSON.parse(xhr.response));
            //alert(`Bienvenido ${user.email}`);
            window.location.href="menu.html";
           
        } else if (xhr.status == 404) {
            alert("Invalid Username");
        }
    }
    
}


