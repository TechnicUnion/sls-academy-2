const fs = require('fs')
const path = require('path')

const dataPath = path.resolve('./data.json')

const originalData = JSON.parse( fs.readFileSync(dataPath, "utf-8"));

function transformedResult() {

    const transformedData = {};

    originalData.forEach(data => {
        const userId = data.user._id;
        const userName = data.user.name;
        const vacation = {
            startDate: data.startDate,
            endDate: data.endDate
        };

        if (!transformedData[userId]) {
            transformedData[userId] = {
                userId,
                userName,
                vacations: []
            };
        }

        transformedData[userId].vacations.push(vacation);
    });

    const result = Object.values(transformedData);

    const transformedResult = JSON.stringify(result, null, 2);

    fs.writeFileSync('transformedData.json', transformedResult, 'utf8')

    console.log(transformedResult);
}

transformedResult()