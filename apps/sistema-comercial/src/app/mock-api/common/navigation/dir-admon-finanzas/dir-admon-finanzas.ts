import {FuseNavigationItem} from '@s-fuse/navigation';
import {RECURSOS_HUMANOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';
import {CONTABILIDAD} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/contabilidad';
import {EGRESOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/egresos';
import {COMPRAS_SERVICIOS} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/compras-servicios';
import {ALMACEN} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/almacen';

export const DIR_ADMON_FINANZAS: FuseNavigationItem[] =
    [
        {
            id: 'dirAdmonFinanzas',
            title: 'DIR. ADMON FINANZAS',
            type: 'group',
            icon: 'work',
            activo: false,
            disabled: false,
            active: true,
            children: [RECURSOS_HUMANOS, CONTABILIDAD, EGRESOS, COMPRAS_SERVICIOS, ALMACEN]
        }
    ];
export const DIR_ADMON_FINANZAS_C: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_F: FuseNavigationItem[] = [];
export const DIR_ADMON_FINANZAS_H: FuseNavigationItem[] = [];