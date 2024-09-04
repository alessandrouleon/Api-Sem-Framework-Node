import { Pool } from 'pg';
import { UserEntity } from '../../domain/entities/users/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { PostgresConnection } from '../../infrastructure/database/PostgresConnection';
import { CreateValues, UpdateValues, UserQueries } from '../../infrastructure/database/queries/UserQuerys';


export class UserRepository implements IUserRepository {
    private db: Pool;

    constructor() {
        this.db = PostgresConnection.getInstance();
    }

    public async create(user: UserEntity): Promise<UserEntity> {
        const values = CreateValues(user);
        const result = (await this.db.query(UserQueries.INSERT_USER, values)).rows[0];
        return result;
    }

    public async update(id: string, data: UserEntity): Promise<UserEntity> {
        const values = UpdateValues(id, data);
        const result = (await this.db.query(UserQueries.UPDATE_USER, values)).rows[0];
        return result || null;
    }

    public async findById(id: string): Promise<UserEntity | null> {
        const result = (await this.db.query(UserQueries.GET_USER_BY_ID, [id])).rows[0];
        return result || null;
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        const result = (await this.db.query(UserQueries.GET_USER_USERNAME, [username])).rows[0];
        return result || null;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const result = (await this.db.query(UserQueries.GET_USER_EMAIL, [email])).rows[0];
        return result || null;
    }

}
