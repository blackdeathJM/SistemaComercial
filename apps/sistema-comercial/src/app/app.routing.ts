import {Route} from '@angular/router';
import {NoAuthGuard} from '@s-core/auth/guards/noAuth.guard';
import {LayoutComponent} from '@s-layout/layout.component';
import {AuthGuard} from '@s-core/auth/guards/auth.guard';
import {InitialDataResolver} from '#/apps/sistema-comercial/src/app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    {path: '', pathMatch: 'full', redirectTo: 'sistema-comercial/inicio'},
    {path: 'redireccion', pathMatch: 'full', redirectTo: 'sistema-comercial/inicio'},
    {
        path: '',
        canMatch: [NoAuthGuard],
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
        canMatch: [AuthGuard],
        resolve: {initialData: InitialDataResolver},
        children:
            [
                {
                    path: 'inicio',
                    loadComponent: () => import('@s-Inicio/inicio.component').then(i => i.InicioComponent),
                },
                {
                    path: 'dir-general',
                    loadChildren: () => import('@s-dir-general/dir-general.routing').then(d => d.dirGeneralRouting),
                },
                {
                    path: 'perfil',
                    loadComponent: () => import('@s-admin/empleado-admin/perfil/perfil.component').then(p => p.PerfilComponent)
                },
                {
                    path: 'admin',
                    loadChildren: () => import('@s-admin/admin.routing').then(a => a.adminRouting)
                },
                {
                    path: 'general',
                    loadChildren: () => import('@s-general/general.routing').then(g => g.generalRouting)
                },
                {
                    path: 'dir-admon-finanzas',
                    loadChildren: () => import('@s-dirAdmonFinanzas/dir-admon-finanzas.routing').then(a => a.dirAdmonFinanzasRouting)
                },
                {
                    path: 'dir-tecnica-operativa',
                    loadChildren: () => import('@s-dir-tecnica-operativa/dir-tenica-operativa.routing').then(t => t.dirTenicaOperativaRouting)
                }
            ]
    },
    {
        path: '404-not-found', pathMatch: 'full', loadChildren: () => import('@s-error/error-404/error-404.module').then(e => e.Error404Module)
    },
    {
        path: '**', redirectTo: '404-not-found'
    }
];
