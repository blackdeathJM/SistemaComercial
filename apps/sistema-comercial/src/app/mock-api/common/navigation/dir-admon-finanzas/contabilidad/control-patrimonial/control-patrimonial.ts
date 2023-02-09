import {FuseNavigationItem} from '@s-fuse/navigation';

export enum GuardCtrlPatrimonial
{
    ctrlPatrimonial = 'ctrlPatrimonial',
    bajasActivos = 'ctrlBajaActivos'
}

export enum CtrlPatrimonial
{
    regNvoActivo = 'Registrar nvo activo',
    elementoPrueba = 'Elemento prueba',
    crearRevision = 'Crear revision'
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
                controles:
                    [
                        {
                            id: CtrlPatrimonial.regNvoActivo,
                            title: 'Registrar nuevo activo',
                            activo: false
                        },
                        {
                            id: CtrlPatrimonial.elementoPrueba,
                            title: 'Elemento de prueba',
                            activo: false
                        },
                        {
                            id: CtrlPatrimonial.crearRevision,
                            title: 'Crear Revision',
                            activo: false
                        }
                    ],
                disabled: false,
                puedeAsigPermisos: false,
                acceso: false,
            }
        ]
    };
