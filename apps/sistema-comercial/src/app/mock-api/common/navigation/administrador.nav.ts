import {FuseNavigationItem} from '@s-fuse/navigation';
import {rutaBaseAdministrador} from '@s-app/mock-api/common/navigation/constantes/rutas';

export const ADMINISTRADOR: FuseNavigationItem[] =
    [
        {
            id: 'separador',
            type: 'divider'
        },
        {
            id: 'administrador',
            title: 'Administrador',
            type: 'group',
            icon: 'feather:settings',
            tooltip: 'Modulo para las establecer configuraciones para el funcionamiento del sistema comercial',
            children:
                [
                    {
                        id: 'adminGeneral',
                        title: 'Admin Gral',
                        type: 'basic',
                        icon: 'feather:settings',
                        link: rutaBaseAdministrador
                    }
                ]
        }
    ];

export const ADMINISTRADOR_C: FuseNavigationItem[] = [];
export const ADMINISTRADOR_F: FuseNavigationItem[] = [];
export const ADMINISTRADOR_H: FuseNavigationItem[] = [];

