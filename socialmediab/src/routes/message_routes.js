import express from "express"
import {messagehistory} from "../controllers/message.controller.js"
import { verifyjwt } from "../middleware/verifyjwt.js"


const router1 = express.Router();

router1.get("/conversations",verifyjwt,messagehistory);


export default router1;