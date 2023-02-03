import {FuseNavigationItem} from '@s-fuse/navigation';

export enum GuardCtrlPatrimonial
{
    ctrlPatrimonial = 'ctrlPatrimonial',
    bajasActivos = 'ctrlBajaActivos'
}

export const CTRL_PATRIMONIAL: FuseNavigationItem =
    {
        id: GuardCtrlPatrimonial.ctrlPatrimonial,
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
                title: 'Baja activos',
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
