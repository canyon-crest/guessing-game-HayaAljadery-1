let playerName = prompt("Enter your name:");
if (!playerName) {
  playerName = "Player";
}
playerName =
  playerName.charAt(0).toUpperCase() +
  playerName.slice(1).toLowerCase();


let answer = 0;
let range = 3;
let guessCount = 0;
let wins = 0;


let scores = [];
let winScores = [];
let roundTimes = [];
let fastestTime = 0;
let startMs = 0;


const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const msg = document.getElementById("msg");
const guessInput = document.getElementById("guess");
const winsDisplay = document.getElementById("wins");
const avgScoreDisplay = document.getElementById("avgScore");
const fastestDisplay = document.getElementById("fastest");
const avgTimeDisplay = document.getElementById("avgTime");
const dateDisplay = document.getElementById("date");

guessInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    makeGuess();
  }
});

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp); 


function getSuffix(day) {
  if (day === 11 || day === 12 || day === 13) {
    return "th";
  }
  if (day % 10 === 1) {
    return "st";
  }
  if (day % 10 === 2) {
    return "nd";
  }
  if (day % 10 === 3) {
    return "rd";
  }
  return "th";
}


function time() {
  let now = new Date();


  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  let month = months[now.getMonth()];
  let day = now.getDate();
  let year = now.getFullYear();


  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();


  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }


  return month + " " + day + getSuffix(day) + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
}


dateDisplay.textContent = time();
setInterval(function () {
  dateDisplay.textContent = time();
}, 1000);


function play() {
  let levels = document.getElementsByName("level");


  for (let i = 0; i < levels.length; i++) {
    if (levels[i].checked) {
      range = parseInt(levels[i].value);
    }
    levels[i].disabled = true;
  }


  answer = Math.floor(Math.random() * range) + 1;
  guessCount = 0;
  startMs = new Date().getTime();


  msg.textContent = playerName + ", guess a number from 1 to " + range + ".";
  guessInput.value = "";


  guessBtn.disabled = false;
  giveUpBtn.disabled = false;
  playBtn.disabled = true;
}


function makeGuess() {
  let guess = parseInt(guessInput.value);


  if (isNaN(guess)) {
    msg.textContent = playerName + ", please enter a valid number.";
    return;
  }


  guessCount++;


  if (guess === answer) {
    msg.textContent = playerName + ", correct! You got it in " + guessCount + " guesses.";
    wins++;
    updateScore(guessCount, true);
    updateTimers(new Date().getTime());
    guessBtn.disabled = true;
    reset();
    return;
  }


  let difference = Math.abs(guess - answer);
  let closeness = "";


  if (difference <= 2) {
    closeness = "hot";
  } else if (difference <= 5) {
    closeness = "warm";
  } else {
    closeness = "cold";
  }


  if (guess < answer) {
    msg.textContent = playerName + ", too low and " + closeness + ".";
  } else {
    msg.textContent = playerName + ", too high and " + closeness + ".";
  }
}


function updateScore(score, isWin) {
  scores.push(score);
  scores.sort(function (a, b) {
    return a - b;
  });


  if (isWin) {
    winScores.push(score);
  }


  winsDisplay.textContent = "Total wins: " + wins;


  if (winScores.length > 0) {
    let sum = 0;
    for (let i = 0; i < winScores.length; i++) {
      sum += winScores[i];
    }
    avgScoreDisplay.textContent = "Average Score: " + (sum / winScores.length).toFixed(0);
  } else {
    avgScoreDisplay.textContent = "Average Score: 0";
  }


  updateLeaderboard();
}


function updateLeaderboard() {
  let lb = document.getElementsByName("leaderboard");


  for (let i = 0; i < lb.length; i++) {
    if (i < scores.length) {
      lb[i].textContent = scores[i];
    } else {
      lb[i].textContent = "--";
    }
  }
}


function updateTimers(endMs) {
  let elapsed = (endMs - startMs) / 1000;
  roundTimes.push(elapsed);


  if (fastestTime === 0 || elapsed < fastestTime) {
    fastestTime = elapsed;
  }


  let sum = 0;
  for (let i = 0; i < roundTimes.length; i++) {
    sum += roundTimes[i];
  }


  let average = sum / roundTimes.length;


  fastestDisplay.textContent = "Fastest Game: " + fastestTime.toFixed(2);
  avgTimeDisplay.textContent = "Average Time: " + average.toFixed(2);
}


function reset() {
  guessInput.value = "";
  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  playBtn.disabled = false;


  let levels = document.getElementsByName("level");
  for (let i = 0; i < levels.length; i++) {
    levels[i].disabled = false;
  }
}


function giveUp() {
let giveUpScore = range;


  updateScore(giveUpScore, false);
  updateTimers(new Date().getTime());


  msg.textContent = playerName + ", you gave up. The correct number was " + answer + ".";


  guessBtn.disabled = true;
  giveUpBtn.disabled = true;
  playBtn.disabled = false;


  let levels = document.getElementsByName("level");
  for (let i = 0; i < levels.length; i++) {
    levels[i].disabled = false;
  }


  guessInput.value = "";
}
