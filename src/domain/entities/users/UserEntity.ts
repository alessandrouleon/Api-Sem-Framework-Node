import { randomUUID } from "crypto";

export class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;

    private constructor(props: UserEntity) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
    }

    static create(props: Omit<UserEntity, 'id'>): UserEntity {
        return new UserEntity({
            ...props,
            id: randomUUID()
        });
    }
}
