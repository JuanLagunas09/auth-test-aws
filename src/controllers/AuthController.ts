import { Request, Response, NextFunction } from "express";
import { AuthService } from "../servicies/AuthService";

const authService = new AuthService();

export const hello = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.hello();
    res.status(200).send(result);
  } catch (error) {
    console.log("error controller auth hello", error);
    next(error);
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.signUp(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log("error controller auth signUp", error);
    next(error);
  }
};

export const VerifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, code } = req.body;
    const result = await authService.VerifyEmail(username, code);
    res.status(200).json(result);
  } catch (error) {
    console.log("error controller auth VerifyEmail", error);
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const result = await authService.signIn(username, password);
    res.status(200).json(result);
  } catch (error) {
    console.log("error controller auth signIn", error);
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const result = await authService.forgotPassword(username);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const confirmForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, code, password } = req.body;
    const result = await authService.confirmForgotPassword(
      username,
      code,
      password
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
