import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirArchivoRegulacion} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const JURIDICO: FuseNavigationItem =
    {
        id: 'juridico',
        title: 'Juridico',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
        link: dirArchivoRegulacion
    };
