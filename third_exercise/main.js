$(document).ready(function () {

    let timer_txt = $('#timer')[0];
    let mid_txt = $('.mid textarea');
    let bot_txt = $('.bot textarea');

    let errors = 0;
    let timer = null;
    let timeLeft = 60;

    timer_txt.textContent = timeLeft + "s";

    let curr_input;

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

        // get current input text and split it
        curr_input = bot_txt.value;
        curr_input_array = curr_input.split('');

        // increment total characters typed
        characterTyped++;

        errors = 0;

        quoteSpanArray = quote_text.querySelectorAll('span');
        quoteSpanArray.forEach((char, index) => {
            let typedChar = curr_input_array[index]

            // characters not currently typed
            if (typedChar == null) {
                char.classList.remove('correct_char');
                char.classList.remove('incorrect_char');

                // correct characters
            } else if (typedChar === char.innerText) {
                char.classList.add('correct_char');
                char.classList.remove('incorrect_char');

                // incorrect characters
            } else {
                char.classList.add('incorrect_char');
                char.classList.remove('correct_char');

                // increment number of errors
                errors++;
            }
        });

        // display the number of errors
        error_text.textContent = total_errors + errors;

        // update accuracy text
        let correctCharacters = (characterTyped - (total_errors + errors));
        let accuracyVal = ((correctCharacters / characterTyped) * 100);
        accuracy_text.textContent = Math.round(accuracyVal);

        // if current text is completely typed
        // irrespective of errors
        if (curr_input.length == current_quote.length) {
            updateQuote();

            // update total errors
            total_errors += errors;

            // clear the input area
            input_area.value = "";
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
        resetValues();
    }

    function resetValues(){
        timer_txt.textContent = 60 + 's';
        timeLeft = 60;
        errors = 0;
    }
    start();
});