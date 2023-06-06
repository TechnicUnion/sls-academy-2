const readline = require('readline');
const operations = require('./operations')


function getInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

async function interactiveSort() {
  let input = '';
  let shouldExit = false;

  while (!shouldExit) {
    input = await getInput('Enter words or numbers separated by space (or "exit" to quit): ');

    if (input === 'exit') {
    shouldExit = true;
      continue;
    }

    const values = input.split(' ');

    const operation = await getInput(
      'Select the operation to perform:\n' +
      '1. Sort words alphabetically\n' +
      '2. Show numbers from lesser to greater\n' +
      '3. Show numbers from bigger to smaller\n' +
      '4. Display words in ascending order by number of letters in the word\n' +
      '5. Show only unique words\n' +
      '6. Display only unique values from the set of words and numbers\n' +
      'Enter the number corresponding to the operation: '
    );

    switch (operation) {
      case '1':
        console.log(operations.sortsWordsAlphabetically(values));
        break;
      case '2':
        console.log(operations.sortsNumbersAscending(values));
        break;
      case '3':
        console.log(operations.sortsNumbersDescending(values));
        break;
      case '4':
        console.log(operations.sortsByWordLength(values));
        break;
      case '5':
        console.log(operations.showsUniqueWords(values));
        break;
      case '6':
        console.log(operations.showsUniqueValues(values));
        break;
      default:
        console.log('Invalid operation. Please try again.');
    }
  }
}

interactiveSort();