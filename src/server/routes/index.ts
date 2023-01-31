import { Router } from "express";

import apiRouter from "./api";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);

export default indexRouter;
