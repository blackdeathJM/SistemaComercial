import {FuseNavigationItem} from '@s-fuse/navigation';
import {ADMON_SESIONES} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/administrador/admon-sesiones';

export const ADMINISTRADOR: FuseNavigationItem[] =
    [
        {
            id: 'dir-adminitrador',
            title: 'ADMINISTRADOR',
            type: 'group',
            icon: 'feather:settings',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: false,
            acceso: true,
            children: [ADMON_SESIONES]
        }
    ];
export const ADMINISTRADOR_C: FuseNavigationItem[] = [];
export const ADMINISTRADOR_F: FuseNavigationItem[] = [];
export const ADMINISTRADOR_H: FuseNavigationItem[] = [];
