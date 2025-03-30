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
  getUserDetailsByIdSchema,
  getUserDetailsSchema,
} from "../schema/userRequest.schema";
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

// retrieve user
router
  .route("/get-user-details")
  .get(validate(getUserDetailsSchema), getUserDetails);

// retrieve user by id
router
  .route("/get-user-details/:id")
  .get(validate(getUserDetailsByIdSchema), getUserDetailsById);

export { router as userRouter };
