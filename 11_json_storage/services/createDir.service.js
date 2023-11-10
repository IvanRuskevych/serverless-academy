const { existsSync } = require("fs");
const path = require("path");

const { mkdir } = require("fs/promises");

function createDir() {
  const dirDB = path.join(__dirname, "../", "db");

  if (!existsSync(dirDB)) mkdir(dirDB);

  return dirDB;
}

module.exports = { createDir };
