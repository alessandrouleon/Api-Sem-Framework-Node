import { UserEntity } from '../../../domain/entities/users/UserEntity';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import AppError from '../../../infrastructure/errors/AppError';

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(data: UserEntity): Promise<UserEntity> {

        const [username, email] = await Promise.all([
            this.userRepository.findByUsername(data.username),
            this.userRepository.findByEmail(data.email)
        ]);

        if (username) {
            throw new AppError('Nome de usuário já cadastrado', 400);
        }

        if (email) {
            throw new AppError('Email já cadastrado', 400);
        }

        const user = UserEntity.createUser(data);

        return await this.userRepository.create(user);

    }
}
