import { Pool } from 'pg';
import { UserEntity } from '../../domain/entities/users/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { PostgresConnection } from '../../infrastructure/database/PostgresConnection';
import { UserQueries, UserValues } from '../../infrastructure/database/queries/UserQuerys';


export class UserRepository implements IUserRepository {
    private db: Pool;

    constructor() {
        this.db = PostgresConnection.getInstance();
    }
    async create(user: UserEntity): Promise<UserEntity> {
        const values = UserValues(user);

        const result = (await this.db.query(UserQueries.INSERT_USER, values)).rows[0];
        return result;
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        const result = (await this.db.query(UserQueries.GET_USER_USERNAME, [username])).rows[0];
        return result || null;
    }


    async findByEmail(email: string): Promise<UserEntity | null> {
        const result = (await this.db.query(UserQueries.GET_USER_EMAIL, [email])).rows[0];
        return result || null;
    }


    // async findByEmail(email: string): Promise<UserEntity | null> {
    //     const query = 'SELECT * FROM users WHERE email = $1';
    //     const result = await this.db.query(query, [email]);
    //     if (result.rows.length > 0) {
    //         const { name, username, password, updatedAt, deletedAt } = result.rows[0];
    //         return UserEntity.createUser({ name, username, email, password, updatedAt, deletedAt });
    //     }
    //     return null;

    // }
}
