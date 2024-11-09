import { Request, Response, NextFunction } from "express";
import { AuthService } from "../servicies/AuthService";

const authService = new AuthService();

export const hello = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const result = await authService.hello();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const signUp = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const result = await authService.signUp(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        throw error;
    }
}