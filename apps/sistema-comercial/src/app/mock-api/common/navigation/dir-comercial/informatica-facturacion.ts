import {FuseNavigationItem} from '@s-fuse/navigation';

export const INFORMATICAFACTURACION: FuseNavigationItem =
    {
        id: 'informaticaFacturacion',
        title: 'Informatica y facturacion',
        type: 'basic',
        icon: 'feather:monitor',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
