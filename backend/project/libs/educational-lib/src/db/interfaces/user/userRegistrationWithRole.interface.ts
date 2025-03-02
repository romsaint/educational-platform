import { IRegistrationUser } from "./userRegistration.interface";

export interface IRegistrationUserWithRole extends IRegistrationUser {
    role: 'ADMIN' | "ADMINISTRATOR"
}