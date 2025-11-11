import express from "express"
import { register_user, login_user,logout_user,get_current_user, updateName, changePassword, deleteAccount} from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { rateLimit } from "../middlewares/rateLimit.middleware.js"

const router = express.Router()

router.post("/register", register_user)
router.post("/login", rateLimit, login_user)
router.post("/logout", logout_user)
router.get("/me", authMiddleware,get_current_user)
router.put("/update-name", authMiddleware, updateName);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);
export default router