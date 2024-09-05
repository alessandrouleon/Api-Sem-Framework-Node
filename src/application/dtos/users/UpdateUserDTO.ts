import { CreateUserDTO } from "./CreateUserDTO";

export interface UpdateUserDTO extends CreateUserDTO {
    id: string;
    // updated_at: Date;
    // deleted_at: Date;
}