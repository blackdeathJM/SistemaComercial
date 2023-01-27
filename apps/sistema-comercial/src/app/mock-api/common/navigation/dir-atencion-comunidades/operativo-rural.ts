import {FuseNavigationItem} from '@s-fuse/navigation';

export const OPERATIVO_RURAL: FuseNavigationItem =
    {
        id: 'depto-operativoRural',
        title: 'Operativo rural',
        type: 'basic',
        icon: 'agriculture',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true
    };
