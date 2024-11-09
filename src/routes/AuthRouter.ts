import express from "express";
import * as AuthController from "../controllers/AuthController";

const Router = express.Router();

Router.get("/hello", AuthController.hello);
Router.post("/signup", AuthController.signUp);
Router.post("/verify", AuthController.VerifyEmail);
Router.post("/signin", AuthController.signIn);
Router.post("/forgotpassword", AuthController.forgotPassword);
Router.post("/confirmforgotpassword", AuthController.confirmForgotPassword);

export default Router;