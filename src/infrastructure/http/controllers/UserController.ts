import { IncomingMessage, ServerResponse } from 'http';
import { CreateUserUseCase } from '../../../application/use-cases/users/CreateUserUseCase';
//import { UpdateUserUseCase } from '../../application/useCases/UpdateUserUseCase';
//import { DeleteUserUseCase } from '../../application/useCases/DeleteUserUseCase';
//import { GetUserUseCase } from '../../application/useCases/GetUserUseCase';
import { parseRequestBody, sendJsonResponse } from '../../../utils/httpHelpers';

export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    async createUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const data = await parseRequestBody(req);

            const result = await this.createUserUseCase.execute(data);

            sendJsonResponse(res, 201, { users: result });
        } catch (error: any) {
            sendJsonResponse(res, 400, { error: error.message });
        }
    }

    // async updateUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    //     try {
    //         const data = await parseRequestBody(req);
    //         await this.updateUserUseCase.execute(data);
    //         sendJsonResponse(res, 200, { message: 'User updated successfully' });
    //     } catch (error) {
    //         sendJsonResponse(res, 400, { error: error.message });
    //     }
    // }

    // async deleteUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    //     try {
    //         const userId = this.getUserIdFromRequest(req); // Supondo que você obtenha o ID da URL
    //         await this.deleteUserUseCase.execute(userId);
    //         sendJsonResponse(res, 200, { message: 'User deleted successfully' });
    //     } catch (error) {
    //         sendJsonResponse(res, 400, { error: error.message });
    //     }
    // }

    // // Método auxiliar para extrair o ID do usuário da URL (supondo que esteja usando algo como '/users/:id')
    // private getUserIdFromRequest(req: IncomingMessage): string {
    //     const urlParts = req.url?.split('/') || [];
    //     return urlParts[urlParts.length - 1];
    // }

    // async getUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
    //     try {
    //         const userId = this.getUserIdFromRequest(req); // Obtém o ID da URL
    //         const user = await this.getUserUseCase.execute(userId);
    //         sendJsonResponse(res, 200, user);
    //     } catch (error) {
    //         sendJsonResponse(res, 404, { error: error.message });
    //     }
    // }

    // private getUserIdFromRequest(req: IncomingMessage): string {
    //     const urlParts = req.url?.split('/') || [];
    //     return urlParts[urlParts.length - 1];
    // }

}

