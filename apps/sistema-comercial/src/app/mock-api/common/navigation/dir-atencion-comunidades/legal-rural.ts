import {FuseNavigationItem} from '@s-fuse/navigation';

export const LEGAL_RURAL: FuseNavigationItem =
    {
        id: 'legalRural',
        title: 'Legal Rural',
        type: 'basic',
        icon: 'assignment_late',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
