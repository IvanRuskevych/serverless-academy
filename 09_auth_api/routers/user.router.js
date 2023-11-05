const Router = require("express");

const { authenticate } = require("../middlewares");
const { getCurrentUser } = require("../controllers");

const router = new Router();

router.get("/", authenticate, getCurrentUser);

module.exports = router;
