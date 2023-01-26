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
