import { Route } from '@angular/router';
import {AuthForgotPasswordComponent} from '@s-auth/forgot-password/forgot-password.component';

export const authForgotPasswordRoutes: Route[] = [
    {
        path     : '',
        component: AuthForgotPasswordComponent
    }
];
