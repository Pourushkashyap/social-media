import { register, login } from "../controllers/Login_controller.js";
import { Router } from "express";
// import { verifyjwt } from "../middleware/auth.middleware";

const router = Router();

router.post('/register',register);
router.post('/login',login)



export default router;