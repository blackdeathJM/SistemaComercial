import {FuseNavigationItem} from '@s-fuse/navigation';
import {TRANSPARENCIA} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-archivo-gral-reg/transparencia';
import {REGULACION} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-archivo-gral-reg/regulacion';
import {JURIDICO} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-archivo-gral-reg/juridico';

export const DIR_ARCHIVO_REG: FuseNavigationItem[] =
    [
        {
            id: 'dir-archivoReg',
            title: 'DIR. ARCHIVO GRAL REG',
            tooltip: 'Direccion de archivo general y regulacion',
            type: 'group',
            icon: 'heroicons_outline:office-building',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: false,
            acceso: true,
            children: [TRANSPARENCIA, REGULACION, JURIDICO]
        }
    ];

export const DIR_ARCHIVO_REG_C: FuseNavigationItem[] = [];
export const DIR_ARCHIVO_REG_F: FuseNavigationItem[] = [];
export const DIR_ARCHIVO_REG_H: FuseNavigationItem[] = [];
