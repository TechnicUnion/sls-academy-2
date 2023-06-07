const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');

const databaseFile = path.resolve('./users.txt')

function addUser() {
  inquirer
    .prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Enter the users name. To cansel press ENTER:',
        },
    ])
     .then((answers) => {
      const { name } = answers;
      if (name.trim() !== '') {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'gender',
              message: 'Choose the gender:',
              choices: ['Male', 'Female'],
            },
            {
              type: 'number',
              name: 'age',
              message: 'Enter the age:',
            },
          ])
          .then((answers) => {
            const { gender, age } = answers;
            const user = {
              name,
              gender,
              age,
            };
            const userData = JSON.stringify(user);

            fs.appendFile(databaseFile, userData + '\n', 'utf8');
            addUser(); // Repeat the cycle to add another user
          });
      } else {
        findUser(); // Prompt to find a user after adding users
      }
    });
}

function findUser() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'search',
        message: 'Would you like to search values in DB?:',
        
      },
    ])
      .then((answers) => {
       
          const { search } = answers;
           console.log(search)
    //   if (searchName.trim() !== '') {
    //     fs.readFile(databaseFile, 'utf8', (err, data) => {
    //       if (err) {
    //         console.error('Error reading the database file:', err);
    //         return;
    //       }

    //       const users = data.split('\n');
    //       let foundUser = false;

    //       for (const user of users) {
    //         if (user.trim() !== '') {
    //           const userData = JSON.parse(user);
    //           if (userData.name.toLowerCase() === searchName.toLowerCase()) {
    //             console.log('User found:');
    //             console.log('Name:', userData.name);
    //             console.log('Gender:', userData.gender);
    //             console.log('Age:', userData.age);
    //             console.log();
    //             foundUser = true;
    //             break;
    //           }
    //         }
    //       }

    //       if (!foundUser) {
    //         console.log('User not found.\n');
    //       }

    //       findUser(); // Repeat the cycle to search for another user
    //     });
    //   } else {
    //     console.log('Exiting the application.');
    //   }
    });
    }

// Start the application
addUser(); // Prompt to add a user
