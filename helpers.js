function fixNumber(num) {
  return parseFloat(num.toPrecision(4));
}

function incArray(startNum, inc, values) {
  const result = [startNum];
  for (let i = 0; i < values; i++) {
    const nextValue = result[result.length - 1] + inc;
    result.push(fixNumber(nextValue));
  }
  return result;
}

function mergedArray(arr1, arr2) {
  const formatedArr1 = arr1.map((elem) => fixNumber(elem * 100) + "% AB");
  const formatedArr2 = arr2.map((elem) => fixNumber(elem * 100) + "% BD");
  const mergedArray = [];
  formatedArr1.forEach((elem, indx) => {
    mergedArray.push([elem, formatedArr2[indx]]);
  });
  return mergedArray;
}

export { incArray, fixNumber, mergedArray };
