import { Route } from '@angular/router';
import {AuthUnlockSessionComponent} from '@s-auth/unlock-session/unlock-session.component';

export const authUnlockSessionRoutes: Route[] = [
    {
        path     : '',
        component: AuthUnlockSessionComponent
    }
];
