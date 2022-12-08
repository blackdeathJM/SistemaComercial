import {Route} from '@angular/router';
import {NoAuthGuard} from '@s-core/auth/guards/noAuth.guard';
import {LayoutComponent} from '@s-layout/layout.component';
import {AuthGuard} from '@s-core/auth/guards/auth.guard';
import {InitialDataResolver} from '#/apps/sistema-comercial/src/app/app.resolvers';
import {AdminGuard} from '@s-admin/admin.guard';

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
                    path: 'sign-in', loadChildren: () => import('@s-auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
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
                    path: 'inicio',
                    loadComponent: () => import('@s-Inicio/inicio.component').then(i => i.InicioComponent),
                },
                {
                    path: 'perfil',
                    loadComponent: () => import('@s-admin/components/perfil/perfil.component').then(p => p.PerfilComponent)
                },
                {
                    path: 'admin',
                    canActivate: [AdminGuard],
                    loadChildren: () => import('@s-admin/admin.routing').then(a => a.adminRouting)
                },
                {
                    path: 'general',
                    canActivate: [],
                    loadChildren: () => import('@s-general/general.routing').then(g => g.generalRouting)
                },
                {
                    path: 'dir-admon-finanzas',
                    canActivate: [],
                    loadChildren: () => import('@s-dirAdmonFinanzas/dir-admon-finanzas.routing').then(a => a.dirAdmonFinanzasRouting)
                },
                {
                    path: 'dir-tecnica-operativa',
                    canActivate: [],
                    loadChildren: () => import('@s-dir-tecnica-operativa/dir-tenica-operativa.routing').then(t => t.dirTenicaOperativaRouting)
                }
            ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
