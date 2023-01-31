import { Query } from "..";
import { ICategory } from "../../types";

export const getAllCategories = async () => Query<ICategory[]>("SELECT * FROM categories");
export const getOneCategory = async (id: number) => Query<ICategory[]>("SELECT * FROM categories WHERE id=?", [id]);

export default {
  getAllCategories,
  getOneCategory,
};
