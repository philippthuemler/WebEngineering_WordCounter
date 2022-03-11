
const namePattern = /([A-Z]|Ä|Ö|Ü)([a-z]|ä|ö|ü|ß)*/;
const usernamePattern = /([a-z]|[A-Z]|[0-9]|\.|-|_)*/;
const emailPattern = /^([a-z]|[A-Z]|[0-9]|\.|_|-)*@([a-z]|[A-Z]|[0-9]|-)*\.([a-z]){2,3}$/;
let err = document.getElementById('error-msg');

function validateUserData(input, type) {
    switch(type) {
        case ('firstname'):
            // firstname validation
            if(input.match(namePattern))
                return true;
                break;
        case ('lastname'):
            // lastname validation
            if(input.match(namePattern))
                return true;
            break;
        case ('username'):
            // username validation
            if(input.match(usernamePattern))
                return true;
            break;
        case ('email'):
            // email validation
            if(input.match(emailPattern))
                return true;
            break;
        case ('password'):
            // password validation
            return true;
            break;
        default:
            return false;
    }
}

function validateUser(user) {
    let isUserValid = [];
    for (let [key, value] of Object.entries(user)) {
        if (validateUserData(value, key)) {
            console.log(`${key}: Ok`);
            isUserValid.push(true);
        } else {
            console.log(`${key}: error`);
            isUserValid.push(false);
        }
    }
    if(!isUserValid.includes(false))
        return true;
    else
        return false;
    
}

function getUserData() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
    }
    return user;
}

function storeUserData(user) {
    const userSerialized = JSON.stringify(user);
    localStorage.setItem('user', userSerialized);
    console.log(localStorage);
}

function isUserInputEmpty(user) {
    if (user.firstname === ''
    || user.lastname === ''
    || user.username === ''
    || user.email === ''
    || user.password === '') {
        console.log('UserInputEmpty = true');
        err.innerHTML = 'Bitte f&uuml;llen Sie alle Felder aus';
        return true;
    }
    console.log('UserInputEmpty = false');
    return false;
}

function getUserDataFromStorage() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    console.log(user.firstname);
    console.log(user.lastname);
    console.log(user.username);
    console.log(user.email);
    console.log(user.password);
    return user;
}

function userExist(user) {
    let storedUser = getUserDataFromStorage(user);
    if (storedUser.username === user.username
    || storedUser.email === user.email) {
        console.log('User already exists');
        err.innerHTML = 'Benutzer existiert bereits';
        return true;
    } else {
        console.log('User does not exist');
        return false;
    }
}


function init() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const user = getUserData();
        if (!isUserInputEmpty(user)) {
            if (validateUser(user))
                if(!userExist(user))
                    storeUserData(user);
        }
    }, false);
}

document.addEventListener('DOMContentLoaded', init, false);
