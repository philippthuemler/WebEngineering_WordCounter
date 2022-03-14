const darkModeSwitch = document.getElementById('toggle-dark-mode')

/**
 * activates the darkmode on a website initially when changing the website and darkmode was activated on the previous website
 */
function activateDarkMode() {
    darkModeSwitch.classList.add('active')
    document.body.classList.add('dark')
    localStorage.setItem('darkmode', JSON.stringify(true))
}

/**
 * toggles the darkmode on a website when the darkmode switch gets clicked
 */
function toggleDarkMode() {
    darkModeSwitch.classList.toggle('active')
    document.body.classList.toggle('dark')
    localStorage.setItem('darkmode', JSON.stringify(!getDarkModeState()))
}

/**
 * stores the current darkmode state in localStorage
 * @param {boolean} state current darkmode state (activated: true; deactivated: false)
 */
function storeDarkModeState(state) {
    stateSerialized = JSON.stringify(state)
    localStorage.setItem('darkmode', stateSerialized)
}

/**
 * gets the darkmode state stored in localStorage
 * @returns true if darkmode was activated lastly and 'true' is stored in localStorage
 * @returns false if darkmode was deactivated lastly and 'false' is stored in localStorage
 */
function getDarkModeState() {
    let stateSerialized
    if(localStorage.getItem('darkmode') !== null) {
        stateSerialized = localStorage.getItem('darkmode')
        const state = JSON.parse(stateSerialized)
        return state
    } else {
        localStorage.setItem('darkmode', JSON.stringify(false))
        return false
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (getDarkModeState()) {
        activateDarkMode()
    }
}, false)

darkModeSwitch.addEventListener('click', (event) => {
    toggleDarkMode();
}, false)