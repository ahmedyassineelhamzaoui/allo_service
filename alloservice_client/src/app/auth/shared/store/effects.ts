import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { authActions, loginActions, verifyEmailActions } from "./action";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { PersistanceService } from "../services/persistance.service";
import { ResponseWithDetailsInterface } from "../types/responseWithDetails.interface";
import { MessageService } from "../services/message.service";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { ToastrService } from 'ngx-toastr';





export const registerClientEffect = createEffect(
    (actions$ = inject(Actions),
     authService = inject(AuthService),
     persistanceService = inject(PersistanceService)
    ) => {
        return actions$.pipe(
            ofType(authActions.register),
            switchMap(({ request }) => {
                return authService.registerClient(request).pipe(
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
export const redirectAfterRegisterClientEffect = createEffect(
    (actions$ = inject(Actions), router= inject(Router),messageService = inject(MessageService)) => {
        return actions$.pipe(
            ofType(authActions.registerSuccess),
            tap(() => {
                messageService.changeMessage('we sent a verification code to your mail.');
                router.navigateByUrl('/verify-email');
            })
        )
    },
    {functional: true,dispatch: false}
);
// export const loginEffect = createEffect(
//     (actions$ = inject(Actions),
//      authService = inject(AuthService),
//      persistanceService = inject(PersistanceService),
//      userService = inject(UserService),
//      roleService = inject(RoleService)
//     ) => {
//         return actions$.pipe(
//             ofType(loginActions.login),
//             switchMap(({ request }) => {
//                 return authService.login(request).pipe(
//                     map((currentUser: CurrentUserInterface) => {
//                         persistanceService.set('accessToken', currentUser.accessToken);
//                         authService.setToken(currentUser.accessToken); 
//                         userService.setFirstName(currentUser.firstName);
//                         persistanceService.set('refreshToken', currentUser.refreshToken);
//                         return loginActions.loginSuccess({ currentUser: currentUser }); 
//                     }),
//                     catchError((errorResponse: HttpErrorResponse) => {
//                         console.log('errorResponse',errorResponse.error.details);
//                         return of(loginActions.loginFailure({ errors: errorResponse.error.details }));
//                     })
//                 );
//             })
//         );
//     },

//     { functional: true }
// );
// export const redirectAfterLoginEffect = createEffect(
//      (actions$ = inject(Actions),     persistanceService = inject(PersistanceService)
//      , router= inject(Router)) => {
//         return actions$.pipe(
//             ofType(loginActions.loginSuccess),
//             tap(() => {
//                 console.log('redirectAfterLoginEffect');
//                 console.log('token',persistanceService.get('accessToken'));
//                 router.navigateByUrl('/competition');
//             })
//         )
//      },
//     {functional: true,dispatch: false}
// );
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
    (actions$ = inject(Actions),
    persistanceService = inject(PersistanceService),
    router= inject(Router),
    toastr = inject(ToastrService)
    ) => {
       return actions$.pipe(
           ofType(verifyEmailActions.mailSuccess),
           switchMap(() => {
            console.log('token',persistanceService.get('accessToken'));
            return router.navigateByUrl('/home').then(() => {
                toastr.success("welcome "+persistanceService.get('firstName'));
            });
        })
       )
    },
   {functional: true,dispatch: false}
);

