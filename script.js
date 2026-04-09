let answer = 0;
let guessCount = 0;
const scores = [];

// Cache your elements to avoid reference errors
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn"); // Ensure this ID exists in HTML
const msg = document.getElementById("msg");
const guessInput = document.getElementById("guess");

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

function play() {
    let range = 0;
    let levels = document.getElementsByName("level");
    for (let i = 0; i < levels.length; i++) {
        if (levels[i].checked) {
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    
    // GENERATE THE ANSWER
    answer = Math.floor(Math.random() * range) + 1;
    
    msg.textContent = "Guess a number 1-" + range;
    guessCount = 0;
    guessBtn.disabled = false;
    // giveUpBtn.disabled = false; 
    playBtn.disabled = true;
}

function makeGuess() {
    let guess = parseInt(guessInput.value);
    if (isNaN(guess)) {
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;

    if (guess == answer) {
        msg.textContent = `Correct! It took ${guessCount} tries.`;
        updateScore(guessCount);
        resetGame();
    } else if (guess < answer) {
        msg.textContent = "Too low, try again.";
    } else {
        msg.textContent = "Too high, try again.";
    }
}

function updateScore(score) {
    scores.push(score);
    document.getElementById("wins").textContent = "Total wins: " + scores.length;
    
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i]; // Fixed from score[i]
    }
    
    document.getElementById("avgScore").textContent = "Average Score: " + (sum / scores.length).toFixed(1);
    
    scores.sort((a, b) => a - b);
    let lb = document.getElementsByName("leaderboard");
    for (let i = 0; i < lb.length; i++) {
        if (i < scores.length) {
            lb[i].textContent = scores[i];
        }
    }
}

function resetGame() {
    guessInput.value = ""; // Use .value for inputs
    guessBtn.disabled = true;
    // giveUpBtn.disabled = true;
    playBtn.disabled = false;
    
    let levels = document.getElementsByName("level");
    levels.forEach(l => l.disabled = false);
}
