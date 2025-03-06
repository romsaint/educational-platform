import { IUser } from "./user.interface";

export interface IUserWitoutPassword extends Omit<IUser, 'password'> {

}