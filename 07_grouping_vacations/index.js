import { readFileSync, writeFileSync } from "fs";

/**
 * Function for getting existing users database
 */
function getOriginalData() {
  try {
    let originalData = JSON.parse(readFileSync("data.json"));
    return originalData;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Function for creating new database with grouping vacations by user
 */
function createVacationsDatabase(data) {
  const db = [];

  data.forEach((item) => {
    const userId = item.user._id;
    const userName = item.user.name;
    const vacationInfo = {
      startDate: item.startDate,
      endDate: item.endDate,
    };

    const userIndex = db.findIndex((item) => item.userId === userId); // find users by id in db

    if (userIndex === -1) {
      db.push({ userId, userName, vacations: [vacationInfo] }); // create user in db
    } else {
      db[userIndex].vacations.push(vacationInfo); // update user vacations info in db
    }
  });

  return db;
}

/*
 * Creating new database
 */
function vacationsData() {
  const originalData = getOriginalData();

  const vacationsDatabase = createVacationsDatabase(originalData);

  writeFileSync(
    "vacationsByUser.json",
    JSON.stringify(vacationsDatabase, null, 2)
  );

  return;
}

/**
 * Start program
 */
vacationsData();
