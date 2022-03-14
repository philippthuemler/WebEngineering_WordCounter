
const namePattern = /([A-Z]|Ä|Ö|Ü)([a-z]|ä|ö|ü|ß)+/g
const usernamePattern = /([a-z]|[A-Z]|[0-9]|\.|-|_)+/g
const emailPattern = /^([a-z]|[A-Z]|[0-9]|\.|_|-)*@([a-z]|[A-Z]|[0-9]|-)*\.([a-z]){2,3}$/g
let err = document.getElementById('error-msg')
err.style.color = 'red'
let userCount = 0
let userObjName = 'user'

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
            return true
            break
        default:
            return false
    }
}

function generateErrorMsg(key, extension = '') {
    const errorMsg = ''
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
                inputInvalidMsg = generateErrorMsg(key, ', ')
            err.innerHTML = inputInvalidMsg
        }
    }
    if(!isUserValid.includes(false))
        return true
    else
        return false
    
}

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

function storeUserData(user) {
    user.password = md5(user.password)
    const userSerialized = JSON.stringify(user)
    userCount++
    userObjName = userObjName.slice(0, 4)
    userObjName += userCount
    if (!iterateUsers().includes(userObjName)) {
        console.log(userObjName)
        localStorage.setItem(userObjName, userSerialized)
    }
}

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

function getUserObject(userObjectName) {
    let user = localStorage.getItem(userObjectName);
    user = JSON.parse(user)
    return user
}

function iterateUsers() {
    let existingUsers = []
    for (let i = 0; i < localStorage.length; i++) {
        existingUsers.push(localStorage.key(i))
    }
    console.log(existingUsers)
    return existingUsers
}

function userExist(user) {
    if (!(localStorage.length === 0)) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            const userObject = getUserObject(key)
            if (userObject.username === user.username || userObject.email === user.email) {
                console.log('User already exists')
                err.innerHTML = 'Benutzer existiert bereits'
                return true
            }
        }
        console.log('User did not exist')
        return false
    } else {
        console.log('No users existed')
        return false
    }
}


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
