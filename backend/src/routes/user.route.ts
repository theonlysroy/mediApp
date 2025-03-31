import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserDetails,
  getUserDetailsById,
  updateUser,
} from "../controllers/user.controller";
import validate from "../middlewares/requestValidator";
import {
  createUserSchema,
  deleteUserSchema,
  getUserDetailsByIdSchema,
  getUserDetailsSchema,
  updateUserSchema,
} from "../schema/userRequest.schema";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

// create user
router.post(
  "/create-user",
  upload.single("avatar"),
  validate(createUserSchema),
  createUser,
);

// update user
router.route("/update-user/:id").put(validate(updateUserSchema), updateUser);

// delete user (hard delete)
router.route("/delete-user/:id").delete(validate(deleteUserSchema), deleteUser);

// retrieve user
router
  .route("/get-user-details")
  .get(validate(getUserDetailsSchema), getUserDetails);

// retrieve user by id
router
  .route("/get-user-details/:id")
  .get(validate(getUserDetailsByIdSchema), getUserDetailsById);

export { router as userRouter };
