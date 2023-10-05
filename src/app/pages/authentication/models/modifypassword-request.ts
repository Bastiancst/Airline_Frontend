export interface ModifyPasswordRequest {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}