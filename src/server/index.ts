import express from "express";
import { SignUpController } from "../application/controllers/SignUpController";
import { SignInController } from "../application/controllers/SignInController";
import { SignUpUseCase } from "../application/useCases/SignUpUseCase";
import { SignInUseCase } from "../application/useCases/SignInUseCase";

const app = express();

app.use(express.json());

app.post("/sign-up", async (request, response) => {
  const SALT = 12;
  const signUpUseCase = new SignUpUseCase(SALT);
  const signUpController = new SignUpController(signUpUseCase);

  const { body, statusCode } = await signUpController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.post("/sign-in", async (request, response) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInController(signInUseCase);

  const { body, statusCode } = await signInController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
});
