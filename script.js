"use strict";

///////////////////////////////variables////////////////////////////////////////

//variables for player 1
let playerOneCurrentScore = 0;
let playerOneScore = 0;

//variables for player 2
let playerTwoCurrentScore = 0;
let playerTwoScore = 0;

//variables - player elements
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");

//variables - button elements
const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//variables - dice element
const imageDiceValue = document.querySelector(".dice");

//variables for current and total score for player 1
const playerOneTotalScoreElement = document.querySelector("#score--0");
const playerOneCurrentScoreElement = document.querySelector("#current--0");

//variables for current and total score for player 2
const playerTwoTotalScoreElement = document.querySelector("#score--1");
const playerTwoCurrentScoreElement = document.querySelector("#current--1");

//variable array elements
const scores = document.querySelectorAll(".score");
const currentScores = document.querySelectorAll(".current-score");
const players = document.querySelectorAll(".player");

//////////////////////////////////variables//////////////////////////////////

//////////////////////////////////functions/////////////////////////////////

//roll the dice function

const rollDice = function () {
  if (isScoreLess(playerOneScore, playerTwoScore)) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    displayDice(diceValue);
    playerContinue(diceValue);
  }
};

//display functions

const displayDice = function (dice) {
  switch (dice) {
    case 1:
      imageDiceValue.src = "dice-1.png";
      break;
    case 2:
      imageDiceValue.src = "dice-2.png";
      break;
    case 3:
      imageDiceValue.src = "dice-3.png";
      break;
    case 4:
      imageDiceValue.src = "dice-4.png";
      break;
    case 5:
      imageDiceValue.src = "dice-5.png";
      break;
    case 6:
      imageDiceValue.src = "dice-6.png";
      break;
    default:
      break;
  }
};

const displayCurrentScore = function (element, currentScore) {
  element.textContent = currentScore;
};

const displayTotalScore = function (element, totalScore) {
  element.textContent = totalScore;
};

//check player to continue function

const playerContinue = function (diceValue) {
  if (diceValue !== 1) {
    if (isPlayerActive(playerOne)) {
      playerOneCurrentScore += diceValue;
      displayCurrentScore(playerOneCurrentScoreElement, playerOneCurrentScore);
    } else {
      playerTwoCurrentScore += diceValue;
      displayCurrentScore(playerTwoCurrentScoreElement, playerTwoCurrentScore);
    }
  } else {
    if (isPlayerActive(playerOne)) {
      playerOneCurrentScore = 0;
      displayCurrentScore(playerOneCurrentScoreElement, playerOneCurrentScore);
      deactivatePlayer(playerOne);
      activatePlayer(playerTwo);
    } else {
      playerTwoCurrentScore = 0;
      displayCurrentScore(playerTwoCurrentScoreElement, playerTwoCurrentScore);
      deactivatePlayer(playerTwo);
      activatePlayer(playerOne);
    }
  }
};

//hold function

const holdScore = function () {
  if (isScoreLess(playerOneScore, playerTwoScore)) {
    if (isPlayerActive(playerOne)) {
      playerOneScore += playerOneCurrentScore;
      displayTotalScore(playerOneTotalScoreElement, playerOneScore);
      playerOneCurrentScore = 0;
      displayCurrentScore(playerOneCurrentScoreElement, playerOneCurrentScore);
      if (isScoreEnough(playerOneScore)) {
        setWinner(playerOne);
      } else {
        deactivatePlayer(playerOne);
        activatePlayer(playerTwo);
      }
    } else {
      playerTwoScore += playerTwoCurrentScore;
      displayTotalScore(playerTwoTotalScoreElement, playerTwoScore);
      playerTwoCurrentScore = 0;
      displayCurrentScore(playerTwoCurrentScoreElement, playerTwoCurrentScore);
      if (isScoreEnough(playerTwoScore)) {
        setWinner(playerTwo);
      } else {
        deactivatePlayer(playerTwo);
        activatePlayer(playerOne);
      }
    }
  }
};

// reset function
const resetGame = function () {
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = 0;
  }
  for (let i = 0; i < currentScores.length; i++) {
    currentScores[i].textContent = 0;
  }

  //reset active player to player 1
  activatePlayer(playerOne);
  deactivatePlayer(playerTwo);

  //reset winners
  resetWinner(playerOne);
  resetWinner(playerTwo);

  //reset current/total scores to zero
  playerOneCurrentScore = 0;
  playerOneScore = 0;
  playerTwoCurrentScore = 0;
  playerTwoScore = 0;
};

//add/remove classlist functions
const activatePlayer = function (element) {
  element.classList.add("player--active");
};

const deactivatePlayer = function (element) {
  element.classList.remove("player--active");
};

const setWinner = function (element) {
  element.classList.add("player--winner");
};

const resetWinner = function (element) {
  element.classList.remove("player--winner");
};

const isPlayerActive = function (element) {
  return element.classList.contains("player--active");
};

const isPlayerWinner = function (element) {
  element.classList.contains("player--winner");
};

// check score if < 100 function

const isScoreLess = function (playerOneScore, playerTwoScore) {
  return playerOneScore < 100 && playerTwoScore < 100;
};

// check score if >= 100 function

const isScoreEnough = function (playerScore) {
  return playerScore >= 100;
};

////////////////////////////////////////////////functions////////////////////////

/////////////////////////////////////////////////DOM/////////////////////////////

btnNewGame.addEventListener("click", resetGame);
btnRollDice.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);

////////////////////////////////////////////////DOM/////////////////////////////////
