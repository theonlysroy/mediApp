import { Router } from "express";
import {
  addAllergies,
  addMedicineUsage,
  addPastSurgeries,
} from "../controllers/medicalDetails.controller";
import validate from "../middlewares/requestValidator";
import {
  addAllergiesSchema,
  addMedicineUsageSchema,
  addPastSurgeriesSchema,
} from "../schema/medicalDetailsRequest.schema";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

// add medicine usage
router
  .route("/add-medicine-usage")
  .post(auth, validate(addMedicineUsageSchema), addMedicineUsage);

// add past surgeries
router
  .route("/add-past-surgeries")
  .post(auth, validate(addPastSurgeriesSchema), addPastSurgeries);

// add allergies
router
  .route("/add-allergies")
  .post(auth, validate(addAllergiesSchema), addAllergies);

export { router as medicalDetailsRouter };
