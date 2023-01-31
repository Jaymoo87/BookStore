import { Router } from "express";
import bookRouter from "./books";
import catRouter from "./categories";

const apiRouter = Router();

apiRouter.use("/categories", catRouter);
apiRouter.use("/books", bookRouter);

export default apiRouter;
