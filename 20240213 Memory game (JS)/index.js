let mainGame = document.querySelector(".main-game-board");
let turnCounter = document.querySelector("h5.turn-counter");
let introForm = document.querySelector("form");

let hardDifficulty = document.getElementById("hardDiff");
let medDifficulty = document.getElementById("medDiff");

let symbolDiv;
let iconSymbol;

let symbols = {
  symbolArrayEasy: ["🌠", "🏹", "🏹", "💌", "🍀", "🌠", "🍀", "💌"],
  symbolArrayMedium: [
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
  ],
  symbolArrayHard: [
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
  ],
};

let counter = 0;
let clicked = [];
let pairs = [];

function createBase(symbols) {
  let testFlipCard = document.querySelector(".flip-card");

  for (let i = symbols.length; i > 0; i--) {
    let createIcon = document.createElement("p");
    const randSelector = Math.floor(Math.random() * i);
    createIcon.textContent = symbols[randSelector];
    symbols.splice(randSelector, 1);

    let newFlipCard = testFlipCard.cloneNode(true);
    mainGame.appendChild(newFlipCard);

    newFlipCard.classList.add(`flip-class-${i}`);
    let newFlipCardBack = document.querySelector(
      `.flip-class-${i}  .flip-card-back`
    );
    newFlipCardBack.appendChild(createIcon);
    newFlipCard.style.visibility = "visible";
  }
}

///
///
///
///
///
///

function theGame() {
  symbolDiv = document.querySelectorAll("div.flip-card .flip-card-inner");

  for (let i = 0; i < symbolDiv.length; i++) {
    symbolDiv[i].addEventListener("click", () => {
      flipCardBack(symbolDiv[i]);
      iconSymbol = symbolDiv[i].querySelector("p");

      counter += 1;
      clicked.push(symbolDiv[i]);
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

        // if (pairs.length === symbolDiv.length - 1) {
        //   showWinMessage();
        // }

        pairs.forEach((item) => {
          item.classList.remove("flipped-front");
          item.classList.remove("flipped-back");
        });

        if (counter > 2) {
          let openCards = document.querySelectorAll(".flipped-back");
          openCards.forEach((item) => flipCardFront(item));
          counter = 1;
          flipCardBack(symbolDiv[i]);
        }
      }
      manageTurns();
    });
  }
}

function flipCardBack(target) {
  target.style.transform = "rotateY(180deg)";
  target.classList.add("flipped-back");

  let targetClasses = Array.from(target.classList);

  if (targetClasses.includes("flipped-front")) {
    target.classList.remove("flipped-front");
  }
}

function flipCardFront(target) {
  target.style.transform = "rotateY(0deg)";
  target.classList.add("flipped-front");

  let targetClasses = Array.from(target.classList);

  if (targetClasses.includes("flipped-back")) {
    target.classList.remove("flipped-back");
  }
}

function manageTurns() {
  let selectedMoveCount = document.querySelector(`[name="diff"]:checked`).value;

  if (pairs.length === symbolDiv.length - 1) {
    showWinMessage();
  } else if (
    selectedMoveCount !== "unlimited" &&
    selectedMoveCount < clicked.length
  ) {
    showLoseMessage();
  }
}

function showWinMessage() {
  let message = document.createElement("h2");
  let time = document.createElement("h3");
  let moves = document.createElement("h3");
  let checkTime = compareTime();

  message.textContent = "WON!";

  checkTime
    ? (time.textContent = `Time: ${minutesToShow}:${secondsToShow}. NEW BEST!`)
    : (time.textContent = `Time: ${minutesToShow}:${secondsToShow}.`);
  moves.textContent = `Moves: ${clicked.length}`;

  if (checkTime) {
    results.bestTime = `${minutesToShow}:${secondsToShow}`;
  }

  console.log(checkTime);

  let gameResults = [moves, time, message];

  gameResults.forEach((item) => {
    document.querySelector(".resultScreenBox").append(item);
  });

  turnCounter.style.display = "none";
  results.won += 1;
  localStorage.setItem("personalResults", JSON.stringify(results));
  clearInterval(intervalTimer);
  document.querySelector(".resultScreen").style.display = "flex";
}

function showLoseMessage() {
  let message = document.createElement("h2");
  let time = document.createElement("h3");
  let moves = document.createElement("h3");

  message.textContent = "LOST!";
  time.textContent = `Time: ${minutesToShow}:${secondsToShow}`;
  moves.textContent = `Moves: ${clicked.length}`;

  let gameResults = [moves, time, message];

  gameResults.forEach((item) => {
    document.querySelector(".resultScreenBox").append(item);
  });

  turnCounter.style.display = "none";
  results.lost += 1;
  localStorage.setItem("personalResults", JSON.stringify(results));
  clearInterval(intervalTimer);
  document.querySelector(".resultScreen").style.display = "flex";
}

introForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let selectedBoardSize = document.querySelector(
    `[name="boardSize"]:checked`
  ).value;

  introForm.style.display = "none";
  mainGame.style.display = "block";
  document.querySelector(".game-result-board").style.display = "flex";

  createBase(
    selectedBoardSize === "smallBoard"
      ? symbols.symbolArrayEasy
      : selectedBoardSize === "medBoard"
      ? symbols.symbolArrayMedium
      : symbols.symbolArrayHard
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
  }, 100);
}

function resetGame() {
  minutes = 0;
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
}
loadResults();
console.log(results);

function renderBestResults() {
  let resultsDiv = document.querySelector(".testShowResults");
  let resultsKeys = Object.keys(results);
  resultsKeys.forEach((key) => {
    let resultLine = document.createElement("h5");
    resultsDiv.appendChild(resultLine);
    resultLine.setAttribute("class", `result-${key}`);
  });
  document.querySelector(".result-won").innerText = `WON: ${results.won}`;
  document.querySelector(".result-lost").innerText = `LOST: ${results.lost}`;
  document.querySelector(
    ".result-bestTime"
  ).innerText = `BEST TIME: ${results.bestTime}`;
}

renderBestResults();

document.querySelector(
  ".testShowResults"
).textContent = `WON: ${results.won}, LOST: ${results.lost} BEST TIME: ${results.bestTime}`;

function compareTime() {
  let currentBestTime = results.bestTime;
  let isTimeBetter = true;
  if (currentBestTime !== 0) {
    const currentBestSplit = currentBestTime.split(":");
    let bestSplitNumber = currentBestSplit.map((item) => (item = Number(item)));

    let bestTimeInSeconds = bestSplitNumber[0] * 60 + bestSplitNumber[1];
    let currentTimeInSeconds = minutes * 60 + seconds;
    console.log("currentTimeInSeconds", currentTimeInSeconds);
    console.log("bestTimeInSeconds", bestTimeInSeconds);

    bestTimeInSeconds > currentTimeInSeconds
      ? (isTimeBetter = true)
      : (isTimeBetter = false);
  }
  return isTimeBetter;
}

compareTime();
