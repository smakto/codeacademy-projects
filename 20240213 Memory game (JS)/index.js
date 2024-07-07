document.body.style.position = "relative";
let mainGameCreate = document.createElement("main");
const countTurns = document.createElement("h5");

document.body.append(mainGameCreate);
mainGameCreate.append(countTurns);

const limitCreator = document.createElement("form");
document.body.append(limitCreator);
limitCreator.setAttribute("id", "myForm");
const theForm = document.getElementById("myForm");
const inputEasy = document.createElement("input");
const inputMedium = document.createElement("input");
const inputHard = document.createElement("input");
const headerForm = document.createElement("h1");
const breakPoint1 = document.createElement("br");
const breakPoint2 = document.createElement("br");

headerForm.textContent = "Choose difficulty";
theForm.append(headerForm);

const formLabel1 = document.createElement("label");
const formLabel2 = document.createElement("label");
const formLabel3 = document.createElement("label");

inputEasy.setAttribute("type", "radio");
inputEasy.setAttribute("name", "diff");
inputEasy.setAttribute("id", "easyDiff");
inputEasy.setAttribute("value", "unlimited");
inputEasy.setAttribute("checked", "checked");
inputEasy.style.display = "inline-block";

inputMedium.setAttribute("type", "radio");
inputMedium.setAttribute("name", "diff");
inputMedium.setAttribute("id", "medDiff");
inputMedium.setAttribute("value", 20);

inputMedium.style.display = "inline-block";

inputHard.setAttribute("type", "radio");
inputHard.setAttribute("name", "diff");
inputHard.setAttribute("id", "harDiff");
inputHard.setAttribute("value", 12);

inputHard.style.display = "inline-block";

limitCreator.append(inputEasy);
limitCreator.appendChild(formLabel1);
limitCreator.append(breakPoint1);
limitCreator.append(inputMedium);
limitCreator.appendChild(formLabel2);
limitCreator.append(breakPoint2);
limitCreator.append(inputHard);
limitCreator.appendChild(formLabel3);

formLabel1.htmlFor = "easyDiff";
formLabel1.innerHTML = "  Easy - unlimited moves";
formLabel2.htmlFor = "medDiff";
formLabel2.innerHTML = "  Medium - 20 moves";
formLabel3.htmlFor = "harDiff";
formLabel3.innerHTML = "  Hard - 12 moves";

const allLabels = [formLabel1, formLabel2, formLabel3];
allLabels.forEach(
  (item) => (
    (item.style.color = "purple"), (item.style.font = "italic 16px arial,serif")
  )
);
limitCreator.style.position = "fixed";
limitCreator.style.top = "25px";
limitCreator.style.left = "20px";
limitCreator.style.width = "300px";

headerForm.style.font = "italic bold 24px arial,serif";
headerForm.style.color = "Purple";

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
  document.body.style.backgroundImage =
    "url(https://t4.ftcdn.net/jpg/04/26/52/71/360_F_426527111_59QersN3ayDJ7Sfa5qwnKkp4l1O5tuAp.jpg)";
  document.body.style.backgroundSize = "cover";
  document.body.querySelector("main").setAttribute("id", "game_wrapper");
  const mainGame = document.getElementById("game_wrapper");
  mainGame.style.border = "1px solid black";
  mainGame.style.width = "50%";
  mainGame.style.padding = "40px";
  mainGame.style.display = "flex";
  mainGame.style.justifyContent = "center";
  mainGame.style.flexWrap = "wrap";
  mainGame.style.marginLeft = "20%";
  mainGame.style.backgroundImage =
    "url(https://t4.ftcdn.net/jpg/03/72/73/83/360_F_372738375_q0lu0R4tE6R1HkGgxpyKzx5KyGC5gMLM.jpg)";

  const myDivs = document.querySelectorAll("div");
  for (let i = 0; i < myDivs.length; i++) {
    let designDiv = myDivs[i];
    designDiv.style.border = "1px solid purple";
    designDiv.style.fontSize = "xx-large";
    designDiv.style.padding = "15px";
    designDiv.style.margin = "25px";
    designDiv.style.width = "45px";
    designDiv.style.height = "100px";
    designDiv.style.background = "pink";
    designDiv.style.borderRadius = "15px";

    countTurns.style.position = "absolute";
    countTurns.style.bottom = "0";
    countTurns.style.color = "purple";
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
            document.body.append(winMsg);
            winMsg.textContent = "WIN! " + "Moves: " + clicked.length;
            winMsg.style.color = "purple";
            winMsg.style.marginLeft = "30%";
            winMsg.style.font = "italic bold 60px arial,serif";
            winMsg.style.marginTop = "-255px";
            countTurns.style.display = "none";
          }

          if (counter > 2) {
            symbolClick.forEach((item) => (item.style.display = "none"));
            counter = 1;
            symbolClick[i].style.display = "block";
          }

          let hardDifficulty = document.getElementById("harDiff");
          let medDifficulty = document.getElementById("medDiff");
          let loseMsg = document.createElement("h2");
          loseMsg.textContent = "LOST";
          loseMsg.style.color = "red";
          loseMsg.style.marginLeft = "30%";
          loseMsg.style.font = "italic bold 160px arial,serif";
          loseMsg.style.marginTop = "-300px";

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
