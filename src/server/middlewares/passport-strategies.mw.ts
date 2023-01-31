import * as passport from "passport";
import * as PassportLocal from "passport-local";
import * as PassportJWT from "passport-jwt";

import { UserTable } from "../types";
import { Payload } from "../types";
import { Application } from "express";
import { compareHash } from "../utils/passwords";

import db from "../db";
import config from "../config";

export function configurePassport(app: Application) {
  passport.serializeUser((user: UserTable, done) => {
    if (user.password) {
      delete user.password;
    }
    done(null, user);
    return;
  });
  passport.deserializeUser((user, done) => done(user, null));

  passport.use(
    new PassportLocal.Strategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const [userFound] = await db.users.findUser("email", email);
          if (userFound && compareHash(password, userFound.password!)) {
            delete userFound.password;
            done(null, userFound);
            return;
          } else {
            done(null, false, { message: "invalid creds... get your fingers right" });
            return;
          }
        } catch (error) {
          done(error);
          return;
        }
      }
    )
  );

  passport.use(
    new PassportJWT.Strategy(
      {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
      },
      (payload: Payload, done) => {
        try {
          return done(null, payload);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  app.use(passport.initialize());
}
