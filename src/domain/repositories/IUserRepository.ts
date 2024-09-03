import { UserEntity } from "../entities/users/UserEntity";

export interface IUserRepository {
    create(user: UserEntity): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
}
