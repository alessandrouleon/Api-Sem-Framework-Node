import { UserEntity } from "../../../domain/entities/users/UserEntity";

export const UserQueries = {
    //OK
    INSERT_USER: `
        INSERT INTO users (id, name, username, email, password) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, name, username, email, password, created_at, updated_at, deleted_at
    `,

    //OK
    UPDATE_USER: `
        UPDATE users 
        SET name = $2, username = $3, email = $4, password = $5, updated_at = $6
        WHERE id = $1 
        RETURNING id, name, username, email, password, created_at, updated_at, deleted_at
    `,

    //OK
    GET_USER_BY_ID: `SELECT * FROM users  WHERE id = $1`,

    //OK
    GET_USER_EMAIL: `SELECT * FROM users  WHERE email = $1`,

    //OK
    GET_USER_USERNAME: `SELECT * FROM users  WHERE username = $1`,



    DELETE_USER: `
        DELETE FROM users 
        WHERE id = $1 
        RETURNING id
    `,
    // GET_USER_BY_ID: `
    //     SELECT id, name, username, email, password 
    //     FROM users 
    //     WHERE id = $1
    // `,

    // Outras queries podem ser adicionadas aqui
};


export const CreateValues = (user: UserEntity) => {
    return [user.id, user.name, user.username, user.email, user.password];
}

export const UpdateValues = (id: string, user: UserEntity) => {
    return [id, user.name, user.username, user.email, user.password, user.updated_at];
}