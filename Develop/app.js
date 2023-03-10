const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const checkDir = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  };
};
// makes a file 
const createHtml = () => {
  const teamFile = render(employees);
  checkDir();
  fs.writeFileSync(outputPath, teamFile);
};


// Write code to use inquirer to gather information about the development team members, and to create objects for each team member (using the correct classes as blueprints!)
const employeeQuestion = () => {

  inquirer
    .prompt([
      // HINT: each employee type (manager, engineer, or intern) has slightly different
      // information; write your code to ask different questions via inquirer depending on employee type.
      {
        type: 'list',
        name: 'role',
        choices: [
          'Engineer',
          'Intern',
          'Manager',
        ],
        message: 'What is your role?',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is your id number?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        when: (answers) => answers.role === "Engineer",
      },
      {
        type: 'input',
        name: 'school',
        message: "What school does the Intern Attend?",
        when: (answers) => answers.role === 'Intern',
      },
      {
        type: 'number',
        name: 'officeNumber',
        message: 'Office number of Manager',
        when: (answers) => answers.role === 'Manager',
      },
      {
        //  Add another employee if YES
        type: 'confirm',
        message: 'Would you like to add another employee?',
        name: 'addEmployee',
      },

    ])

    .then((answers) => {
      // Use user feedback for... whatever!! 
      let newEmployee;
      if (answers.role === 'Engineer') {
        newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github)
      };
      if (answers.role === 'Manager') {
        newEmployee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
      };
      if (answers.role === 'Intern') {
        newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school)
      };

      // adds to array  via push I think
      // employees.push(employeeQuestion);


      if (answers.addEmployee) {
        return employeeQuestion();
      } else {
        return createHtml();
      };
    });
};

const init = () => {
  console.log('Answer All Following Questions');
  employeeQuestion();
};

init();

// After you have your html, you're now ready to create an HTML file using the HTML returned from the `render` function. Now write it to a file named `team.html` in the `output` folder. You can use the variable `outputPath` above target this location.

// from readme help?

// .then((answers) => {
//   const team = generateMarkdown(answers);
//   if (team === '') {
//       console.log('team.html Issue, please try again.');
//   } else {
//       fs.writeFile('team.html', team, (err) =>
//           err ? console.log(err) : console.log('Success! File created team.html')
//       );
//   };
// });

// After the user has input all employees desired, call the `render` function (required above) and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer, and Intern classes should all extend from a class named Employee; see the directions for further information. Be sure to test out each class and verify it generates an object with the correct structure and methods. This structure will be crucial in order for the provided `render` function to work!

