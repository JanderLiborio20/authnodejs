import { hash } from "bcryptjs";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";
import { prismaClient } from "../libs/prismaClient";

interface IInpunt {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute({ email, name, password }: IInpunt): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hasgedPassword = await hash(password, 12);

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hasgedPassword,
      },
    });
  }
}
