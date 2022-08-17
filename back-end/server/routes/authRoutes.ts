import express from "express";
import authUsers from "../controller/authUser";
import { validateRegister } from "../middleware/validateRegister";
const router = express.Router();

router.post("/register", validateRegister, authUsers.register);

router.post("/activate", authUsers.activeAccount);
router.post("/login", authUsers.login);
router.post("/facebook", authUsers.facebookLogin);
export default router;
