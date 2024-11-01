import { IController } from "../../application/interfaces/IController";
import { Request, Response } from "express";

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { body, statusCode } = await controller.handle({
      body: request.body,
      accountId: request.metadata?.accountId,
    });

    response.status(statusCode).json(body);
  };
}
