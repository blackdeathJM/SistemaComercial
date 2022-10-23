import {rutaBaseAdministrador} from './rutas';
import {INavegacion} from './navigation.interface';

export const ADMINISTRADOR: INavegacion[] =
    [
        {
            id: 'separador',
            type: 'divider'
        },
        {
            id: 'adminitrador',
            title: 'ADMINISTRADOR',
            type: 'group',
            icon: 'feather:settings',
            tooltip: 'Modulo para establecer configuraciones para el funcionamiento del sistema comercial',
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

export const ADMINISTRADOR_C: INavegacion[] = [];
export const ADMINISTRADOR_F: INavegacion[] = [];
export const ADMINISTRADOR_H: INavegacion[] = [];

