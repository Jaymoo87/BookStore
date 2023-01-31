import * as jwt from "jsonwebtoken";

import { Router } from "express";
import { generateHash } from "../../utils/passwords";

import db from "../../db";
import config from "../../config";

const registerRouter = Router();

registerRouter.post("/", async (req, res) => {
  const newUser = req.body;

  try {
    newUser.password = generateHash(newUser.password);
    const result = await db.users.registerUser(newUser);

    const token = jwt.sign({ userid: result.insertID, email: newUser.email, role: 1 }, config.jwt.secret, {
      expiresIn: "20d",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "SIU, FIU (server)" });
  }
});

export default registerRouter;
