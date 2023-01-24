import * as passport from "passport";

import { Request, Response, NextFunction } from "express";

export function tokenCheck(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      res.status(401).json({ message: "Invalid Credential Authentication" });
      return;
    }
    if (info) {
      res.status(401).json({ message: info.message });
      return;
    }
    if (!user) {
      res.status(401).json({ message: "just start over, maybe dont come back}" });
      return;
    }
    req.user = user;
    return next();
  })(req, res, next);
}
