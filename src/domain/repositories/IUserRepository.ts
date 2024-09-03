import { UserEntity } from "../entities/users/UserEntity";

export interface IUserRepository {
    save(user: UserEntity): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity | null>;
}
