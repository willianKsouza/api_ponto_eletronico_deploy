import { IUser } from "../../src/shared/interfaces/IUser";
import {
  ICreateRepository,
  IDeleteRepository,
  IFindAllRepository,
  IFindByEmailRepository,
  IUpdateRepository,
  IFindCredentialsRepository,
  IFindByIdRepository,
  IFindByTokenRepository,
  ICreateUserTokenRepository,
  IFindEmployeeByFilterRepository
} from "../../src/shared/interfaces/IEmployeeRepository";
import { prisma } from "../../src/data/connectDb";
import { IUserToken } from "../../src/shared/interfaces/IuserToken";
import { IFilterEmployee } from "../../src/shared/interfaces/IFilterEmployee";

export class CreateRepository implements ICreateRepository {
  async create(param: Omit<IUser, "employee_id">): Promise<IUser | null> {
    const employee = await prisma().employees.create({ data: param });
    return employee;
  }
}

export class UpdateRepository implements IUpdateRepository {
  async update(id: string, param: Partial<IUser>): Promise<IUser | null> {
    const employee = await prisma().employees.update({
      where: {
        employee_id: id,
      },
      data: param,
    });
    return employee;
  }
}

export class FindAllRepository implements IFindAllRepository {
  async findAll(): Promise<IUser[] | null> {
    const employee = await prisma().employees.findMany();
    return employee;
  }
}

//https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined
//TROCAR PARA OR operator no prisma
export class FindByFilterRepository implements IFindEmployeeByFilterRepository  {
  async findByFilter(data: IFilterEmployee): Promise<IUser[] | null> {
    let where: any = {}

    if (data.name_employee) {
      where.name_employee = { startsWith:data.name_employee }
    }
    if (data.email) {
      where.email = { startsWith:data.email }
    }
    if (data.function_employee) {
      where.function_employee = { startsWith:data.function_employee }
    }
    if (data.createdAt) {
      where.createdAt = { contains:data.createdAt }
    }
    if (data.workload_employee) {
      where.workload_employee = { contains:data.workload_employee }
    }

    const employee = await prisma().employees.findMany({ where });
    return employee;
  }
}

export class FindCredentialsRepository implements IFindCredentialsRepository {
  async findOne({
    email,
    password,
  }: Pick<IUser, "email" | "password">): Promise<IUser | null> {
    const employee = await prisma().employees.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    return employee;
  }
}
export class FindByIdRepository implements IFindByIdRepository {
  async findById(id: string): Promise<IUser | null> {
    const employee = await prisma().employees.findUnique({
      where: {
        employee_id: id,
      },
    });
    return employee;
  }
}

export class FindByEmailRepository implements IFindByEmailRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    const employee = await prisma().employees.findUnique({
      where: {
        email: email,
      },
    });
    return employee;
  }
}

export class DeleteRepository implements IDeleteRepository {
  async delete(id: string): Promise<IUser | null> {
    const employee = await prisma().employees.delete({
      where: {
        employee_id: id,
      },
    });
    return employee;
  }
}

export class FindByTokenRepository implements IFindByTokenRepository {
  async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = await prisma().userToken.findFirst({
      where: {
        token: token,
      },
    });
    return userToken;
  }
}

export class CreateUserToken implements ICreateUserTokenRepository {
  async createUserToken(employee_id: string): Promise<IUserToken | null> {
    const userToken = await prisma().userToken.create({
      data: { employee_id },
    });
    return userToken;
  }
}
