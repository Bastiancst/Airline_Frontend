import { Role } from "src/app/pages/enums/role.enum";

export interface CrudRequest {
    rut: string;
    name: string;
    lastname: string;
    age: number;
    email: string;
    role: Role;
    workPosition: string;
    country: string;
    city: string;
    bonus: number;
}