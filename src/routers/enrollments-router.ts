import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getEnrollmentByUser, postCreateOrUpdateEnrollment, getAddressFromCEP } from "@/controllers";
import { createEnrollmentSchema } from "@/schemas";

const enrollmentsRouter = Router();

enrollmentsRouter
  .get("/cep", getAddressFromCEP)
  .all("/*", authenticateToken)
  .get("/", getEnrollmentByUser)
  .post("/", validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment);
<<<<<<< HEAD
=======

>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
export { enrollmentsRouter };
