import {FuseNavigationItem} from '@s-fuse/navigation';

export const INFORMATICAFACTURACION: FuseNavigationItem =
    {
        id: 'depto-informaticaFacturacion',
        title: 'Informatica y facturacion',
        type: 'collapsable',
        icon: 'feather:monitor',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: []
    };
