import { SignUpUseCase } from "../application/useCases/SignUpUseCase";

export function makeSignUpUseCase() {
  const SALT = 12;

  return new SignUpUseCase(SALT);
}
