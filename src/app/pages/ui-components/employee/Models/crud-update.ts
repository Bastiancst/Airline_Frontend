import { Role } from "src/app/pages/enums/role.enum";

export interface CrudUpdate {
    id: string;
    rut: string;
    name: string;
    lastName: string;
    age: number;
    email: string;
    role: Role;
    workPosition: string;
    country: string;
    city: string;
    bonus: number;
}