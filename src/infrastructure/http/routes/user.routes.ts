import { IncomingMessage, ServerResponse } from 'http';
import { UserRepository } from '../../../application/repositories/UserRepository';
import { BcryptEncryptionService } from '../../../application/services/EncryptionService';
import { CreateUserUseCase } from '../../../application/useCases/users/CreateUserUseCase';
import { DeleteUserUseCase } from '../../../application/useCases/users/DeleteUserUseCase';
import { GetUserUseCase } from '../../../application/useCases/users/GetUserUseCase';
import { UpdateUserUseCase } from '../../../application/useCases/users/UpdateUserUseCase';
import { CustomRouter } from '../../../utils/customRouter';
import { UserController } from '../controllers/UserController';

const userRepository = new UserRepository();
const encryptionService = new BcryptEncryptionService();
const createUserUseCase = new CreateUserUseCase(userRepository, encryptionService);
const updateUserUseCase = new UpdateUserUseCase(userRepository, encryptionService);
const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const getUserUseCase = new GetUserUseCase(userRepository)
const userController = new UserController(createUserUseCase, updateUserUseCase, deleteUserUseCase, getUserUseCase);


const userRouter = new CustomRouter();
const userRouterS = new CustomRouter();

userRouter.use('/', async (req: IncomingMessage, res: ServerResponse) => {
    const urlParts = req.url?.split('/') || [];
    const userId = urlParts[urlParts.length - 1]; // ID está no final da URL

    if (req.method) {
        if (req.method === 'POST') {
            await userController.createUser(req, res);
        }

        if (req.method === 'PATCH' && userId) {
            await userController.updateUser(req, res, userId);
        }

        if (req.method === 'DELETE' && userId) {
            await userController.deleteUser(req, res, userId);
        }

        if (req.method === 'GET') {
            await userController.getUser(req, res);
        }

    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
});







export default userRouter || userRouterS;
