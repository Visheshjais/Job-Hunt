import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, upload.single("file"), updateProfile);

export default router;
