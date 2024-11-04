import { IController } from "../../application/interfaces/IController";
import { Request, Response } from "express";

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { body, statusCode } = await controller.handle({
      body: request.body,
      headers: request.headers as Record<string, string>,
      account: request.metadata?.account,
    });

    response.status(statusCode).json(body);
  };
}
