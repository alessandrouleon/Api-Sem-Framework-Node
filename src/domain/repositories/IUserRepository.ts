import { UserEntity } from "../entities/users/UserEntity";

export interface IUserRepository {
    create(user: UserEntity): Promise<UserEntity>;
    update(id: string, data: UserEntity): Promise<UserEntity>;
    delete(id: string, data: UserEntity): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[] | null>;
}
