import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "../../application/interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      body: request.body,
      headers: request.headers as Record<string, string>,
      account: request.metadata?.account,
    });

    if ("statusCode" in result) {
      const { body, statusCode } = result;
      return response.status(statusCode).json(body);
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };

    next();
  };
}
