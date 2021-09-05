import { incArray, fixNumber, mergedArray } from "./helpers.js";
import { myChartUpdate } from "./chart.js";
// Initial Character info
const minAtk = 21000;
const maxAtk = 27000;
const avgAtk = fixNumber((minAtk + maxAtk) / 2);
const critDmg = 35000;
const skillMod = 2;
const mod2 = 0.2; //Maybe we need to add other mod later (20% desire awakening ?)
const AB = incArray(0.3, 0.03, 20);
const BD = incArray(1.12, 0.05, 20);
let characterInfo = { avgAtk, critDmg, skillMod, mod2, AB, BD };
let selectedBoss = "VS_P3";

// Taking User inputs
const form = document.getElementById("userInputs");
form.addEventListener("submit", handleInput);

function handleInput(e) {
  e.preventDefault();
  const formValues = [...e.target];
  const [
    minAtk,
    maxAtk,
    critDmg,
    skillMod,
    mod2,
    steps,
    startAB,
    stepAB,
    startBD,
    stepBD,
    selectedBoss,
  ] = formValues.map((elem) =>
    elem.type === "select-one" ? elem.value : parseFloat(elem.value)
  );

  characterInfo = {
    avgAtk: fixNumber((minAtk + maxAtk) / 2),
    critDmg,
    skillMod: skillMod / 100,
    mod2: mod2 / 100,
    AB: incArray(startAB / 100, stepAB / 100, steps),
    BD: incArray(startBD / 100, stepBD / 100, steps),
  };
  console.log("New Character info: ", characterInfo);
  const mergedLabel = mergedArray(characterInfo.AB, characterInfo.BD);
  myChartUpdate(mergedLabel, selectedBoss);
}
console.log("character info:", characterInfo);

export { characterInfo, selectedBoss };
