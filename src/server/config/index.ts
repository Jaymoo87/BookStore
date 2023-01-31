import * as dotenv from "dotenv";

dotenv.config();

export default {
  mysql: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT),
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
};
