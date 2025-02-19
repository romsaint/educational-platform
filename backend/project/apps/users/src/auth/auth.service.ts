import { client, ILoginUser, IRegistrationUser, IUser } from '@app/educational-lib';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {
    async registration(user: IRegistrationUser) {
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
                INSERT INTO users (username, password,  unique_id)  
                VALUES ($1, $2, $3)
                RETURNING *
            `, [user.username, hashPassword, user.unique_id])).rows[0]

            const { password, ...data } = created

            return data
        } catch (e) {
            if (e instanceof Error) {
                throw new HttpException(e.message, 500)
            }
        }
    }

    async login(user: ILoginUser) {
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
                throw new HttpException(e.message, 500)
            }
        }
    }
}
