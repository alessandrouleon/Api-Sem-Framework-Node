import { UserEntity } from '../../../domain/entities/users/UserEntity';
import { Email } from '../../../domain/entities/users/valueObjects/Email';
import { Password } from '../../../domain/entities/users/valueObjects/Password';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import AppError from '../../../infrastructure/errors/AppError';
import { CreateUserDTO } from '../../dtos/users/CreateUserDTO';
import { EncryptionService } from '../../services/EncryptionService';

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private encryptionService: EncryptionService
    ) { }

    async execute(data: CreateUserDTO): Promise<UserEntity> {

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

        // Cria os Instanci e Email e Password Value Objects
        const userEmail = new Email(data.email);
        const userPassword = new Password(data.password);


        const user = UserEntity.createUser({
            ...data,
            email: userEmail.getValue(),
            password: userPassword.getValue()
        });

        //Criptografar senha
        const hashPassword = await this.encryptionService.hashPassword(user.password)

        return await this.userRepository.create({ ...user, password: hashPassword });
    }
}
