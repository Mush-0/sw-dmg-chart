import { fixNumber } from "./helpers.js";
import { characterInfo } from "./userInput.js";

// 1.0 Calculate Boss defense rating
// boss entered here is specific to boss e.g (bossesData.VS_P1)
function calcDefRate(boss, AB_value) {
  // Add restriction so AB cant go past 100%
  AB_value = AB_value > 1 ? 1 : AB_value;
  let defFormula =
    (boss.def * (1 - AB_value)) / (boss.def * (1 - AB_value) + 50 * boss.lvl);

  return fixNumber(defFormula);
}

// 2.0 Put defRate into the Dmg Formula
// dmgRed defaults to 0 if value not given
function dmgFormula(defRate, BD, dmgRed = 0) {
  const dmgDone =
    (characterInfo.avgAtk + characterInfo.critDmg) *
    (1 - defRate) *
    characterInfo.skillMod *
    (1 + BD) *
    (1 + characterInfo.mod2) *
    (1 - dmgRed);
  return parseFloat(dmgDone).toFixed(1);
}

// 3.0 Calculate Damage dealt
//   Takes: boss Data which is specific to boss e.g (bossesData.VS_P1)
//   Returns: an object containing:-
//       changeAB array that simulate varying AB
//       changeBD array that simulate varying BD
function calcDmgDealt(bossData) {
  const dmgDealt = { changeAB: [], changeBD: [] };

  characterInfo.AB.forEach((elemAB) => {
    const defRate = calcDefRate(bossData, elemAB);
    // We used BD[0] as our fixed value while changing the AB
    const calcDmg = dmgFormula(defRate, characterInfo.BD[0], bossData.dmgRed);
    dmgDealt.changeAB.push(calcDmg);
  });

  characterInfo.BD.forEach((elemBD) => {
    // We used AB[0] in defRate as fixed value while changing BD
    const defRate = calcDefRate(bossData, characterInfo.AB[0]);
    // We used BD[0] as our fixed value while changing the AB
    const calcDmg = dmgFormula(defRate, elemBD, bossData.dmgRed);
    dmgDealt.changeBD.push(calcDmg);
  });

  return dmgDealt;
}

export { calcDmgDealt };
