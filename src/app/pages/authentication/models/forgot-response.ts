export interface ForgotResponse {
    success: boolean;
    message: string;
    errors: any;
    result: {
        email: string;
        recoveryCode: string;
    };
}