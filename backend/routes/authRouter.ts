import { Router } from "express";
import { asyncHandler } from "../utils/errorHandling.js";
import { login, register } from "../controller/auth.controllers.js";




const router = Router();
router.post("/register",asyncHandler(register));

router.post("/login", asyncHandler(login));



export default router