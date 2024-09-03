import { IncomingMessage, ServerResponse } from 'http';
import { UserRepository } from '../../../application/repositories/UserRepository';
import { CreateUserUseCase } from '../../../application/use-cases/users/CreateUserUseCase';
import { CustomRouter } from '../../../utils/customRouter';
import { UserController } from '../controllers/UserController';

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

const userRouter = new CustomRouter();

userRouter.use('/', async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'POST') {
        await userController.createUser(req, res);
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
});

export default userRouter;
