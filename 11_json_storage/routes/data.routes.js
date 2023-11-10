const Router = require("express");

const { addJsonFile, getJsonFileData } = require("../controllers");

const router = new Router();

router.put("/:json_path", addJsonFile);
router.get("/:json_path", getJsonFileData);

module.exports = router;
