const { existsSync } = require("fs");
const { readFile } = require("fs/promises");
const path = require("path");

const { requestError, wrapperTryCatch } = require("../utils");
const { addData, createDir } = require("../services");

/**
 * Create json database and add data
 */
const addJsonFile = async (req, res) => {
  const jsonFileName = req.params.json_path;
  const reqData = req.body;

  if (Object.keys(reqData).length === 0)
    throw requestError(400, "Missing JSON data");

  const dir = createDir();

  const data = await addData(dir, jsonFileName, reqData);

  res.status(201).json({
    message: `File ${jsonFileName}.json stored successfully`,
    data,
  });
};

/**
 * Getting data from json database
 */
const getJsonFileData = async (req, res) => {
  const jsonFileName = req.params.json_path;
  const dir = createDir();

  const filePath = path.join(dir, `${jsonFileName}.json`);

  if (!existsSync(filePath))
    throw requestError(404, "JSON file does not exist");

  const existingData = JSON.parse(await readFile(filePath));

  res.status(200).json({
    message: `Data from ${jsonFileName}.json`,
    data: existingData,
  });
};

module.exports = {
  addJsonFile: wrapperTryCatch(addJsonFile),
  getJsonFileData: wrapperTryCatch(getJsonFileData),
};
