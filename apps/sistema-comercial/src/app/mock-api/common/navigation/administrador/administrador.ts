import {FuseNavigationItem} from '@s-fuse/navigation';
import {rutaBaseAdministrador} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export enum Administrador
{
    rutaAdminSesion = 'rutaAdminSesion',
    dirAdministrador = 'dir-administrador'
}

export const ADMINISTRADOR: FuseNavigationItem[] =
    [
        {
            id: Administrador.dirAdministrador,
            title: 'ADMINISTRADOR',
            type: 'group',
            icon: 'feather:settings',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: false,
            acceso: true,
            children:
                [
                    {
                        id: Administrador.rutaAdminSesion,
                        title: 'Admon. sesiones',
                        type: 'basic',
                        icon: 'manage_accounts',
                        oculto: false,
                        hidden: (item: FuseNavigationItem): boolean => item.oculto,
                        badge: {},
                        controles: [],
                        disabled: false,
                        puedeAsigPermisos: false,
                        acceso: false,
                        link: rutaBaseAdministrador + 'empleados-sesion'
                    }
                ]
        }
    ];
export const ADMINISTRADOR_C: FuseNavigationItem[] = [];
export const ADMINISTRADOR_F: FuseNavigationItem[] = [];
export const ADMINISTRADOR_H: FuseNavigationItem[] = [];
