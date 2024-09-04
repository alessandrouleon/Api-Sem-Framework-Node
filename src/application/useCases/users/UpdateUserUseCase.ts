import { UserEntity } from '../../../domain/entities/users/UserEntity';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import AppError from '../../../infrastructure/errors/AppError';

export class UpdateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string, data: UserEntity): Promise<UserEntity> {

        const userId = await this.userRepository.findById(id);
        // console.log("id e Data:::", id, data);
        // console.log("UserId:::", userId);

        if (!userId) {
            throw new AppError('Id não existe', 400);
        }
        // const [username, email] = await Promise.all([
        //     this.userRepository.findByUsername(data.username),
        //     this.userRepository.findByEmail(data.email)
        // ]);

        // if (username) {
        //     throw new AppError('Nome de usuário já cadastrado', 400);
        // }

        // if (email) {
        //     throw new AppError('Email já cadastrado', 400);
        // }

        // const user = UserEntity.updateUser(data);
        // console.log("UpdateUseCase:::", user);


        return await this.userRepository.update(id, { ...userId, updated_at: new Date() });

    }
}
