import { client, ILoginUser, IRegistrationUser, IRegistrationUserWithRole, IUser, IUserWitoutPassword } from '@app/educational-lib';
import { HttpException, Injectable } from '@nestjs/common';
import { uniqueFileName } from 'apps/shared/uniqueFilename';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {
    async registration(user: IRegistrationUser, file: Express.Multer.File | undefined): Promise<IUserWitoutPassword | {[key: string]: any}> {
        try {
            const isExists: IUser = (await client.query(`
                SELECT unique_id FROM users
                WHERE unique_id = $1  
            `, [user.unique_id])).rows[0]
            
            if (isExists) {
                 return {ok: false, msg: 'User already exists!'}
            }
     
            const hashPassword = await bcrypt.hash(user.password, 10)
            let fileName
            if(file) {
                fileName = uniqueFileName(file)
            }

            const created: IUser = (await client.query(`
                INSERT INTO users (username, password,  unique_id, avatar)  
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `, [user.username, hashPassword, user.unique_id, fileName ? fileName : null])).rows[0]

            const { password, ...data } = created

            return data
        } catch (e) {
            if (e instanceof Error) {
                return {ok: false, msg: e.message}
            }
            return {ok: false, msg: 'Error ('}
        }
    }

    async login(user: ILoginUser): Promise<IUserWitoutPassword | {[key: string]: any}> {
        try {
            const isExists: IUser = (await client.query(`
                SELECT * FROM users
                WHERE unique_id = $1  
            `, [user.unique_id])).rows[0]
            
            if (!isExists) {
                return {ok: false, msg: 'User not found!'}
            }
     
            const hashPassword = await bcrypt.compare(user.password, isExists.password)

            if(hashPassword) {
                const { password, ...data } = isExists

                return data
            }else{
                return {ok: false, msg: "Password doesn't match"}
            }
        } catch (e) {
            if (e instanceof Error) {
                return {ok: false, msg: e.message}
            }
            return {ok: false, msg: 'Error ('}
        }
    }

    async registrationWithRole(user: IRegistrationUserWithRole): Promise<IUserWitoutPassword | {[key: string]: any}> {
        try {
            const isExists: IUser = (await client.query(`
                SELECT unique_id FROM users
                WHERE unique_id = $1  
            `, [user.unique_id])).rows[0]
            
            if (isExists) {
                 return {ok: false, msg: 'User already exists!'}
            }
     
            const hashPassword = await bcrypt.hash(user.password, 10)

            const created: IUser = (await client.query(`
                INSERT INTO users (username, password, unique_id, role)  
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `, [user.username, hashPassword, user.unique_id, user.role])).rows[0]

            const { password, ...data } = created

            return data
        } catch (e) {
            if (e instanceof Error) {
               return {ok: false, msg: e.message}
            }
            return {ok: false, msg: 'Error ('}
        }
    }
}
