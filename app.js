/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentPlayer, roundScore, scores, winningScore, gamePlaying;
var gameRules =
  "GAME RULES:\n -The game has 2 players, playing in rounds.\n - In each turn, a player rolls two dices as many times as they whish. Sum of each dice gets added to the ROUND score.\n - BUT, if the player rolls a 1 on either of the dice, all his ROUND score gets lost. After that, it's the next player's turn.\n - The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.\n - The first player to reach winning score(players can set winning score for each game at the beginning of the match) on GLOBAL score wins the game";
init();

//Roll Dice button on click function
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" + dice + ".png";

    var dice2 = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".dice2").style.display = "block";
    document.querySelector(".dice2").src = "dice-" + dice2 + ".png";

    if (dice !== 1 && dice2 !== 1) {
      roundScore = roundScore + dice + dice2;
      document.getElementById(
        "current-" + currentPlayer
      ).textContent = roundScore;
    } else {
      roundScore = 0;
      changePlayer();
    }
  }
});

//Hold button on click function
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[currentPlayer] = scores[currentPlayer] + roundScore;
    roundScore = 0;

    document.getElementById("score-" + currentPlayer).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] >= winningScore) {
      document
        .querySelector(".player-" + currentPlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + currentPlayer + "-panel")
        .classList.remove("active");
      document.getElementById("name-" + currentPlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      gamePlaying = false;
    } else {
      changePlayer();
    }
  }
});

//New Game button on click function
document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector(".btn-rules").addEventListener("click", function() {
  window.alert(gameRules);
});

function init() {
  gamePlaying = true;
  currentPlayer = 0;
  roundScore = 0;
  scores = [0, 0];
  //Reset overall scores to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  //Reset current scores to 0
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Hide dice
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  setTimeout(function() {
    winningScore = window.prompt("Please enter the winning score");
  }, 1000);
}

function changePlayer() {
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //document.querySelector(".dice").style.display = "none";
}
