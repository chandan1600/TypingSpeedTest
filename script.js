const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function zero(time){
    if(time<=9){
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function beginTimer(){
    let currentTime = zero(timer[0]) + ":" + zero(timer[1]) + ":" + zero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0]= Math.floor((timer[3]/100/60));
    timer[1]= Math.floor((timer[3]/100)-(timer[0]*60))
    timer[2]= Math.floor((timer[3]) - (timer[1]*100) - (timer[0]*6000))
}

// Match the text entered with the provided text on the page:
function spellChecker(){
    let enteredText = testArea.value;
    let matchOriginText = originText.substring(0, enteredText.length);

    if(enteredText == originText){
        testWrapper.style.borderColor = "#32CD32";
        clearInterval(interval);
    }
    else{
        if(enteredText == matchOriginText){
            testWrapper.style.borderColor = "#1E90FF";
        } else{
        testWrapper.style.borderColor = "#FFA500";
        }
    }
}

// Start the timer:
function startTimer(){
    let textTypedLength = testArea.value.length;
    if(textTypedLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(beginTimer,10);
    }
    
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",startTimer,false);
testArea.addEventListener("keyup", spellChecker, false)
resetButton.addEventListener("click", reset, false)