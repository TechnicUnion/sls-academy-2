function sortsWordsAlphabetically(data) {
    return data.filter(item => isNaN(Number(item)) && item !== "0").sort();
}

function sortNumbersAscending(numbers) {
  return numbers.sort((a, b) => a - b);
}

function sortNumbersDescending(numbers) {
  return numbers.sort((a, b) => b - a);
}

function sortByWordLength(words) {
  return words.sort((a, b) => a.length - b.length);
}

function getUniqueWords(words) {
  return [...new Set(words)];
}

function getUniqueValues(values) {
  return [...new Set(values)];
}

module.exports = {
    sortsWordsAlphabetically,
    sortNumbersAscending,
    sortNumbersDescending,
    sortByWordLength,
    getUniqueWords,
    getUniqueValues
}