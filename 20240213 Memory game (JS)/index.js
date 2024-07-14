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

  iconSymbol.forEach((item) => (item.style.display = "none"));

  for (let i = 0; i < symbolDiv.length; i++) {
    symbolDiv[i].addEventListener("click", () => {
      if (iconSymbol[i].style.display === "none") {
        iconSymbol[i].style.display = "block";
        counter += 1;
        clicked.push(iconSymbol[i]);
        turnCounter.textContent = "Moves: " + clicked.length;

        for (let j = 1; j < clicked.length; j += 2) {
          let plusJ = j - 1;
          console.log(j);
          if (
            clicked[j].textContent === clicked[plusJ].textContent &&
            !pairs.includes(clicked[j])
          ) {
            pairs.push(clicked[j]);
            pairs.push(clicked[plusJ]);
            counter = 0;
          }

          pairs.forEach((item) => (item.style.display = "block"));
          console.log("Pairs", pairs);

          if (pairs.length === symbolDiv.length) {
            showWinMessage();
          }

          if (counter > 2) {
            iconSymbol.forEach((item) => (item.style.display = "none"));
            counter = 1;
            iconSymbol[i].style.display = "block";
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

  createBase(
    selectedBoardSize === "smallBoard"
      ? symbolArrayEasy
      : selectedBoardSize === "medBoard"
      ? symbolArrayMedium
      : symbolArrayHard
  );
  theGame();
});

/// TODO: 1. Pataisyti, kad atspėjus pirmą kartą taip pat užsifiksuotų. +++ +++
/// TODO: 2. WIN alert. +++ +++
/// TODO: 3. Timer. (setInterval).
/// TODO: 4. Difficulty setting. +++ +++
/// TODO: 5. Reset button.
/// TODO: 6. Cardflip (css).
/// TODO: 7. Prisidėti klases stiliams. +++ +++
/// TODO: 8. Paoptimizuoti kodą.
/// TODO: 9. Kortelių skaičiaus pasirinkimas.
/// TODO: 10. Laiko limito pasirinkimas.
