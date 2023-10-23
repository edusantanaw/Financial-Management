import { IUser } from "../entity/user.entity";

type ICreateUserData = Omit<IUser, "token">;

export interface ICreateUserContract {
  execute(data: ICreateUserData): Promise<IUser>;
}
