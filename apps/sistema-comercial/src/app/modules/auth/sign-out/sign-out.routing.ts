import { Route } from '@angular/router';
import {AuthSignOutComponent} from '@s-auth/sign-out/sign-out.component';

export const authSignOutRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignOutComponent
    }
];
