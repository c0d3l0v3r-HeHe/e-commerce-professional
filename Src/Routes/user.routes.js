import { Router } from "express";
import registerUser from "../Controllers/user.controller.js";

const userRouter = Router()


userRouter.route("/register").post(registerUser)
// userRouter.route("/login").post(registerUser)
// userRouter.route("/register").get(registerUser)

export default userRouter;