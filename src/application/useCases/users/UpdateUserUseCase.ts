import { UserEntity } from '../../../domain/entities/users/UserEntity';
import { Email } from '../../../domain/entities/users/valueObjects/Email';
import { Password } from '../../../domain/entities/users/valueObjects/Password';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import AppError from '../../../infrastructure/errors/AppError';
import { UpdateUserDTO } from '../../dtos/users/UpdateUserDTO';
import { EncryptionService } from '../../services/EncryptionService';

export class UpdateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private encryptionService: EncryptionService
    ) { }

    async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {

        const userId = await this.userRepository.findById(id);

        if (!userId) {
            throw new AppError('Id não existe', 400);
        }

        if (data.username && userId.username !== data.username) {
            const getUsername = await this.userRepository.findByUsername(data.username);
            if (getUsername) {
                throw new AppError('Nome de usuário já cadastrado', 400);
            }
        }

        if (data.email && userId.email !== data.email) {
            const getEmail = await this.userRepository.findByEmail(data.email);
            if (getEmail) {
                throw new AppError('Email já cadastrado', 400);
            }
        }

        // Atualiza os campos apenas se forem fornecidos, senão mantém os antigos
        const updatedData: UpdateUserDTO = {
            id: userId.id,
            name: data.name || userId.name,
            username: data.username || userId.username,
            email: data.email ? new Email(data.email).getValue() : userId.email,
            password: data.password ? await this.encryptionService.hashPassword(new Password(data.password).getValue()) : userId.password,
        };

        const user = UserEntity.updateUser(updatedData);

        return await this.userRepository.update(id, { ...user });

    }
}
