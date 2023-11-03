import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import validationMiddleware from "../middleware/tokenHandler.middleware";

const router = Router();

router.post("/register-customers", UserController.createCustomer);
router.get("/all-customers", UserController.getAllCustomer);
router.post("/login", UserController.loginUser);
router.get("/current-user", validationMiddleware, UserController.currentUser);
router.post("/update-searchCount", UserController.updateUser);

export default router;
