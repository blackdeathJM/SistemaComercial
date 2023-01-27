import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirArchivoRegulacion} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const TRANSPARENCIA: FuseNavigationItem =
    {
        id: 'depto-transparencia',
        title: 'Transparencia',
        type: 'basic',
        icon: 'heroicons_outline:document-report',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        link: dirArchivoRegulacion
    };
