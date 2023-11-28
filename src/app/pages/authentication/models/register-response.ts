export interface RegisterResponse {
    success: boolean;
    message: string;
    errors: any;
    result: {
        id: string;
        userName: string;
        email: string;
        roles: string[];
        isVerified: boolean;
        jwTtoken: string;
    };
}