import { Role } from "src/app/pages/enums/role.enum";

export interface CrudResponse {
    success: boolean;
    message: string;
    errors: any;
    result: {
        id: string;
        officeId: string;
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
    };
}
