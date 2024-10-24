import { env } from "../config/env";
import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from "../interfaces/IMiddleware";
import { verify } from "jsonwebtoken";

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: "Invalid credentials.",
        },
      };
    }

    try {
      const [bearer, token] = authorization.split(" ");

      if (bearer !== "Bearer") {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret);

      return {
        data: {
          accountId: payload.sub,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: "Invalid credentials.",
        },
      };
    }
  }
}
