const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');

const databaseFile = path.resolve('./users.txt');

function addUser() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the user's name. To cansel press ENTER:",
      },
    ])
      .then(answers => {
        const { name } = answers;
        if (name.trim() !== '') {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'gender',
              message: 'Choose your gender:',
              choices: ['male', 'female'],
            },
            {
              type: 'number',
              name: 'age',
              message: 'Enter your age:',
            },
          ])
            .then(answers => {
            const { gender, age } = answers;
            const user = {
              name,
              gender,
              age,
            };
            const userData = JSON.stringify(user);
            fs.appendFile(databaseFile, userData, 'utf8');
            addUser();
          });
      } else {
        selectedUser();
      }
    });
}

function selectedUser() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'search',
        message: 'Would you like to search values in DB?:',
      },
    ])
    .then(async answers => {
      const { search } = answers;
      if (search) {
        const list = await fs.readFile(databaseFile, 'utf-8');
        const users = list.split('\n');
        let userData = [];
        for (const user of users) {
          if (user.trim() !== '') {
            userData.push(JSON.parse(user));
          }
        }
        console.log(userData);
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'name',
              message: "Enter the user's name you wanna find in DB:",
            },
          ])
          .then(answers => {
            const { name } = answers;
            const selectedUser = userData.find(
              user => user.name.toLowerCase() === name.toLowerCase()
            );
            if (name.trim() !== '' && selectedUser) {
              console.log(`User ${name} was found`);
              console.log(selectedUser);
            } else {
              console.log('Such user does not exist.');
            }
          });
      }
    });
}

addUser(); 
