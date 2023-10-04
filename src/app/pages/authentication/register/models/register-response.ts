export interface RegisterResponse {
    success: boolean;
    message: string;
    errors: any;
    result: {
        userId: string;
        email: string;
        confirmToken: string;
    };
}
