const darkModeSwitch = document.getElementById('toggle-dark-mode')

function activateDarkMode() {
    darkModeSwitch.classList.add('active')
    document.body.classList.add('dark')
    localStorage.setItem('darkmode', JSON.stringify(true))
}

function toggleDarkMode() {
    darkModeSwitch.classList.toggle('active')
    document.body.classList.toggle('dark')
    localStorage.setItem('darkmode', JSON.stringify(!getDarkModeState()))
}

function storeDarkModeState(state) {
    stateSerialized = JSON.stringify(state)
    localStorage.setItem('darkmode', stateSerialized)
}

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