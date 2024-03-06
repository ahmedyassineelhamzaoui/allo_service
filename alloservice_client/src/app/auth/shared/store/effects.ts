import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PersistanceService } from "../shared/service/persistance.service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { authActions, loginActions, verifyEmailActions } from "./action";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { CurrentUserInterface } from "../shared/types/currentUser.interface";
import { ResponseWithDetailsInterface } from "../shared/types/responseWithDetails.interface";
import { MessageService } from "../shared/service/message.service";
import { UserService } from "../user.service";
import { RoleService } from "../role.service";

export const registerEffect = createEffect(
    (actions$ = inject(Actions),
     authService = inject(AuthService),
     persistanceService = inject(PersistanceService)
    ) => {
        return actions$.pipe(
            ofType(authActions.register),
            switchMap(({ request }) => {
                return authService.register(request).pipe(
                    map((response: ResponseWithDetailsInterface) => {
                        return authActions.registerSuccess({ response: response }); 
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        console.log('errorResponse',errorResponse.error.details);
                        return of(authActions.registerFailure({ errors: errorResponse.error.details }));
                    })
                );
            })
        );
    },

    { functional: true }
);
export const redirectAfterRegisterEffect = createEffect(
    (actions$ = inject(Actions), router= inject(Router),messageService = inject(MessageService)) => {
        return actions$.pipe(
            ofType(authActions.registerSuccess),
            tap(() => {
                messageService.changeMessage('we sent a verification code to your mail.');
                router.navigateByUrl('/verify-mail');
            })
        )
    },
    {functional: true,dispatch: false}
);
export const loginEffect = createEffect(
    (actions$ = inject(Actions),
     authService = inject(AuthService),
     persistanceService = inject(PersistanceService),
     userService = inject(UserService),
     roleService = inject(RoleService)
    ) => {
        return actions$.pipe(
            ofType(loginActions.login),
            switchMap(({ request }) => {
                return authService.login(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        persistanceService.set('accessToken', currentUser.accessToken);
                        authService.setToken(currentUser.accessToken); 
                        userService.setFirstName(currentUser.firstName);
                        persistanceService.set('refreshToken', currentUser.refreshToken);
                        return loginActions.loginSuccess({ currentUser: currentUser }); 
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        console.log('errorResponse',errorResponse.error.details);
                        return of(loginActions.loginFailure({ errors: errorResponse.error.details }));
                    })
                );
            })
        );
    },

    { functional: true }
);
export const redirectAfterLoginEffect = createEffect(
     (actions$ = inject(Actions),     persistanceService = inject(PersistanceService)
     , router= inject(Router)) => {
        return actions$.pipe(
            ofType(loginActions.loginSuccess),
            tap(() => {
                console.log('redirectAfterLoginEffect');
                console.log('token',persistanceService.get('accessToken'));
                router.navigateByUrl('/competition');
            })
        )
     },
    {functional: true,dispatch: false}
);
export const mailVerificationEffect = createEffect(
    (actions$ = inject(Actions),
     authService = inject(AuthService),
     persistanceService = inject(PersistanceService)
    ) => {
        return actions$.pipe(
            ofType(verifyEmailActions.mail),
            switchMap(({ request }) => {
                return authService.verifyEmail(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        persistanceService.set('accessToken', currentUser.accessToken);
                        authService.setToken(currentUser.accessToken); 
                        return verifyEmailActions.mailSuccess({ currentUser: currentUser }); 
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        console.log('errorResponse',errorResponse.error.message);
                        return of(verifyEmailActions.mailFailure({ errors: errorResponse.error.message }));
                    })
                );
            })
        );
    },

    { functional: true }
);
export const redirectAfterEmailEffect = createEffect(
    (actions$ = inject(Actions),     persistanceService = inject(PersistanceService)
    , router= inject(Router)) => {
       return actions$.pipe(
           ofType(verifyEmailActions.mailSuccess),
           tap(() => {
               console.log('token',persistanceService.get('accessToken'));
               router.navigateByUrl('/competition');
           })
       )
    },
   {functional: true,dispatch: false}
);

