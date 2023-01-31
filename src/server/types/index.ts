export interface Payload {
  id: number;
  email: string;
  role: 1;
}

declare global {
  namespace Express {
    interface User extends Payload {}
  }
}

export interface UserTable {
  id: number;
  email: string;
  password?: string;
  created_at?: Date;
}

export interface MysqlResponse {
  affectedRows?: number;
  insertID?: number;
}

export interface IBooks {
  id: number;
  categoryid: number;
  category?: string;
  title: string;
  author: string;
  price: number;
  _created?: Date | string;
}
export interface ICategory {
  id: number;
  name: string;
}
