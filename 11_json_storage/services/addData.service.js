const { existsSync } = require("fs");
const { writeFile, readFile } = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

async function addData(dir, fileName, reqData) {
  const filePath = path.join(dir, `${fileName}.json`);

  const dataToAdd = {
    id: uuidv4(),
    data: reqData,
  };

  if (existsSync(filePath)) {
    const existingData = JSON.parse(await readFile(filePath));

    existingData.push(dataToAdd);

    await writeFile(filePath, JSON.stringify(existingData));
  } else {
    await writeFile(filePath, JSON.stringify([dataToAdd]));
  }

  const data = JSON.parse(await readFile(filePath)).find(
    (item) => item.id === dataToAdd.id
  );

  return data;
}

module.exports = { addData };
