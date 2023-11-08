const Router = require("express");
const { getUserData } = require("../controllers");

const router = new Router();

router.get("/", getUserData);

module.exports = router;
