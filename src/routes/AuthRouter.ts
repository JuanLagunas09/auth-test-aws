import express from "express";
import * as AuthController from "../controllers/AuthController";
import passport from "passport";

const Router = express.Router();

Router.get("/hello", AuthController.hello);
Router.post(
  "/signup",
  // other strategyJWT
  passport.authenticate("jwt-user-msv", { session: false }),
  AuthController.signUp
);
Router.post("/verify", AuthController.VerifyEmail);
Router.post("/signin", AuthController.signIn);
Router.get(
  "/profile-cognito",
  passport.authenticate("jwt", { session: false }),
  AuthController.profile
);
Router.post("/forgotpassword", AuthController.forgotPassword);
Router.post("/confirmforgotpassword", AuthController.confirmForgotPassword);
Router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  AuthController.logOut
);

export default Router;
