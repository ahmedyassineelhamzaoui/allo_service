import { createActionGroup, props  } from "@ngrx/store";
import { RegisterRequestClientInterface } from "../types/registerRequestClient.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { BackendErrorInterface } from "../types/backendError.interface";
import { MailRequestInterface } from "../types/mailRequest.interface";





export const authActions = createActionGroup({

    source : 'auth',
    events : {
        Register: props<{request: RegisterRequestClientInterface}>(),
        'Register Success': props<{response: RegisterRequestClientInterface}>(),
        'Register Failure': props<{errors: RegisterRequestClientInterface}>(),
    }
})

export const loginActions = createActionGroup({
    source: 'login',
    events :{
        Login: props<{request: LoginRequestInterface}>(),
        'Login Success': props<{currentUser: CurrentUserInterface}>(),
        'Login Failure': props<{errors: BackendErrorInterface}>(),
    }
});

export const verifyEmailActions = createActionGroup({
    source: 'mail',
    events :{
        Mail: props<{request: MailRequestInterface}>(),
        'Mail Success': props<{currentUser: CurrentUserInterface}>(),
        'Mail Failure': props<{errors: BackendErrorInterface}>(),
    }
});

