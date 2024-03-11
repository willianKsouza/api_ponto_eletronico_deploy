import { IFilterEmployee } from "./IFilterEmployee";
import { IUser } from "./IUser";
import { IUserToken } from "./IuserToken";

export interface ICreateRepository {
  create(data: Omit<IUser, "employee_id">): Promise<IUser | null>;
}
export interface IFindByEmailRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
export interface IFindCredentialsRepository {
  findOne({
    email,
    password,
  }: Pick<IUser, "email" | "password">): Promise<IUser | null>;
}
export interface IFindByIdRepository {
  findById(id: string): Promise<IUser | null>;
}

export interface IFindAllRepository {
  findAll(): Promise<IUser[] | null>;
}
export interface IFindEmployeeByFilterRepository {
  findByFilter(data: IFilterEmployee): Promise<IUser[] | null>;
}
export interface IUpdateRepository {
  update(id: string, param: Partial<IUser>): Promise<IUser | null>;
}
export interface IDeleteRepository {
  delete(id: string): Promise<IUser | null>;
}

export interface IFindByTokenRepository {
  findByToken(Token: string): Promise<IUserToken | null>;
}
export interface ICreateUserTokenRepository {
  createUserToken(employee_id: string): Promise<IUserToken | null>;
}
