import { singInPost } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singInPost);

<<<<<<< HEAD

=======
>>>>>>> 37c1102d7f1349f679ba1046f56e480624bbbc6b
export { authenticationRouter };
