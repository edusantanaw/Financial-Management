import { IUser } from "../entity/user.entity";

export type ICreateUserData = Omit<IUser, "token">;

export interface ICreateUserContract {
  execute(data: ICreateUserData): Promise<IUser>;
}
