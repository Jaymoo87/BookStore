import { Router } from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import { tokenCheck } from "../../middlewares/auth.mw";

const authRouter = Router();

authRouter.get("/token_status", tokenCheck, async (req, res) => {
  res.status(200).json({ message: "Token Present" });
});

authRouter.use("/login", loginRouter);
authRouter.use("/register", registerRouter);

export default authRouter;
