export interface UpdateUserPasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}