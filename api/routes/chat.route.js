import express from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read", verifyToken, readChat);

export default router;
