import { register, login,logout } from "../controllers/Login_controller.js";
import { Router } from "express";
import jwt from "jsonwebtoken"
import { User } from "../model/User.js";
import { upload } from "../middleware/multer_middleware.js";
import { verifyjwt } from "../middleware/verifyjwt.js"
import { updateBio } from "../controllers/detail_controller.js";
import {updateavatar,updateprofile} from "../controllers/detail_controller.js"
import {searchuser} from "../controllers/user_controller.js"
const router = Router();

router.post('/register',upload.single("avatar"),register);
router.post('/login',login)
router.post("/logout",verifyjwt,logout)
router.put("/bio",verifyjwt,updateBio)
router.put("/updateavatar",verifyjwt,updateavatar)
router.put("/updateprofile",verifyjwt,upload.single("avatar"),updateprofile)
router.get("/search",verifyjwt,searchuser)



router.get('/me', verifyjwt, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ loggedIn: true, user });
});

export default router;