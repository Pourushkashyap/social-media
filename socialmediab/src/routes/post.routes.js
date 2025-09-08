import express from "express";
import { createPost,getuserPosts,likePost } from "../controllers/post_controller.js";
import { verifyjwt } from "../middleware/verifyjwt.js";
import { upload } from "../middleware/multer_middleware.js";


const router3 = express.Router();

router3.post("/",verifyjwt,upload.single('file'),createPost);

router3.get("/user/:userId",getuserPosts);
router3.put("/:postId/like", verifyjwt, likePost);


export default router3;