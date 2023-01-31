import * as jwt from "jsonwebtoken";
import * as passport from "passport";

import config from "../../config";

import { Router } from "express";

const loginRouter = Router();

loginRouter.post("/", passport.authenticate("local", { session: false }), (req, res) => {
  try {
    const token = jwt.sign({ id: req.user?.id, email: req.user?.email }, config.jwt.secret, {
      expiresIn: "20d",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "suckit and fuckit (server)" });
  }
});

export default loginRouter;
