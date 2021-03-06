const usernamePattern = /([a-z]|[A-Z]|[0-9]|\.|-|_)+/
const err = document.getElementById('error-msg')

/**
 * reads user input and stores it in the 'user' object
 * @returns user Object containing username and password
 */
function getUserData() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const user = {
        username: username,
        password: password
    }
    return user
}

/**
 * checks if the user did not fill in all textboxes
 * @param {Object} user Object containing username and password
 * @returns true if at least one textbox of the user input is empty
 * @returns false if no textbox of the user input is empty
 */
function isUserInputEmpty(user) {
    if (user.username === ''
    || user.password === '') {
        console.log('UserInputEmpty = true')
        err.innerHTML = 'Bitte f&uuml;llen Sie alle Felder aus'
        return true
    }
    console.log('UserInputEmpty = false')
    return false
}

/**
 * checks if the user input of the username is syntactically correct
 * @param {string} username user input of username
 * @returns true if username meets the pattern defined by the global regular expression 'usernamePattern'
 * @returns false if username does not meet the pattern defined by the global regular expression 'usernamePattern'
 */
function validateUser(username) {
    if (username.match(usernamePattern)) {
        console.log('username: Ok')
        return true
    }
    console.log('username: error')
    err.innerHTML = 'Benutzername enth&auml;lt ung&uuml;ltige Zeichen'
    return false
}

/**
 * gets a user object from localStorage
 * @param {string} userObjectName name of key in localStorage assigned to the user information
 * @returns user Object assigned to the key
 */
function getUserObject(userObjectName) {
    let user = localStorage.getItem(userObjectName)
    user = JSON.parse(user)
    return user
}

/**
 * checks if a user with the same username and password as the user's input exists in localStorage
 * @param {Object} user Object containing username and password
 * @returns true if a user with the same username and password as the user's input exists in localStorage
 * @returns false if localStorage is empty or no user with the same username and password as the user's input exists in localStorage
 */
function userExist(user) {
    if (localStorage.length === 0) {
        console.log('No users exist');
        return false
    }
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.slice(0, 4) === 'user') {
            const userObject = getUserObject(key)
            if (userObject.username === user.username && userObject.password === md5(user.password)) {
                console.log('user valid')
                return true
            }
        }
    }
    console.log('user invalid')
    return false
}

/**
 * creates EventListener for the submit button and checks if the user's input is correct and valid in which case he gets send to the main page (wordcount.html)
 */
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
                    window.location.href = './wordcount.html'
                } else {
                    err.innerHTML = 'Benutzername oder Passwort ist falsch'
                }
            }
        }

    }, false);
}

document.addEventListener('DOMContentLoaded', init, false)