import { Route } from '@angular/router';
import {AuthResetPasswordComponent} from '@s-auth/reset-password/reset-password.component';

export const authResetPasswordRoutes: Route[] = [
    {
        path     : '',
        component: AuthResetPasswordComponent
    }
];
