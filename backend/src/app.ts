import express from "express";
import type {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import { ApiError } from "./utils/ApiError";
import { userRouter } from "./routes/user.route";
import { fLog } from "./logger";
import { medicalDetailsRouter } from "./routes/medicalDetails.route";
import { authRouter } from "./routes/auth.route";

const app: Express = express();

// app configurations
app.set("trust proxy", true);

// middlewares
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRouter);
app.use("/api/medical-details", medicalDetailsRouter);
app.use("/api/auth", authRouter);

// health route
app.get("/health", (req, res) => {
  res.status(200).send("Ok...");
});

// not found route
app.get("*", (req, res, next) => {
  throw new Error("Route not found!!");
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  fLog.error(`[${req.originalUrl}] => ${err}`);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      details: err.errors,
    });
  } else {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
      details: err.errors || "",
    });
  }
});

export default app;
