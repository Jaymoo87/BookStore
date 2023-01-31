import { Router } from "express";
import catRouter from "./categories";

const apiRouter = Router();

apiRouter.use("/categories", catRouter);

export default apiRouter;
