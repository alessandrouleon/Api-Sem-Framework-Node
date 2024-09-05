import AppError from "../../../../infrastructure/errors/AppError";

export class Email {
    private readonly value: string;

    constructor(email: string) {
        this.validateEmail(email);
        this.value = email;
    }

    private validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError('Email inválido.', 400);
        }
    }

    public getValue(): string {
        return this.value;
    }
}
