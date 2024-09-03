import { Pool } from 'pg';
import { UserEntity } from '../../domain/entities/users/UserEntity';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { PostgresConnection } from '../../infrastructure/database/PostgresConnection';

export class UserRepository implements IUserRepository {
    private db: Pool;

    constructor() {
        this.db = PostgresConnection.getInstance();
    }

    async save(user: UserEntity): Promise<UserEntity> {
        const query = `
            INSERT INTO users (id, name, username, email, password) 
            VALUES ($1, $2, $3, $4,  $5) 
            RETURNING id, name, email, password
        `;
        const result = await this.db.query(query, [user.id, user.name, user.username, user.email, user.password]);

        return result.rows[0];

    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await this.db.query(query, [email]);
        if (result.rows.length > 0) {
            const { name, username, password, updatedAt, deletedAt } = result.rows[0];
            return UserEntity.create({ name, username, email, password, updatedAt, deletedAt });
        }
        return null;

    }
}
