import { Router } from "express";

import apiRouter from "./api";
import authRouter from "./auth";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;
