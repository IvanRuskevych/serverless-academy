import { readFileSync } from "fs";

/**
 * Determine how many unique usernames there are in all the specified files (occurring at least once in any of the files)
 */
function uniqueValues() {
  const set = new Set();

  for (let i = 0; i < 20; i++) {
    const path = "./db/out" + i + ".txt"; // переписати через __dirname

    const data = readFileSync(path).toString().split("\n");

    data.forEach((value) => set.add(value));
  }

  // console.log("🚀 ~ uniqueValues ~ set:", set);
  return set.size;
}

/**
 *  Put content each files as array to one array
 */
function getArrayOfArrays() {
  const arrayOfArrays = [];

  for (let i = 0; i < 20; i++) {
    const path = "./db/out" + i + ".txt";

    const data = readFileSync(path).toString().split("\n");

    arrayOfArrays.push(data);
  }

  return arrayOfArrays;
}

/**
 * Getting the usernames that are exist in all files
 */
function getListRecords() {
  const arrayOfArrays = getArrayOfArrays();

  const listRecords = {};
  // let element;
  let count;

  for (let i = 0; i < arrayOfArrays.length; i++) {
    for (let j = 0; j < arrayOfArrays[i].length; j++) {
      let element = arrayOfArrays[i][j];

      count = listRecords[element] || 0;

      if (count === i) {
        listRecords[element] = count + 1;
      }
    }
  }
  return listRecords;
}

const listRecords = getListRecords();

/**
 * Getting the number of user names that are exist in each of the 20 files
 */
function existInAllFiles() {
  let count = 0;

  for (let element in listRecords) {
    if (listRecords[element] === 20) count++;
  }

  return count;
}

/**
 * Getting the number of user names that are exist at least in 10 of 20 files
 */
function existInAtleastTen() {
  // count all values that exists in at least 10 files
  let count = 0;

  for (let element in listRecords) {
    if (listRecords[element] >= 10) count++;
  }

  return count;
}

/**
 * Start counting the usernames
 */

const start = Date.now();

let uniqueValuesCount = uniqueValues();
console.log("uniqueValues() = " + uniqueValuesCount);

let existInAllFilesCount = existInAllFiles();
console.log("existInAllFiles() = " + existInAllFilesCount);

let existInAtleastTenCount = existInAtleastTen();
console.log("existInAtleastTen() = " + existInAtleastTenCount);

const end = Date.now();
console.log(`Час виконання всіх запитів: ${end - start} мс`);
