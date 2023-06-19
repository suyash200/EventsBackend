import { Router } from "express";
import {  Login, Logout, Register } from "../controllers/auth.controllers.js";
import { ValidateLoginSchema, ValidateUserSchema } from "../model/User.model.js";

const router = Router();

router.post("/register",ValidateUserSchema, Register);
router.post("/login",ValidateLoginSchema, Login);
router.get('/logout',Logout)
export default router;
