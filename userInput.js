import { incArray, fixNumber, mergedArray } from "./helpers.js";
import { myChartUpdate, chartSetup } from "./chart.js";
import { calcDmgDealt } from "./dmgCalc.js";
import { bossesData } from "./bossesData.js";
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

// Show initial chart
const mergedLabel = mergedArray(characterInfo.AB, characterInfo.BD);

myChartUpdate(mergedLabel, selectedBoss);

// Taking User inputs
const form = document.getElementById("userInputs");
const myCanva = document.getElementById("chart");
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

  const mergedLabel = mergedArray(characterInfo.AB, characterInfo.BD);
  myChartUpdate(mergedLabel, selectedBoss);

  myCanva.scrollIntoView({ behavior: "smooth", block: "end" });

  // Log new data, maybe we need it during user facing some issues
  console.group("New data");
  console.log("New Character info: ", characterInfo);
  console.log("character info:", characterInfo);
  console.groupEnd();
}

// Log initial data, maybe we need it during user facing some issues
console.group("initial data");
console.log("character info:", characterInfo);
console.log("Damage dealt:", calcDmgDealt(bossesData.VS_P1));
console.groupEnd();

export { characterInfo, selectedBoss };
