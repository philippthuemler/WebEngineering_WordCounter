let input = document.querySelectorAll('textarea')[0],
    characterCount = document.querySelector('#characterCount'),
    wordCount = document.querySelector('#wordCount');

input.addEventListener('keyup', function() {
    console.clear();
    characterCount.innerHTML = input.value.length;
    let words = input.value.match(/\b[-?(\w+)?]+[".", ",", ":", ";", "!", "?", " ", "\n"]/gi);
    if (words) {
        wordCount.innerHTML = words.length;
    }
    else {
        wordCount.innerHTML = 0;
    }
});
