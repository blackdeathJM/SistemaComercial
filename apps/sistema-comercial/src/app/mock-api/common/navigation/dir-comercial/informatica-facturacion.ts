import {FuseNavigationItem} from '@s-fuse/navigation';

export const INFORMATICAFACTURACION: FuseNavigationItem =
    {
        id: 'depto-informaticaFacturacion',
        title: 'Informatica y facturacion',
        type: 'basic',
        icon: 'feather:monitor',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true
    };
