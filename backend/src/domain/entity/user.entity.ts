import { randomUUID } from "node:crypto";

export interface IUser {
  id?: string;
  name: string;
  cpfCnpj: string;
  email: string;
  password: string;
  token?: string;
}

export class UserEntity {
  protected id: string;
  protected name: string;
  protected cpfCnpj: string;
  protected email: string;
  protected password: string;
  protected token?: string;

  constructor(data: IUser) {
    this.id = data.id ?? randomUUID();
    this.name = data.name;
    this.cpfCnpj = data.cpfCnpj;
    this.email = data.email;
    this.password = data.password;
    this.token = data.token;
  }

  public get getUserEntity(): IUser {
    return {
      id: this.id,
      cpfCnpj: this.cpfCnpj,
      email: this.email,
      name: this.name,
      password: this.password,
      token: this.token,
    };
  }

  public set setToken(token: string) {
    this.token = token;
  }
}
