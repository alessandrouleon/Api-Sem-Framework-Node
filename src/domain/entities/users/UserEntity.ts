import { randomUUID } from 'crypto';
export class UserEntity {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    updated_at: Date | null;
    deleted_at: Date | null;

    private constructor(props: UserEntity) {
        this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email;
        this.password = props.password;
        this.updated_at = props.updated_at;
        this.deleted_at = props.deleted_at;
    }

    static createUser(props: Omit<UserEntity, 'id' | 'updated_at' | 'deleted_at'>): UserEntity {
        return new UserEntity({
            ...props,
            id: randomUUID(),
            updated_at: null,
            deleted_at: null,
        });
    }

    // static updateUser(props: Omit<UserEntity, 'id' | 'updated_at'>, id?: string, updated_at?: Date) {
    //     Object.assign(this, props);
    //     updated_at = new Date();
    // }



}
