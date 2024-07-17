let mainGame = document.querySelector("main");
let turnCounter = document.querySelector("h5.turn-counter");
let introForm = document.querySelector("form");

let hardDifficulty = document.getElementById("hardDiff");
let medDifficulty = document.getElementById("medDiff");

let symbolDiv;
let iconSymbol;

let symbolArrayEasy = ["🌠", "🏹", "🏹", "💌", "🍀", "🌠", "🍀", "💌"];
let symbolArrayMedium = [
  "🌠",
  "🏹",
  "⌛",
  "🏹",
  "💌",
  "❤️️",
  "🍀",
  "🌠",
  "🍀",
  "💌",
  "❤️️",
  "⌛",
];
let symbolArrayHard = [
  "🌠",
  "🏠",
  "🏹",
  "⌛",
  "🏹",
  "💌",
  "❤️️",
  "🍀",
  "🧲️",
  "🌠",
  "🍀",
  "💌",
  "❤️️",
  "⌛",
  "🧲️",
  "🏠",
];

let counter = 0;
let clicked = [];
let pairs = [];

function createBase(symbols) {
  for (let i = symbols.length; i > 0; i--) {
    let createDiv = document.createElement("div");
    createDiv.setAttribute("class", "cardDiv");
    let createIcon = document.createElement("p");
    mainGame.appendChild(createDiv);
    createDiv.appendChild(createIcon);
    const randSelector = Math.floor(Math.random() * i);
    createIcon.textContent = symbols[randSelector];
    symbols.splice(randSelector, 1);
  }
}

function theGame() {
  symbolDiv = document.querySelectorAll("div.cardDiv");
  iconSymbol = document.querySelectorAll("p");

  iconSymbol.forEach((item) => (item.style.visibility = "hidden"));

  for (let i = 0; i < symbolDiv.length; i++) {
    symbolDiv[i].addEventListener("click", () => {
      if (iconSymbol[i].style.visibility === "hidden") {
        iconSymbol[i].style.visibility = "visible";

        counter += 1;
        clicked.push(iconSymbol[i]);
        turnCounter.textContent = "Moves: " + clicked.length;

        for (let j = 1; j < clicked.length; j += 2) {
          let plusJ = j - 1;
          if (
            clicked[j].textContent === clicked[plusJ].textContent &&
            !pairs.includes(clicked[j])
          ) {
            pairs.push(clicked[j]);
            pairs.push(clicked[plusJ]);
            counter = 0;
          }

          pairs.forEach((item) => (item.style.visibility = "visible"));

          if (pairs.length === symbolDiv.length) {
            showWinMessage();
          }

          if (counter > 2) {
            iconSymbol.forEach((item) => (item.style.visibility = "hidden"));
            counter = 1;
            iconSymbol[i].style.visibility = "visible";
          }
        }
      }
      manageTurns();
    });
  }
}

function manageTurns() {
  let selectedMoveCount = document.querySelector(`[name="diff"]:checked`).value;
  if (selectedMoveCount !== "unlimited" && selectedMoveCount < clicked.length) {
    showLoseMessage();
  }
}

function showWinMessage() {
  winMsg = document.createElement("h1");
  winMsg.setAttribute("class", "win-message");
  document.body.append(winMsg);
  results.won += 1;
  results.bestTime = `${minutesToShow}:${secondsToShow}`;
  localStorage.setItem("personalResults", JSON.stringify(results));
  clearInterval(intervalTimer);
  winMsg.textContent = "WIN! " + "Moves: " + clicked.length;
  turnCounter.style.display = "none";
}

function showLoseMessage() {
  let loseMsg = document.createElement("h2");
  loseMsg.setAttribute("class", "lose-message");
  loseMsg.textContent = "LOST";
  turnCounter.style.display = "none";
  results.lost += 1;
  localStorage.setItem("personalResults", JSON.stringify(results));
  clearInterval(intervalTimer);
  document.body.append(loseMsg);
  // setTimeout(function () {
  //   location.reload();
  // }, 5000);
}

introForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let selectedBoardSize = document.querySelector(
    `[name="boardSize"]:checked`
  ).value;

  introForm.style.display = "none";
  mainGame.style.display = "flex";

  createBase(
    selectedBoardSize === "smallBoard"
      ? symbolArrayEasy
      : selectedBoardSize === "medBoard"
      ? symbolArrayMedium
      : symbolArrayHard
  );
  theGame();
  countTime();
});

let intervalTimer;
let minutes = 0;
let seconds = 0;
let secondsToShow;
let minutesToShow;

function countTime() {
  intervalTimer = setInterval(function () {
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    }
    secondsToShow = seconds < 10 ? `0${seconds}` : seconds;
    minutesToShow = minutes < 10 ? `0${minutes}` : minutes;

    let selectedTimeLimit = document.querySelector(
      `[name="time"]:checked`
    ).value;

    if (Number(selectedTimeLimit) === seconds) {
      showLoseMessage();
      clearInterval();
    }

    document.querySelector(
      ".timer"
    ).textContent = `Time:  ${minutesToShow}:${secondsToShow}`;
  }, 1000);
}

function resetGame() {
  if (minutes > 0) {
    minutes = -1;
  }
  seconds = -1;
  counter = 0;
  clicked = [];
  pairs = [];
  turnCounter.textContent = "Moves: 0";
  iconSymbol.forEach((item) => (item.style.visibility = "hidden"));
}

document.querySelector(".reset-button").addEventListener("click", () => {
  resetGame();
});

///////// Personal results @ local storage

let results;

function loadResults() {
  results =
    window.localStorage.length > 0
      ? JSON.parse(localStorage.getItem("personalResults"))
      : { won: 0, lost: 0, bestTime: 0 };
  console.log(results.bestTime);
}
loadResults();

document.querySelector(
  ".testShowResults"
).textContent = `WON: ${results.won}, LOST: ${results.lost} BEST TIME: ${results.bestTime}`;
