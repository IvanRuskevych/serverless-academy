const Router = require("express");
const { signUp } = require("../controllers/auth.controllers");

const router = new Router();

module.exports = router;

/**
 * Sign-up
 */

router.post("/sign-up", signUp);

module.exports = router;
