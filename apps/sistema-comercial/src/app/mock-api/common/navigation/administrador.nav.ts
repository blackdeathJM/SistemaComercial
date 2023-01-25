import {rutaBaseAdministrador} from './constantes/rutas';
import {FuseNavigationItem} from '@s-fuse/navigation';

export const ADMINISTRADOR: FuseNavigationItem[] =
    [
        {
            id: 'adminitrador',
            title: 'ADMINISTRADOR',
            type: 'group',
            icon: 'feather:settings',
            activo: false,
            badge: {},
            disabled: false,
            tooltip: 'Modulo para establecer configuraciones para el funcionamiento del sistema comercial',
            children:
                [
                    {
                        id: 'admonSesiones',
                        title: 'Admon. sesiones',
                        type: 'basic',
                        icon: 'admin_panel_settings',
                        disabled: false,
                        activo: false,
                        badge: {},
                        classes: {},
                        link: rutaBaseAdministrador + 'empleados-sesion'
                    }
                ]
        }
    ];

export const ADMINISTRADOR_C: FuseNavigationItem[] = [];
export const ADMINISTRADOR_F: FuseNavigationItem[] = [];
export const ADMINISTRADOR_H: FuseNavigationItem[] = [];
