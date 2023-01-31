import { Router } from "express";

import db from "../../db";

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
  try {
    const books = await db.books.getAllBooks();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server on Fire" });
  }
});

bookRouter.get("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    const books = (await db.books.getOneBook(id))[0];
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server on Fire" });
  }
});

bookRouter.post("/", async (req, res) => {
  const { categoryid, title, author, price } = req.body;

  if (!categoryid || !title || !author || !price) return res.status(400).json({ message: "fill it all out!" });
  try {
    await db.books.addBook(categoryid, title, author, price);
    res.json({ message: `${title} added, get tuh readin'!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server on Fire" });
  }
});

bookRouter.put("/:id", async (req, res) => {
  let id = Number(req.params.id);
  const { categoryid, title, author, price } = req.body;

  if (!categoryid || !title || !author || !price) return res.status(400).json({ message: "fill it all out!" });
  try {
    const bookToEdit = { id, categoryid, title, author, price };
    await db.books.editBook(bookToEdit, id);
    res.json({ message: `${title} updated, get tuh readin'!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server on Fire" });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db.books.deleteBook(id);
    res.json({ message: "deleted af!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server on Fire" });
  }
});

export default bookRouter;
