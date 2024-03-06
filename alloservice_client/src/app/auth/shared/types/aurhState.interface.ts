import { BackendErrorInterface } from "./backendError.interface";
import { CurrentUserInterface } from "./currentUser.interface";

export interface AuthStateInterface {
    isSubmitting: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    isLoading: boolean;
    validationErrors: BackendErrorInterface | null;
}