import { randomUUID } from 'crypto';
export class UserEntity {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    updated_at: Date;
    deleted_at: Date;

    private constructor(props: UserEntity) {
        this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email;
        this.password = props.password;
        this.updated_at = props.updated_at;
        this.deleted_at = props.deleted_at;
    }

    static createUser(props: Omit<UserEntity, 'id'>): UserEntity {
        return new UserEntity({
            ...props,
            id: randomUUID()
        });
    }

    // static updateUser(props: Omit<UserEntity, 'id' | 'updated_at'>, id?: string, updated_at?: Date) {
    //     Object.assign(this, props);
    //     updated_at = new Date();
    // }



}
