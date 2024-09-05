import { UserEntity } from '../../../domain/entities/users/UserEntity';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import AppError from '../../../infrastructure/errors/AppError';

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string): Promise<UserEntity> {

        const userId = await this.userRepository.findById(id);

        if (!userId) {
            throw new AppError('Id não existe', 400);
        }

        const user = UserEntity.deleteUser(
            userId
        );

        return await this.userRepository.delete(id, { ...user });

    }
}
