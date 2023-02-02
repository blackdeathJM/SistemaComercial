import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirArchivoRegulacion} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const JURIDICO: FuseNavigationItem =
    {
        id: 'depto-juridico',
        title: 'Juridico',
        type: 'collapsable',
        icon: 'heroicons_outline:newspaper',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        link: dirArchivoRegulacion
    };
