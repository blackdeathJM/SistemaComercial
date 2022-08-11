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
            icon: 'heroicons_outline:cog',
            tooltip: 'Modulo para las establecer configuraciones para el funcionamiento del sistema comercial',
            children:
                [
                    {
                        id: 'adminGeneral',
                        title: 'Admin Gral',
                        type: 'basic',
                        icon: '',
                        link: rutaBaseAdministrador + ''
                    },
                    {
                        id: 'deptos',
                        title: 'Departamentos',
                        type: 'basic',
                        icon: 'corporate_fare',
                        link: rutaBaseAdministrador + 'deptos'
                    },
                    {
                        id: 'usuarios',
                        title: 'Usuarios',
                        type: 'basic',
                        icon: 'heroicons_outline:users',
                        link: rutaBaseAdministrador + 'usuarios'
                    }
                ]
        }
    ];

export const ADMINISTRADOR_C: FuseNavigationItem[] = [];
export const ADMINISTRADOR_F: FuseNavigationItem[] = [];
export const ADMINISTRADOR_H: FuseNavigationItem[] = [];

