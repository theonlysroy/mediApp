import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";
import validate from "../middlewares/requestValidator";
import {
  loginUserSchema,
  logoutUserSchema,
} from "../schema/authRequest.schema";

const router = Router({});

// login
router.route("/user-login").post(validate(loginUserSchema), loginUser);

// logout
// router.route("/user-logout").post(validate(logoutUserSchema));

// refresh tokens

// expire session

export { router as authRouter };
