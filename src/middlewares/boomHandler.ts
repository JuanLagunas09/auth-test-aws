import { Request, Response, NextFunction } from "express";
import { isBoom } from "@hapi/boom";

export const boomHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isBoom(error)) {
    const { statusCode, payload } = error.output;
    res.status(statusCode).json({
      statusCode,
      message: payload.message,
      error: payload.error,
    });
  }
  next(error);
};
