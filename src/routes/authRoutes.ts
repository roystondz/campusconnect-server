import {Router} from 'express';
import { register, login } from "../controllers/authController";
import asyncHandler from '../utils/asynchandler';

const router = Router();


router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
