let mainGame = document.querySelector("main");
let turnCounter = document.querySelector("h5.turn-counter");
let introForm = document.querySelector("form");

let hardDifficulty = document.getElementById("hardDiff");
let medDifficulty = document.getElementById("medDiff");

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
  const symbolDiv = document.querySelectorAll("div.cardDiv");
  const iconSymbol = document.querySelectorAll("p");

  // iconSymbol.forEach((item) => (item.style.display = "none"));
  iconSymbol.forEach((item) => (item.style.visibility = "hidden"));

  for (let i = 0; i < symbolDiv.length; i++) {
    symbolDiv[i].addEventListener("click", () => {
      // if (iconSymbol[i].style.display === "none")
      if (iconSymbol[i].style.visibility === "hidden") {
        // iconSymbol[i].style.display = "block";
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

          // pairs.forEach((item) => (item.style.display = "block"));
          pairs.forEach((item) => (item.style.visibility = "visible"));

          if (pairs.length === symbolDiv.length) {
            showWinMessage();
          }

          if (counter > 2) {
            // iconSymbol.forEach((item) => (item.style.display = "none"));
            iconSymbol.forEach((item) => (item.style.visibility = "hidden"));

            counter = 1;
            // iconSymbol[i].style.display = "block";

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
  winMsg.textContent = "WIN! " + "Moves: " + clicked.length;
  turnCounter.style.display = "none";
}

function showLoseMessage() {
  let loseMsg = document.createElement("h2");
  loseMsg.setAttribute("class", "lose-message");
  loseMsg.textContent = "LOST";
  turnCounter.style.display = "none";
  document.body.append(loseMsg);
  setTimeout(function () {
    location.reload();
  }, 2500);
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

let minutes = 0;
let seconds = 0;

function countTime() {
  setInterval(function () {
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    }
    let secondsToShow = seconds < 10 ? `0${seconds}` : seconds;
    let minutesToShow = minutes < 10 ? `0${minutes}` : minutes;

    document.querySelector(
      ".timer"
    ).textContent = `Time:  ${minutesToShow}:${secondsToShow}`;
  }, 1000);
}

/// TODO: 1. Pataisyti, kad atspėjus pirmą kartą taip pat užsifiksuotų. +++ +++
/// TODO: 2. WIN alert. +++ +++
/// TODO: 3. Timer. (setInterval). +++ +++
/// TODO: 4. Difficulty setting. +++ +++
/// TODO: 5. Reset button.
/// TODO: 6. Cardflip (css).
/// TODO: 7. Prisidėti klases stiliams. +++ +++
/// TODO: 8. Paoptimizuoti kodą.
/// TODO: 9. Kortelių skaičiaus pasirinkimas. +++ +++
/// TODO: 10. Laiko limito pasirinkimas.
