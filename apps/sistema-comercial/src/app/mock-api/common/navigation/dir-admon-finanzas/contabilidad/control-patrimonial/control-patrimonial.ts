import {FuseNavigationItem} from '@s-fuse/navigation';

export enum GuardCtrlPatrimonial
{
    activos = 'ctrlActivos',
    bajasActivos = 'ctrlBajaActivos'
}

export const CTRL_PATRIMONIAL: FuseNavigationItem =
    {
        id: GuardCtrlPatrimonial.activos,
        title: 'Ctrl patrimonial',
        type: 'collapsable',
        icon: 'book-info',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children: [
            {
                id: GuardCtrlPatrimonial.bajasActivos,
                title: 'Activos',
                type: 'basic',
                icon: 'account_balance_wallet',
                oculto: false,
                hidden: (item: FuseNavigationItem): boolean => item.oculto,
                badge: {},
                controles: [],
                disabled: false,
                puedeAsigPermisos: false,
                acceso: false,
            }
        ]
    };
