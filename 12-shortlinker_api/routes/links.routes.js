import { Router } from "express";

import {
  controllerCreateShortedLink,
  controllerGetShortLink,
} from "../controllers/links.controllers.js";

const router = new Router();

router.post("/links", controllerCreateShortedLink);
router.get("/:marker", controllerGetShortLink);

export default router;
