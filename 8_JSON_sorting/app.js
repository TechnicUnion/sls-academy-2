

const endpoints = require('./endpoints')

const {fetchData, findIsDone} = require('./operations')

async function valuesCount() {
  let trueCount = 0;
  let falseCount = 0;

  for (const endpoint of endpoints) {
    let responseData = await fetchData(endpoint);

    let repeatRequest = 3;
    while (!responseData && repeatRequest > 0) {
      responseData = await fetchData(endpoint);
      repeatRequest--;
    }
      
    if (repeatRequest === 0) {
      console.log(`[Fail] ${endpoint}: The endpoint is unavailable`)
    }

    if (responseData) {
      const isDone = findIsDone(responseData);
      if (isDone !== undefined) {
        console.log(`[Success] ${endpoint}: isDone - ${isDone}`);
        isDone === true ? trueCount++ : falseCount++;
      } else {
        console.error(`[Fail] ${endpoint}: The isDone key was not found`);
      }
    }
  }

  console.log(`Found True values: ${trueCount}`);
  console.log(`Found False values: ${falseCount}`);
}

valuesCount();