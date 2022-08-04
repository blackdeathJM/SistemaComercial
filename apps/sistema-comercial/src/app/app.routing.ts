import {Route} from '@angular/router';
import {AuthGuard} from '@s-app/core/auth/guards/auth.guard';
import {NoAuthGuard} from '@s-app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from '@s-app/layout/layout.component';
import {InitialDataResolver} from '@s-app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch: 'full', redirectTo: 'sistema-comercial/inicio'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'sistema-comercial/inicio'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data:
            {
                layout: 'empty'
            },
        children:
            [
                {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)}
            ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data:
            {
                layout: 'empty'
            },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },
    // Admin routes
    {
        path: 'sistema-comercial',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {initialData: InitialDataResolver},
        children:
            [
                {path: 'inicio', loadChildren: () => import('app/modules/inicio/inicio.module').then(i => i.InicioModule)},
                {path: 'admin', loadChildren: () => import('app/modules/admin/admin.module').then(a => a.AdminModule)}
            ]
    }
];
