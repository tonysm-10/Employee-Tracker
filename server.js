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
function userInput() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'start',
        message: 'What do you want to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
      },
    ]).then(function (answers) {
      // User selection if Statements to call the appropriate function to log data from database
      if (answers.start === 'View all Departments') {
        getAllDepartments();
        console.log('You chose to get all Departments');
        console.log()
      }
      else if (answers.start === 'View all Roles') {
        getAllRoles()
        console.log('You chose to get all Roles')
        console.log()
      }
      else if (answers.start === 'View all Employees') {
        getAllEmployees()
        console.log('You chose to get all Employees')
        console.log()
      }
      else if (answers.start === 'Add a Department') {
        addDepartment()
        console.log()
      }
      else {
        console.log('Invalid choice. Please choose a valid option.');
        userInput(); // Prompt user again for input
      }
    });
  }
  

//////////// All the functions to retrieve or add data to the database ////////////

// Function to log the Departments table from db
function getAllDepartments() {
  // Perform MySQL query to retrieve departments data
  connection.query('SELECT * FROM department', function (err, results) {
    if (err) throw err;
    // Log departments data using console.table
    console.table(results);
    userInput()
  });
}

// Function to log the Roles table from db
function getAllRoles(){
    connection.query('SELECT * FROM roles_view;', function (err, results) {
        if (err) throw err;
        // Log departments data using console.table
        console.table(results);
        userInput()
      }); 
}
// Function to log the Employees table from db
function getAllEmployees(){
    connection.query('SELECT * FROM employee_view;', function (err, results) {
        if (err) throw err;
        // Log departments data using console.table
        console.table(results);
        userInput()
      }); 
}
// Add data to db 
function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "addDepartment",
            message: "Enter the name of the department!"
        }
    ]).then(function(input){
        const addDepo = input.addDepartment;
        console.log('You have added ' + addDepo);
        console.log()
        // Perform MySQL query to insert department data
        connection.query('INSERT INTO department (name) VALUES (?)', [addDepo], function (err, results) {
            if (err) throw err;
            // Log departments data using console.table
            userInput();
        });
    });
}

userInput()