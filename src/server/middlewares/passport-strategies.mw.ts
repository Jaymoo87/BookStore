import * as passport from "passport";
import * as PassportLocal from "passport-local";
import * as PassportJWT from "passport-jwt";

import config from "../config";
import db from "../db";
import { AuthorsTable } from "../db/models";
import { Payload } from "../types";
import { Application } from "express";
import { compareHash } from "../utils/passwords";

export function configurePassport(app: Application) {
  passport.serializeUser((user: AuthorsTable, done) => {
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
          const [authorFound] = await db.authors.find("email", email);
          if (authorFound && compareHash(password, authorFound.password!)) {
            delete authorFound.password;
            done(null, authorFound);
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
