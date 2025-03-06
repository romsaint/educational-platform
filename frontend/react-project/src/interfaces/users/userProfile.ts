import { UserRoles } from "./user.interface";

export interface IUserProfile {
    id: number,
    unique_id: string,
    username: string,
    date_created: Date,
    role: UserRoles,
    avatar: string,
}