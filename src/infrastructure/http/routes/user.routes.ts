import { IncomingMessage, ServerResponse } from 'http';
import { UserRepository } from '../../../application/repositories/UserRepository';
import { CreateUserUseCase } from '../../../application/useCases/users/CreateUserUseCase';
import { GetUserUseCase } from '../../../application/useCases/users/GetUserUseCase';
import { UpdateUserUseCase } from '../../../application/useCases/users/UpdateUserUseCase';
import { CustomRouter } from '../../../utils/customRouter';
import { UserController } from '../controllers/UserController';

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository)
const userController = new UserController(createUserUseCase, updateUserUseCase, getUserUseCase);


const userRouter = new CustomRouter();
const userRouterS = new CustomRouter();

// userRouter.use('/', async (req: IncomingMessage, res: ServerResponse) => {
//     switch (req.method) {
//         case 'POST':
//             await userController.createUser(req, res);
//             break;
//         case 'PATCH':
//             await userController.updateUser(req, res);
//             break;
//         default:
//             res.writeHead(405, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ error: 'Method not allowed' }));
//             break;
//     }
// });

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

        if (req.method === 'GET') {
            await userController.getUser(req, res);
        }

    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
});







export default userRouter || userRouterS;
