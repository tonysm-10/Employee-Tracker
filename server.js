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
      else if (answers.start === 'Add a Role') {
        addRole()
        console.log()
      }
      else if (answers.start === 'Add an Employee') {
        addEmployee()
        console.log()
      }
      else if (answers.start === 'Update an Employee Role') {
        updateEmployeeRole()
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

function addRole() {
    // Fetch departments from the department table
    connection.query('SELECT id, name FROM department', function (err, results) {
      if (err) throw err;
      const departmentChoices = results.map(department => ({ value: department.id, name: department.name }));
  
      inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role: "
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for the role: "
        },
        {
          type: "list", // Use list type to show department choices
          name: "department_id",
          message: "Select the department for the role: ",
          choices: departmentChoices // Provide department choices to the user
        }
      ]).then(function (input) {
        const roleTitle = input.title;
        const roleSalary = input.salary;
        const roleDepartmentId = input.department_id;
  
        
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleTitle, roleSalary, roleDepartmentId], function (err, results) {
          if (err) throw err;
          console.log('Role added successfully!');
          userInput();
        });
      });
    });
  }


  function addEmployee() {
    // Fetch roles and managers from the role table
    connection.query('SELECT id, title FROM role', function (err, roleResults) {
      if (err) throw err;
      const roleChoices = roleResults.map(role => ({ value: role.id, name: role.title }));
  
      connection.query('SELECT id, first_name, last_name FROM employee', function (err, managerResults) {
        if (err) throw err;
        // Add "None" option to managerChoices array
        const managerChoices = [{ value: null, name: "None" }, ...managerResults.map(manager => ({ value: manager.id, name: `${manager.first_name} ${manager.last_name}` }))];
  
        inquirer.prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
          },
          {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices
          },
          {
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices
          }
        ]).then((answers)=>{
          const first_name = answers.firstName;
          const last_name = answers.lastName;
          const role_id = answers.roleId;
          const manager_id = answers.managerId;
  
          connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id], function (err, results){
            if (err) throw err;
            console.log("Employee added successfully!");
            userInput()
          });
        });
      });
    });
  }
  

function updateEmployeeRole() {
  // Fetch employees from the employee table
  connection.query('SELECT id, first_name, last_name FROM employee', function (err, employeeResults) {
    if (err) throw err;
    const employeeChoices = employeeResults.map(employee => ({ value: employee.id, name: `${employee.first_name} ${employee.last_name}` }));

    // Fetch roles from the role table
    connection.query('SELECT id, title FROM role', function (err, roleResults) {
      if (err) throw err;
      const roleChoices = roleResults.map(role => ({ value: role.id, name: role.title }));

      inquirer.prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee to update:",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "Select the new role for the employee:",
          choices: roleChoices
        }
      ]).then((answers)=>{
        const employee_id = answers.employeeId;
        const role_id = answers.roleId;

        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id], function (err, results){
          if (err) throw err;
          console.log("Employee role updated successfully!");
          userInput()
        });
      });
    });
  });
}
 


userInput()
