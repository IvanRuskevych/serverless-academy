const Router = require("express");

const router = new Router();

const { signUp, signIn } = require("../controllers");
const { validateBody } = require("../middlewares");
const { authSchema } = require("../schemas");

router.post("/sign-up", validateBody(authSchema), signUp);
router.post("/sign-in", validateBody(authSchema), signIn);

module.exports = router;
