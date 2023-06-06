function sortsWords(data) {
    return data.filter(item => isNaN(Number(item)) && item !== "0");
}

function sortsNumbers(data) {
    return data.filter(item => !isNaN(Number(item)) || item === "0");
}

function sortsWordsAlphabetically(data) {
    return sortsWords(data).sort();
}

function sortsNumbersAscending(data) {
  return sortsNumbers(data).sort((a, b) => a - b);
}

function sortsNumbersDescending(data) {
  return sortsNumbers(data).sort((a, b) => b - a);
}

function sortsByWordLength(data) {  
  return sortsWordsAlphabetically(data).sort((a, b) => a.length - b.length);
}

function showsUniqueWords(data) {
  return [...new Set(sortsWords(data))];
}

function showsUniqueValues(data) {
  return [...new Set(data)];
}

module.exports = {
    sortsWordsAlphabetically,
    sortsNumbersAscending,
    sortsNumbersDescending,
    sortsByWordLength,
    showsUniqueWords,
    showsUniqueValues
}