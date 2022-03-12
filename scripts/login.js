const usernamePattern = /([a-z]|[A-Z]|[0-9]|\.|-|_)+/;
const err = document.getElementById('error-msg');



function getUserData() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const user = {
        username: username,
        password: password
    }
    return user;
}

function isUserInputEmpty(user) {
    if (user.username === ''
    || user.password === '') {
        console.log('UserInputEmpty = true')
        err.innerHTML = 'Bitte f&uuml;llen Sie alle Felder aus'
        return true;
    }
    console.log('UserInputEmpty = false')
    return false
}

function validateUser(username) {
    if (username.match(usernamePattern)) {
        console.log('username: Ok')
        return true;
    }
    console.log('username: error')
    err.innerHTML = 'Benutzername enth&auml;lt ung&uuml;ltige Zeichen'
    return false
}

function getUserObject(userObjectName) {
    let user = localStorage.getItem(userObjectName)
    user = JSON.parse(user)
    return user
}
function userExist(user) {
    if (localStorage.length === 0) {
        console.log('No users exist');
        return false
    }
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const userObject = getUserObject(key)
        if (userObject.username === user.username && userObject.password === md5(user.password)) {
            console.log('user valid')
            return true
        }
    }
    console.log('user invalid')
    return false
}

function init() {
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click', (event) => {
        event.preventDefault()
        err.style.color = 'red'
        const user = getUserData()
        if (!isUserInputEmpty(user)) {
            if (validateUser(user.username)) {
                if (userExist(user)) {
                    err.style.color = 'green'
                    err.innerHTML = 'Anmeldung erfolgreich'
                    window.location.href = './wordcounter.html'
                }
            }
        }

    }, false);
}

document.addEventListener('DOMContentLoaded', init, false)