const inquirer = require('inquirer')
const mysql = require('mysql2')
const table = require('console.table')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'employee_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
function userInput(){
    inquirer.prompt([
        {
          type: 'list',
          name: 'start',
          message: 'What do you want to do?',
          choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },
      ]).then(function (answers) {
        if (answers.start === 'View all Departments') {
          getAllDepartments(); // Call getAllDepartments function here
          console.log('You chose to get all Departments');
        }
      });
}

  

function getAllDepartments() {
  // Perform MySQL query to retrieve departments data
  connection.query('SELECT * FROM department', function (err, results) {
    if (err) throw err;
    // Log departments data using console.table
    console.table(results);
    userInput()
  });
}

userInput()