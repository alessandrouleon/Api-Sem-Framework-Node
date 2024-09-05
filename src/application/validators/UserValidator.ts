import AppError from "../../infrastructure/errors/AppError";

// src/application/validators/UserValidator.ts
export class UserValidator {
    public static validateCreateUser(data: any): void {
        const { name, username, email, password } = data;

        if (!name.trim()) throw new AppError("O campo 'name' é obrigatório.", 400);
        if (!username.trim()) throw new AppError("O campo 'username' é obrigatório.", 400);
        if (!email.trim()) throw new AppError("O campo 'email' é obrigatório.", 400);
        if (!password.trim()) throw new AppError("O campo 'password' é obrigatório.", 400);
    }

    public static validateUpdateUser(data: any): void {
        const { name, username, email, password } = data;

        if (!name && !username && !email && !password) {
            throw new Error("Pelo menos um campo deve ser fornecido para atualização.");
        }
    }
}
