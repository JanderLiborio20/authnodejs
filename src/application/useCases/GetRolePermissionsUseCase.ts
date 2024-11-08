import { prismaClient } from "../libs/prismaClient";

interface IInpunt {
  roleId: string;
}

interface IOutput {
  permissionsCode: string[];
}

export class GetRolePermissionsUseCase {
  async execute({ roleId }: IInpunt): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: { roleId },
      select: { permissionCode: true },
    });

    const permissionsCodes = rolePermissions.map(
      (rolePermission) => rolePermission.permissionCode
    );

    return {
      permissionsCode: permissionsCodes,
    };
  }
}
