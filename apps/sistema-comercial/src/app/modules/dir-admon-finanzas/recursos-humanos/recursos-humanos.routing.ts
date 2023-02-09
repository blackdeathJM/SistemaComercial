import {Routes} from '@angular/router';
import {RecursosHumanosComponent} from '@s-dirAdmonFinanzas/recursos-humanos.component';
import {permisoRuta} from '@s-services/match.service';
import {GuardRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';

export const recursosHumanosRouting: Routes =
    [
        {
            path: '',
            component: RecursosHumanosComponent,
            children:
                [
                    {
                        path: 'empleados',
                        loadChildren: () => import('@s-dirAdmonFinanzas/empleados/empleados.routing').then(e => e.empleadosRouting)
                    },
                    {
                        path: 'departamentos',
                        canActivate: [(): boolean => permisoRuta(GuardRecursosHumanos.deptos)],
                        loadComponent: () => import('@s-dirAdmonFinanzas/departamento/departamento.component').then(c => c.DepartamentoComponent)
                    }
                ]
        }
    ];
