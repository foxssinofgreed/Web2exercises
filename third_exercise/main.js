let timer_txt = $('#timer')[0];
let mid_txt = $('.mid textarea');
let bot_txt = $('.bot textarea')[0];
let error_txt = $('.errors')[0];
let correct_txt = $('.correct')[0];
let current_txt = $('.mid textarea')[0];
let last_total = $('.last_total')[0];
let total = $('.total')[0];

let errors = 0;
let total_errors = 0;
let timer = null;
let timeLeft = 60;
let characterTyped = 0;
let correct_chars = 0;
let total_correct = 0;

timer_txt.textContent = timeLeft + "s";

let best_score = 0;

if (getCookie('best_score') === null || getCookie('last_total') === null){
    document.cookie = 'last_total=' + 0 + ';';
    document.cookie = 'best_score=' + 0 + ';';
    total.textContent = getCookie('best_score');
    last_total.textContent = getCookie('last_total');
}
else {
    total.textContent = getCookie('best_score');
    last_total.textContent = getCookie('last_total');
}

function generateSen(){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://mashape-community-skate-ipsum.p.rapidapi.com/1/1/JSON",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b3c126d637msh7295f57279c0257p166243jsn03e2b89c6785",
            "x-rapidapi-host": "mashape-community-skate-ipsum.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        mid_txt.val(JSON.parse(response));
    });
}

function processCurrentText() {

    let curr_txt = current_txt.value;
    let curr_txt_arr = curr_txt.split('');

    // get current input text and split it
    let curr_input = bot_txt.value;
    let curr_input_array = curr_input.split('');

    // increment total characters typed
    characterTyped++;

    errors = 0;
    correct_chars = 0;

    curr_txt_arr.forEach((char, index) => {
        let typedChar = curr_input_array[index];

        if (typedChar === char) {
            correct_chars++;
        } else {
            errors++;
        }
    });

    // display the number of errors
    error_txt.textContent = total_errors + errors;

    // update accuracy text
    correct_txt.textContent = total_correct + correct_chars;

    if (best_score < correct_chars && getCookie('best_score') < correct_chars){
        best_score = correct_chars;
        document.cookie = 'best_score=' + best_score + ';';
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;

        timer_txt.textContent = timeLeft + "s";
    }
    else {
        // finish the game
        finishGame();
    }
}
function start(){
    resetValues();
    generateSen();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}
function finishGame() {
    clearInterval(timer);
    document.cookie = 'last_total=' + correct_chars + ';';
    resetValues();
}

function resetValues(){
    timer_txt.textContent = 60 + 's';
    timeLeft = 60;
    errors = 0;
    characterTyped = 0;
    mid_txt.val('');
    $('.bot textarea').val('');
    last_total.textContent = getCookie('last_total');
    total.textContent = getCookie('best_score');
}

function getCookie(name) {
    var fullName = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++){
        var c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(fullName) === 0) return c.substring(fullName.length,c.length);
    }
    return null;
}

function clearCookies(){
    document.cookie = 'best_score=' + 0 + ';';
    document.cookie = 'last_total=' + 0 + ';';
    last_total.textContent = getCookie('last_total');
    total.textContent = getCookie('best_score');
}