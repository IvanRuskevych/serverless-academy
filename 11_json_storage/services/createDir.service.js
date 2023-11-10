const { existsSync } = require("fs");
const { mkdir } = require("fs/promises");
const path = require("path");

function createDir() {
  const dirDB = path.join(__dirname, "../", "db");

  if (!existsSync(dirDB)) mkdir(dirDB);

  return dirDB;
}

module.exports = { createDir };
