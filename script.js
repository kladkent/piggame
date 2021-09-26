"use strict";

// button elements variables
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// player elements variables
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//dice element
const diceEl = document.querySelector(".dice");

//global variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

//hide dice - initial state
diceEl.classList.add("hidden");

//functions

const displayCurrentScore = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const displayScore = function () {
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

const switchPlayer = function () {
  //1. reset current score to 0
  currentScore = 0;
  //2. display current score
  displayCurrentScore();
  //3. Change active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //4. Change CSS style
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const displayAlert = function () {
  alert(
    `player ${
      activePlayer + 1
    } - You can't hold current score zero. Roll the dice first`
  );
};

//user roll dice
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    //generate random dice and save to a variable
    const dice = Math.trunc(Math.random() * 6) + 1;
    //unhide dice element and display dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //condition if dice roll === 1
    if (dice === 1) {
      //switch player
      switchPlayer();
    } else {
      //add dice roll to current score of active player
      currentScore += dice;
      //display current score
      displayCurrentScore();
    }
  }
});

//hold button
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    if (currentScore !== 0) {
      //add current score to total score
      scores[activePlayer] += currentScore;
      // display score
      displayScore();
      // if score is >= 20
      if (scores[activePlayer] >= 100) {
        // current player wins
        // 1. add class player--win - CSS style
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        // 2. remove class player--active
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");
        // 3. set isPlaying to false
        isPlaying = false;
        // 4. hide dice
        diceEl.classList.add("hidden");
        // 5. set current score to 0
        currentScore = 0;
        // 6. Display current Score
        displayCurrentScore();
      } else {
        //switch player
        switchPlayer();
      }
    } else {
      displayAlert();
    }
  }
});

// new game
btnNew.addEventListener("click", function () {
  // remove class player-winner class
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  //reset variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  // add class player--active
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  // display score values
  for (let i = 0; i < scores.length; i++) {
    document.querySelectorAll(".score")[i].textContent = scores[1];
  }
});
