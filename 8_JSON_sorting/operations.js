const axios = require('axios');

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

function findIsDone(obj) {
  if (typeof obj === 'object') {
    if (obj.hasOwnProperty('isDone')) {
      return obj.isDone;
    } else {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          const result = findIsDone(obj[key]);
          if (result !== undefined) {
            return result;
          }
        }
      }
    }
  }
  return undefined;
}

module.exports = {
    fetchData,
    findIsDone
}