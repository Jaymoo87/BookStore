import { Router } from "express";
import db from "../../db";

const catRouter = Router();

catRouter.get("/", async (req, res) => {
  try {
    const categories = await db.categories.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server on Fire" });
  }
});

catRouter.get("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    const categories = await db.categories.getOneCategory(id);
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server on Fire" });
  }
});

export default catRouter;
