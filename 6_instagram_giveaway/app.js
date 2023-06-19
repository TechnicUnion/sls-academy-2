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
  console.log(`uniqueValues(): ${count}`);

  return count;
}




uniqueValues();