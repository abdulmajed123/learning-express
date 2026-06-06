import { Router, type Request, type Response } from "express";
import { pool } from "../../db/index.js";
import { userController } from "./user.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.post("/", userController.createUser);
router.get("/", auth(), userController.getAllUser);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.UpdateUser);
router.delete("/:id", userController.deleteUser);
export const userRoute = router;
