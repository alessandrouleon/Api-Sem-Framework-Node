import { UserEntity } from '../../../domain/entities/users/UserEntity';
import { Email } from '../../../domain/entities/users/valueObjects/Email';
import { Password } from '../../../domain/entities/users/valueObjects/Password';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import AppError from '../../../infrastructure/errors/AppError';

export class UpdateUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string, data: UserEntity): Promise<UserEntity> {

        const userId = await this.userRepository.findById(id);

        if (!userId) {
            throw new AppError('Id não existe', 400);
        }

        if (userId.username !== data.username) {
            const getUsername = await this.userRepository.findByUsername(data.username);
            if (getUsername) {
                throw new AppError('Nome de usuário já cadastrado', 400);
            }

        }

        if (userId.email !== data.email) {
            const getEmail = await this.userRepository.findByEmail(data.email);
            if (getEmail) {
                throw new AppError('Email já cadastrado', 400);
            }

        }

        // Cria os Instanci e Email e Password Value Objects
        const userEmail = new Email(data.email);
        const userPassword = new Password(data.password);


        const user = UserEntity.updateUser({
            ...data,
            email: userEmail.getValue(),
            password: userPassword.getValue()
        });

        return await this.userRepository.update(id, { ...user });

    }
}
