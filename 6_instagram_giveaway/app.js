const fs = require('fs');
const path = require('path');

function readFile(file) {
  return fs.readFileSync(file, 'utf-8').split('\n');
}

function uniqueValues() {
  const startTime = Date.now();

  const uniqueUsernames = new Set();
  for (let i = 1; i < 20; i++) {
    const filePath = path.join(__dirname, `./text/out${i}.txt`);
    const words = readFile(filePath);
    words.forEach(word => uniqueUsernames.add(word));
  }

  const count = uniqueUsernames.size;

  const elapsedTime = (Date.now() - startTime) / 1000;
  console.log(`Elapsed time for uniqueValues(): ${elapsedTime.toFixed(2)} seconds`);

  return count;
}


function existInAllFiles() {
  const startTime = Date.now();

  let commonUsernames = null;
  for (let i = 1; i < 20; i++) {
    const filePath = path.join(__dirname, `./text/out${i}.txt`);
    const words = readFile(filePath);
    if (commonUsernames === null) {
      commonUsernames = new Set(words);
    } else {
      commonUsernames = new Set(words.filter(word => commonUsernames.has(word)));
    }
  }

  const count = commonUsernames ? commonUsernames.size : 0;

  const elapsedTime = (Date.now() - startTime) / 1000;
  console.log(`Elapsed time for existInAllFiles(): ${elapsedTime.toFixed(2)} seconds`);

  return count;
}

// const fileOccurrence = Array(20).fill(0);
// function existInAtleastTen() {
//   const startTime = Date.now();


//   for (let i = 1; i < 20; i++) {
//     const filePath = path.join(__dirname, `./text/out${i}.txt`);
//     const words = readFile(filePath);
//     const uniqueWords = new Set(words);
//     uniqueWords.forEach(word => fileOccurrence[i - 1]++);
//   }

//   const count = fileOccurrence.filter(occurrence => occurrence >= 10).length;

//   const elapsedTime = (Date.now() - startTime) / 1000;
//   console.log(`Elapsed time for existInAtleastTen(): ${elapsedTime.toFixed(2)} seconds`);

//   return count;
// }

function existInAtleastTen() {
  const startTime = Date.now();

  const usernameCountMap = new Map();
  for (let i = 1; i < 20; i++) {
    const filePath = path.join(__dirname, `./text/out${i}.txt`);
    const words = readFile(filePath);
    const uniqueWords = new Set(words);
    uniqueWords.forEach(word => {
      const count = usernameCountMap.get(word) || 0;
      usernameCountMap.set(word, count + 1);
    });
  }

  const count = Array.from(usernameCountMap.values()).filter(occurrence => occurrence >= 10).length;

  const elapsedTime = (Date.now() - startTime) / 1000;
  console.log(`Elapsed time for existInAtleastTen(): ${elapsedTime.toFixed(2)} seconds`);

  return count;
}








// Example usage
const uniqueCount = uniqueValues();
const allFilesCount = existInAllFiles();
const atLeastTenCount = existInAtleastTen();

console.log("Unique usernames in all files:", uniqueCount);
console.log("Usernames occurring in all 20 files:", allFilesCount);
console.log("Usernames occurring in at least 10 files:", atLeastTenCount);

// uniqueValues();