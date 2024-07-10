let mainGameCreate = document.createElement("main");
const countTurns = document.createElement("h5");
countTurns.setAttribute("class", "turn-counter");

document.body.append(mainGameCreate);
mainGameCreate.append(countTurns);

function createBase() {
  let symbolArray = ["🌠", "🏹", "🏹", "💌", "🍀", "🌠", "🍀", "💌"];

  for (let i = 8; i > 0; i--) {
    let createDiv = document.createElement("div");
    let createPara = document.createElement("p");
    mainGameCreate.appendChild(createDiv);
    createDiv.appendChild(createPara);
    const randSelector = Math.floor(Math.random() * i);
    createPara.textContent = symbolArray[randSelector];
    symbolArray.splice(randSelector, 1);
  }
}

function stylesOfGame() {
  const myDivs = document.querySelectorAll("div");
  for (let i = 0; i < myDivs.length; i++) {
    let cardDiv = myDivs[i];
    cardDiv.setAttribute("class", "cardDiv");
    countTurns.textContent = "Moves: 0";
  }
}

createBase();
stylesOfGame();

function theGame() {
  const symbolDiv = document.querySelectorAll("div");
  const symbolClick = document.querySelectorAll("p");

  let counter = 0;
  let clicked = [];
  let pairs = [];

  symbolClick.forEach((item) => (item.style.display = "none"));

  for (let i = 0; i < 8; i++) {
    symbolDiv[i].addEventListener("click", (event) => {
      if (symbolClick[i].style.display === "none") {
        symbolClick[i].style.display = "block";
        counter += 1;
        clicked.push(symbolClick[i]);
        countTurns.textContent = "Moves: " + clicked.length;

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

          pairs.forEach((item) => (item.style.display = "block"));

          if (pairs.length === 8) {
            winMsg = document.createElement("h1");
            winMsg.setAttribute("class", "win-message");
            document.body.append(winMsg);
            winMsg.textContent = "WIN! " + "Moves: " + clicked.length;
            countTurns.style.display = "none";
          }

          if (counter > 2) {
            symbolClick.forEach((item) => (item.style.display = "none"));
            counter = 1;
            symbolClick[i].style.display = "block";
          }

          let hardDifficulty = document.getElementById("hardDiff");
          let medDifficulty = document.getElementById("medDiff");
          let loseMsg = document.createElement("h2");
          loseMsg.setAttribute("class", "lose-message");
          loseMsg.textContent = "LOST";

          if (hardDifficulty.checked && hardDifficulty.value < clicked.length) {
            symbolClick.forEach((item) => (item.style.display = "none"));
            countTurns.style.display = "none";
            document.body.append(loseMsg);
            setTimeout(function () {
              location.reload();
            }, 1500);
            return;
          } else if (
            medDifficulty.checked &&
            medDifficulty.value < clicked.length
          ) {
            countTurns.style.display = "none";
            symbolClick.forEach((item) => (item.style.display = "none"));
            document.body.append(loseMsg);
            setTimeout(function () {
              location.reload();
            }, 1500);
            return;
          }
        }
      }
    });
  }
}

theGame();

/// TODO: 1. Pataisyti, kad atspėjus pirmą kartą taip pat užsifiksuotų. +++ +++
/// TODO: 2. WIN alert. +++ +++
/// TODO: 3. Timer. (setInterval).
/// TODO: 4. Difficulty setting. +++ +++ (Patobulinti? Resetint kai yra LOST?)
/// TODO: 5. Reset button. (location.reset???)
/// TODO: 6. Cardflip (css).
/// TODO: 7. Prisidėti klases stiliams.
/// TODO: 8. Paoptimizuoti kodą. Perdėti į Objektą viską?
