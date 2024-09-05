import { UserEntity } from "../../../domain/entities/users/UserEntity";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(): Promise<UserEntity[] | null> {
        const getUserAll = await this.userRepository.findAll();
        return getUserAll;
    }
}