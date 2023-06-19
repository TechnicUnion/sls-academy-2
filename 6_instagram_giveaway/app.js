const fs = require('fs');
const path = require('path');

function readFile(file) {
  return fs.readFileSync(file, 'utf-8').split('\n');
}


function uniqueValues() {
  const uniqueUsernames = new Set();
  for (let i = 1; i < 20; i++) {
    const filePath = path.join(__dirname, `./text/out${i}.txt`);
    const words = readFile(filePath);
    words.forEach(word => uniqueUsernames.add(word));
  }

  return uniqueUsernames.size;
}

function existInAllFiles() {
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

  return commonUsernames ? commonUsernames.size : 0;
}

function existInAtleastTen() {
  const usernameCount = {};
  for (let i = 1; i < 20; i++) {
    const filePath = path.join(__dirname, `./text/out${i}.txt`);
    const words = readFile(filePath);
    const uniqueWords = new Set(words);
    uniqueWords.forEach(word => {
      usernameCount[word] = (usernameCount[word] || 0) + 1;
    });
  }

  const count = Object.values(usernameCount).filter(occurrence => occurrence >= 10).length;
  return count;
}

const startTime = Date.now();
const uniqueCount = uniqueValues();
const allFilesCount = existInAllFiles();
const atLeastTenCount = existInAtleastTen();
const elapsedTime = (Date.now() - startTime) / 1000;
console.log(`Elapsed time: ${elapsedTime.toFixed(2)} seconds`);


console.log("Unique usernames in all files:", uniqueCount);
console.log("Usernames occurring in all 20 files:", allFilesCount);
console.log("Usernames occurring in at least 10 files:", atLeastTenCount);

