import { Query } from "..";
import { MysqlResponse, UserTable } from "../../types";

const findUser = (column: string, value: string) =>
  Query<UserTable[]>("SELECT * FROM users WHERE ?? = ?", [column, value]);
const registerUser = (newUser: { email: string; password: string }) =>
  Query<MysqlResponse>("INSERT INTO users SET ?", [newUser]);

export default {
  findUser,
  registerUser,
};
