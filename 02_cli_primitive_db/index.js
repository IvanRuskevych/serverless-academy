import inquirer from "inquirer";
import fs from "fs";

const database = loadDatabase();

const questionsAddUser = [
  {
    type: "input",
    name: "name",
    message: "Enter user`s name. To cancel, press ENTER:",
  },

  {
    type: "list",
    name: "gender",
    message: "Choose the user's gender:",
    choices: ["Male", "Female"],

    when: (answers) => (answers.name.trim() === "" ? false : true),
  },
  {
    type: "input",
    name: "age",
    message: "Enter the user's age:",
    when: (answers) => (answers.name.trim() === "" ? false : true),
  },

  {
    type: "confirm",
    name: "checked",
    message: "Enter the user name you want to find in the database?",
    default: true,

    when: (answers) => (answers.name.trim() !== "" ? false : true),
  },
];

const questionsSearchUser = [
  {
    type: "input",
    name: "searchName",
    message: "Enter the name of the user you want to search for:",
  },
];

const questionsMenu = [
  {
    type: "list",
    name: "menu",
    message: "Choose an option:",
    choices: ["Add User", "Search User", "Exit"],
  },
];

async function addUser() {
  const { name, gender, age, checked } = await inquirer.prompt(
    questionsAddUser
  );

  if (name === "") {
    if (checked) {
      return searchUser();
    } else {
      return main();
    }
  }

  const user = {
    name,
    gender,
    age,
  };

  database.push(user);

  saveDatabase();

  console.log(`User '${user.name}' added to the database.`);

  addUser();
}

async function searchUser() {
  const searchAnswer = await inquirer.prompt(questionsSearchUser);

  const userName = searchAnswer.searchName.trim().toLowerCase();

  const foundUsers = database.filter(
    (user) => user.name.toLowerCase() === userName
  );

  if (foundUsers.length === 0) {
    console.log("User not found in the database.");
  } else {
    console.log("Found user(s):");

    foundUsers.forEach(({ name, gender, age }) => {
      console.log(`Name: ${name}`);
      console.log(`Gender: ${gender}`);
      console.log(`Age: ${age}`);
      console.log("<<<<<< ========  >>>>>>");
    });
  }

  return main();
}

async function main() {
  const { menu } = await inquirer.prompt(questionsMenu);

  switch (menu) {
    case "Add User":
      addUser();
      break;

    case "Search User":
      searchUser();
      break;

    case "Exit":
      return;
  }
}

/**
 * HELPERS
 */

function loadDatabase() {
  try {
    const data = fs.readFileSync("db.txt", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return []; // if data does not exist
  }
}

function saveDatabase() {
  fs.writeFileSync("db.txt", JSON.stringify(database, null, 2), "utf8");
}

/**
 * Start program
 */

main();
