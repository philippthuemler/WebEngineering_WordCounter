const darkModeSwitch = document.getElementById('toggle-dark-mode')

darkModeSwitch.addEventListener('click', (event) => {
    darkModeSwitch.classList.toggle('active')
    document.body.classList.toggle('dark')
}, false)