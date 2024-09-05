import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserUseCase } from '../../../application/useCases/users/CreateUserUseCase';
//import { DeleteUserUseCase } from '../../application/useCases/DeleteUserUseCase';
//import { GetUserUseCase } from '../../application/useCases/GetUserUseCase';
import { DeleteUserUseCase } from '../../../application/useCases/users/DeleteUserUseCase';
import { GetUserUseCase } from '../../../application/useCases/users/GetUserUseCase';
import { UpdateUserUseCase } from '../../../application/useCases/users/UpdateUserUseCase';
import { parseRequestBody, sendJsonResponse } from '../../../utils/httpHelpers';

export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getUserUseCase: GetUserUseCase,
    ) { }

    public async createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const users = await parseRequestBody(req);
            const result = await this.createUserUseCase.execute(users);

            sendJsonResponse(res, 201, { users: result });
        } catch (error: any) {
            sendJsonResponse(res, 400, { error: error.message });
        }
    }


    public async updateUser(req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> {
        try {
            const users = await parseRequestBody(req);

            const result = await this.updateUserUseCase.execute(userId, users);
            sendJsonResponse(res, 200, { users: result });
        } catch (error: any) {
            sendJsonResponse(res, 400, { error: error.message });
        }
    }

    public async deleteUser(req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> {
        try {
            await this.deleteUserUseCase.execute(userId);
            sendJsonResponse(res, 200, { users: "Usuário deletado" });
        } catch (error: any) {
            sendJsonResponse(res, 400, { error: error.message });
        }
    }

    public async getUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const user = await this.getUserUseCase.execute();
            sendJsonResponse(res, 200, { user: user });
        } catch (error: any) {
            sendJsonResponse(res, 404, { error: error.message });
        }
    }
}

