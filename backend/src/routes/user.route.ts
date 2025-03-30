import { Router } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";
import validate from "../middlewares/requestValidator";
import { createUserSchema } from "../schema/userRequest.schema";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

// create user
// router.route("/create-user").post(validate(createUserSchema), createUser);
router.post(
  "/create-user",
  validate(createUserSchema),
  upload.single("avatar"),
  createUser,
);

// update user
router.route("/update-user/:id").put(updateUser);

// delete user (hard delete)
router.route("/delete-user/:id").delete(deleteUser);

export { router as userRouter };
