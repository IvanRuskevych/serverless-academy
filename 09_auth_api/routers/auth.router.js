const Router = require("express");
const { signUp, signIn } = require("../controllers/auth.controllers");

const router = new Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

module.exports = router;
