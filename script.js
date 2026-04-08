// add javascript here
let answer = 0;
let guessCount = 0;
const scores = [];

document.getElementById("playBtn").addEventListener("click",play);
document.getElementById("guessBtn").addEventListener("click",makeGuess);

function play(){
    let range = 0;
    let levels = document.getElementsByName("level");
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    document.getElementById("msg").textContent = "Guess a number 1-" +range;
    guessCount = 0;

    guessBtn.disabled = false;
    GiveUpBtn.disabled = false;
    PlayBtn.disabled = true;
}


function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = "Correct! It took" + guessCount + "tries.";
         updateScore(guessCount);
          resetGame();
    }
    else if(guess < answer){
        msg.textContent = "Too low, try again.";
    }
    else{
        msg.textContent = "Too high, try again."
    }
    }

    function updateScore(score){
        scores.push(score);
        wins.textContent = "Total wins: " + scores.length;
        let sum = 0;
        for(let i=0; i<scores.length; i++){
            sum += score[i]; // sum = sum +scores[i]
        }
        avgScore.textContent = "Average Score: " + (sum/score.length).toFixed(1);

        scores.sort(function(a,b){return a-b;}); //sort score increasing

        let lb =document.getElementsByName("leaderboard");
        for(let i=0; i<lb.length; i++){
            if(i<scores.length){
                lb[i].textContent = scores[i];
            }
        }
    }
    function resetGame(){
        guess.textContent = "";
        guessBtn.disabled = true;
        giveUpBtn.disabled = true;
        PlayBtn.disabled = false;
        e.disabled = false;
        m.disabled = false;
        h.disabled = false;
    }
