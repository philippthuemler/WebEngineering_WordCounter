
const namePattern = /([A-Z]|Ä|Ö|Ü)([a-z]|ä|ö|ü|ß)+/g
const usernamePattern = /^([a-z]|[A-Z]|[0-9]|\.|-|_)+$/g
const emailPattern = /^([a-z]|[A-Z]|[0-9]|\.|_|-)*@([a-z]|[A-Z]|[0-9]|-)*\.([a-z]){2,3}$/g
let err = document.getElementById('error-msg')
err.style.color = 'red'
let userCount = 0
let userObjName = 'user'

/**
 * checks if the respective user input is syntactically correct
 * @param {string} input value of the user Object assigned to the key which is represented by 'type'
 * @param {string} type key of the user Object assigned to the value represented by 'input'
 * @returns true if the input matches the respective pattern
 * @returns false if the input does not match the respective pattern
 */
function validateUserData(input, type) {
    switch (type) {
        case ('firstname'):
            // firstname validation
            if(input.match(namePattern))
                return true
            break
        case ('lastname'):
            // lastname validation
            if(input.match(namePattern))
                return true
            break
        case ('username'):
            // username validation
            if(input.match(usernamePattern))
                return true
            break
        case ('email'):
            // email validation
            if(input.match(emailPattern))
                return true
            break
        case ('password'):
            // password validation
            // password can be anything -> no validation
            return true
            break
        default:
            return false
    }
    return false
}

/**
 * generates an error message for every wrong input with optional delimiter between the outputs
 * @param {string} key key of the user Object
 * @param {string} extension string to be put before the next output if there are multiple outputs -> delimiter
 * @returns string of error message
 */
function generateErrorMsg(key, extension = '') {
    let errorMsg = ''
    switch (key) {
        case ('firstname'):
            errorMsg += 'Vorname falsch'
            break
        case ('lastname'):
            errorMsg += 'Nachname falsch'
            break
        case ('username'):
            errorMsg += 'Benutzername falsch'
            break
        case ('email'):
            errorMsg += 'Email falsch'
            break
        case ('password'):
            errorMsg += 'Passwort falsch'
            break
        default:
            errorMsg = `${key} falsch`
            break
    }
    return (extension + errorMsg)
}

/**
 * checks if one or multiple user inputs are syntactically incorrect in which case prints an error message
 * @param {Object} user Object containing all registration relevant data
 * @returns true if all user inputs are syntactically correct
 * @returns false one or multiple user inputs are syntactically incorrect
 */
function validateUser(user) {
    let isUserValid = []
    let inputInvalidMsg = ''
    console.clear()
    for (let [key, value] of Object.entries(user)) {
        if (validateUserData(value, key)) {
            console.log(`${key}: Ok`)
            isUserValid.push(true)
        } else {
            console.log(`${key}: error`)
            isUserValid.push(false)
            if(inputInvalidMsg === '')
                inputInvalidMsg = generateErrorMsg(key)
            else
                inputInvalidMsg += generateErrorMsg(key, ', ')
        }
    }
    err.innerHTML = inputInvalidMsg
    if(!isUserValid.includes(false))
        return true
    else
        return false
    
}

/**
 * reads the user's input written into textboxes and stores it in an object
 * @returns user Object with the user's input of the registration relevant data
 */
function getUserData() {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const user = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
    }
    return user
}

/**
 * stores a user Object in localStorage with a unique key and a hashed password
 * @param {Object} user Object containing all registration relevant data
 */
function storeUserData(user) {
    user.password = md5(user.password)
    const userSerialized = JSON.stringify(user)
    userCount++
    userObjName = userObjName.slice(0, 4)
    userObjName += userCount
    do {
        userCount++
        userObjName = userObjName.slice(0, 4)
        userObjName += userCount
    } while (iterateUsers().includes(userObjName))
    console.log(userObjName + 'hinzugefügt')
    localStorage.setItem(userObjName, userSerialized)
}

/**
 * checks if any user input into the textboxes is empty
 * @param {Object} user Object containing all registration relevant data
 * @returns true if one or multiple inputs are empty
 * @returns false if no user input is empty
 */
function isUserInputEmpty(user) {
    if (user.firstname === ''
    || user.lastname === ''
    || user.username === ''
    || user.email === ''
    || user.password === '') {
        console.log('UserInputEmpty = true')
        err.innerHTML = 'Bitte f&uuml;llen Sie alle Felder aus';
        return true;
    }
    console.log('UserInputEmpty = false')
    return false
}

/**
 * gets a user object from localStorage
 * @param {string} userObjectName name of the unique key indicating a user object in localStorage
 * @returns user Object indicated by the key represented by userObjectName
 */
function getUserObject(userObjectName) {
    let user = localStorage.getItem(userObjectName);
    user = JSON.parse(user)
    return user
}

/**
 * iterates over localStorage and get every existing user object
 * @returns Array containing every existing user in localStorage
 */
function iterateUsers() {
    let existingUsers = []
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i).slice(0, 4) === 'user')
            existingUsers.push(localStorage.key(i))
    }
    console.log(existingUsers)
    return existingUsers
}

/**
 * checks if a user with the same username and email as the user's input exists in localStorage
 * @param {Object} user Object containing all registration relevant data
 * @returns true if a user with the same username and email as the user's input already exists in localStorage
 * @returns false if localStorage is empty or no user with the same username and email as the user's input exists in localStorage
 */
function userExist(user) {
    if (!(localStorage.length === 0)) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key.slice(0, 4) === 'user') {
                const userObject = getUserObject(key)
                if (userObject.username === user.username || userObject.email === user.email) {
                    console.log('User already exists')
                    err.innerHTML = 'Benutzer existiert bereits'
                    return true
                }
            }
        }
        console.log('User did not exist')
        return false
    } else {
        console.log('No users existed')
        return false
    }
}

/**
 * creates EventListener for the submit button and checks if the user input is valid and if the user can be stored in localStoraged, thus does not exist already in which case he gets send to the login page (login.html)
 */
function init() {
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click', (event) => {
        event.preventDefault()
        err.style.color = 'red'
        const user = getUserData()
        if (!isUserInputEmpty(user)) {
            if (validateUser(user)) {
                if(!userExist(user)) {
                    storeUserData(user)
                    err.style.color = 'green'
                    err.innerHTML = 'Benutzer gespeichert'
                    window.location.href = './login.html'
                }
            }
        }
    }, false);
}

document.addEventListener('DOMContentLoaded', init, false)
