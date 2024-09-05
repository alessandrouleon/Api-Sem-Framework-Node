import AppError from "../../../../infrastructure/errors/AppError";

export class Password {
    private readonly value: string;

    constructor(password: string) {
        this.validatePassword(password);
        this.value = password;
    }

    private validatePassword(password: string): void {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            throw new AppError('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.', 400);

        }
    }

    public getValue(): string {
        return this.value;
    }
}
