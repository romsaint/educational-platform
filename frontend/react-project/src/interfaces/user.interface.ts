export type UserRoles = 'USER' | 'ADMIN' | 'MODERATOR'

export interface IUser {
    id: number,
    unique_id: string,
    username: string,
    password: string,
    date_created: Date,
    role: UserRoles,
    avatar: string
}