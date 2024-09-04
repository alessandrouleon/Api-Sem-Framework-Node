import { CreateUserDTO } from "../../application/dtos/users/CreateUserDTO";
import { UserEntity } from "../entities/users/UserEntity";

export interface IUserRepository {
    create(user: CreateUserDTO): Promise<UserEntity>;
    update(id: string, data: UserEntity): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;

}
