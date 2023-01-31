import * as mysql from "mysql";

import config from "../config";

import categories from "./queries/categories";
import books from "./queries/books";
import users from "./queries/users";

const pool = mysql.createPool(config.mysql);

export const Query = <T = mysql.OkPacket>(query: string, values: unknown[] = []) => {
  return new Promise<T>((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

export default {
  categories,
  books,
  users,
};
