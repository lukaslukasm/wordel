import { Router } from "express";
import { getUser, getUsers, updateUser } from "./handlers/user";
import { validationResult, body } from "express-validator";

const router = Router();

router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);

// gotta do err handler here as well, bc async errs from a router aint gonna bubble up to server.ts err handler

export default router;
