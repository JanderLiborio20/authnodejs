import { Request, Response } from "express";
import { IMiddleware } from "../../application/interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response) => {
    const result = await middleware.handle({
      headers: request.headers as Record<string, string>,
    });

    if ("statusCode" in result) {
      const { body, statusCode } = result;
      return response.status(statusCode).json(body);
    }
  };
}
