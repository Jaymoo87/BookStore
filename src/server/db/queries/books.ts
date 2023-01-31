import { Query } from "..";
import { IBooks } from "../../types";

export const getAllBooks = async () =>
  Query<IBooks[]>("SELECT b.*, c.name as category FROM books b JOIN categories c ON b.categoryid=c.id");
export const getOneBook = async (id: number) =>
  Query<IBooks>("SELECT b.*, c.name as category FROM books b JOIN categories c ON b.categoryid=c.id WHERE id=b.id", [
    id,
  ]);

export const addBook = async (categoryid: number, title: string, author: string, price: number) =>
  Query<IBooks[]>("INSERT INTO books (catergoryid, title, author, price) VALUES (?, ?, ?, ?)", [
    categoryid,
    title,
    author,
    price,
  ]);

export const editBook = async (bookToEdit: IBooks, id: number) =>
  Query("UPDATE books SET ? WHERE id=?", [bookToEdit, id]);

export const deleteBook = async (id: number) => Query("DELETE FROM books WHERE id=?", [id]);

export default {
  getAllBooks,
  getOneBook,
  addBook,
  editBook,
  deleteBook,
};
