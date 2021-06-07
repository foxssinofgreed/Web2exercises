let timer_txt = $('#timer')[0];
let mid_txt = $('.mid textarea');
let bot_txt = $('.bot textarea')[0];
let error_txt = $('.errors')[0];
let correct_txt = $('.correct')[0];
let current_txt = $('.mid textarea')[0];

let errors = 0;
let total_errors = 0;
let timer = null;
let timeLeft = 60;
let characterTyped = 0;
let correct_chars = 0;
let total_correct = 0;

timer_txt.textContent = timeLeft + "s";


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

    curr_txt = current_txt.value;
    curr_txt_arr = curr_txt.split('');
    console.log(curr_txt_arr);

    // get current input text and split it
    curr_input = bot_txt.value;
    curr_input_array = curr_input.split('');

    // increment total characters typed
    characterTyped++;

    errors = 0;
    correct_chars = 0;

    console.log(curr_txt_arr);

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
    resetValues();
}

function resetValues(){
    timer_txt.textContent = 60 + 's';
    timeLeft = 60;
    errors = 0;
    characterTyped = 0;
    mid_txt.val('');
    $('.bot textarea').val('');
}