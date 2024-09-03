import { randomUUID } from "crypto";

export class UserEntity {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    updatedAt: Date;
    deletedAt: Date;



    private constructor(props: UserEntity) {
        this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email;
        this.password = props.password;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }

    static createUser(props: Omit<UserEntity, 'id'>): UserEntity {
        return new UserEntity({
            ...props,
            id: randomUUID()
        });
    }


    static listUsers(users: UserEntity): UserEntity {
        return users
    }

}
