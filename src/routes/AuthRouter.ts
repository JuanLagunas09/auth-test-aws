import express from "express";
import * as AuthController from "../controllers/AuthController";

const Router = express.Router();

Router.get("/hello", AuthController.hello);
Router.post("/signup", AuthController.signUp);

export default Router;