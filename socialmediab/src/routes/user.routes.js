import { register, login } from "../controllers/Login_controller.js";
import { Router } from "express";
import jwt from "jsonwebtoken"
import { User } from "../model/User.js";
// import { verifyjwt } from "../middleware/auth.middleware";
import { verifyjwt } from "../controllers/imp.js";
const router = Router();

router.post('/register',register);
router.post('/login',login)

router.get('/me', verifyjwt, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ loggedIn: true, user });
});

export default router;