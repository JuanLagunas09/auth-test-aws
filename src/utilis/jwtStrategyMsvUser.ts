import passport from "passport";
import {
  Strategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import { config } from "../config/config";
import boom from "@hapi/boom";

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_CONNECT!,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    if (payload.token_connect === config.TOKEN_CONNECT) {
      return done(null, payload);
    }
    return done(boom.unauthorized("Unauthorized user register"), false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use("jwt-user-msv", jwtStrategy);
