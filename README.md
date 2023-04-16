# Employee Tracker

  ## Description

  This command-line application is designed to manage a company's employee database using Node.js, Inquirer, and MySQL. It allows business owners to view and manage departments, roles, and employees in their company, helping them to organize and plan their business effectively.

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation

  To install the required dependencies for this application, please run the following command in your terminal:  npm install inquirer@8.2.4

  ## Usage

  After installing the dependencies, you can start the application by running the following command in your terminal:   node server.js   
  
   The application will present you with a menu of options to choose from:
   - View all departments
   - View all roles
   - View all employees
   - Add a department
   - Add a role
   - Add an employee
   - Update an employee role
   You can select an option by navigating through the menu using the arrow keys and pressing Enter to make a selection.

   ## Functionality

   This application implements the following functionality, based on the user stories and acceptance criteria:
   - View all departments: Displays a formatted table showing department names and department ids retrieved from the database.
   - View all roles: Displays a formatted table showing job titles, role ids, departments, and salaries retrieved from the database.
   - View all employees: Displays a formatted table showing employee ids, first names, last names, job titles, departments, salaries, and managers retrieved from the database.
   - Add a department: Prompts the user to enter the name of the department and adds it to the database.
   - Add a role: Prompts the user to enter the name, salary, and department for the role and adds it to the database.
   - Add an employee: Prompts the user to enter the employee's first name, last name, role, and manager, and adds the employee to the database.
   - Update an employee role: Prompts the user to select an employee to update and their new role, and updates the employee's role in the database.


  ## License

  NONE

  

  ## Contributing 

  Please fork the repository and create a pull request with your changes.

  ## Tests
  
  There are currently no tests implemented for this application.


  ## Technologies Used 
  - Node.js
  - Inquirer
  - MySQL


  ## Questions

  How to reach me? 

  Any further questions please contact me at ayalaarellanoanthony@gmail.com

  You can also check out my [GitHub profile](https://github.com/tonysm-10) for more projects.
