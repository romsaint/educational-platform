import { IUser } from "./user.inteface";

export interface IUserWitoutPassword extends Omit<IUser, 'password'> {

}