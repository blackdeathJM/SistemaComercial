import {Routes} from '@angular/router';
import {RecursosHumanosComponent} from '@s-dirAdmonFinanzas/recursos-humanos.component';
import {inject} from '@angular/core';
import {GeneralService} from '@s-services/general.service';
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
                        canMatch: [inject((gral: GeneralService): boolean => gral.accesoARuta(GuardRecursosHumanos.infoGralEmpleados))],
                        loadChildren: () => import('@s-dirAdmonFinanzas/empleados/empleados.routing').then(e => e.empleadosRouting)
                    },
                    {
                        path: 'departamentos',
                        loadComponent: () => import('@s-dirAdmonFinanzas/departamento/departamento.component').then(c => c.DepartamentoComponent)
                    }
                ]
        }
    ];
