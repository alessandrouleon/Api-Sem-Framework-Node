import { UserEntity } from '../../../domain/entities/users/UserEntity';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import AppError from '../../../infrastructure/errors/AppError';

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: UserEntity): Promise<UserEntity> {

        const userExists = await this.userRepository.findByEmail(data.email);

        if (userExists) {
            throw new AppError('Email já cadastrado', 400);
        }

        const user = UserEntity.create(data);

        return await this.userRepository.save(user);

    }
}
