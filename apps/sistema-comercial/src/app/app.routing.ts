import {Route} from '@angular/router';
import {AuthGuard} from '@s-app/core/auth/guards/auth.guard';
import {NoAuthGuard} from '@s-app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from '@s-app/layout/layout.component';
import {InitialDataResolver} from '@s-app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    {path: '', pathMatch: 'full', redirectTo: 'sistema-comercial/inicio'},
    {path: 'redireccionar', pathMatch: 'full', redirectTo: 'sistema-comercial/inicio'},
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
                {
                    path: 'sign-in', loadChildren: () => import('@s-app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
                }
            ]
    },
    {
        path: 'sistema-comercial',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: {initialData: InitialDataResolver},
        children:
            [
                {
                    path: 'inicio', loadComponent: () => import('@s-app/modules/inicio/inicio.component').then(i => i.InicioComponent)
                },
                {
                    path: 'admin',
                    loadChildren: () => import('@s-app/modules/admin/admin.module').then(a => a.AdminModule)
                },
                {
                    path: 'general',
                    loadChildren: () => import('@s-app/modules/general/general.module').then(g => g.GeneralModule)
                },
                {
                    path: 'dir-admon-finanzas',
                    // loadComponent: () => import('@s-app/modules/dir-admon-finanzas/dir-admon-finanzas.component').then(a => a.DirAdmonFinanzasComponent)
                    loadChildren: () => import('@s-app/modules/dir-admon-finanzas/dir-admon-finanzas.routing').then(a => a.dirAdmonFinanzasRouting)
                }
            ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
