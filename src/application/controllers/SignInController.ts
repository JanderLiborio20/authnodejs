import { IController, IRequest, IResponse } from "../interfaces/IController";
import { z, ZodError } from "zod";
import { SignInUseCase } from "../useCases/SignInUseCase";
import { InvalidCredentials } from "../errors/InvalidCredentials";

const shema = z.object({
  password: z.string().min(8),
  email: z.string().email().min(1),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = shema.parse(body);

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });

      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: "Invalid credentials.",
          },
        };
      }

      throw error;
    }
  }
}
