import { client, IRegistrationUser, IUser } from '@app/educational-lib';
import { HttpException, Injectable, OnModuleDestroy, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    async registration(user: IRegistrationUser, res: Response) {
        try {
            const isExists = (await client.query(`
                SELECT unique_id FROM users
                WHERE unique_id = $1  
            `, [user.unique_id])).rows[0]
            
            if (isExists) {
                throw new UnauthorizedException('User already exists!')

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
}
