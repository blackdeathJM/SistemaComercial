import { Route } from '@angular/router';
import { AuthSignOutComponent } from '@s-app/modules/auth/sign-out/sign-out.component';

export const authSignOutRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignOutComponent
    }
];
