var input = document.querySelectorAll('textarea')[0],
    characterCount = document.querySelector('#characterCount'),
    wordCount = document.querySelector('#wordCount');

input.addEventListener('keyup', function() {
    console.clear();
    characterCount.innerHTML = input.value.length;
    var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
    if (words) {
        wordCount.innerHTML = words.length;
    }
    else {
        wordCount.innerHTML = 0;
    }

    if (words) {
        var sentences = input.value.split(/[.|!|?]+/g);
        console.log(sentences);
        sentenceCount.innerHTML = sentences.length - 1;
    }
    else {
        sentenceCount.innerHTML = 0;
    }
});
