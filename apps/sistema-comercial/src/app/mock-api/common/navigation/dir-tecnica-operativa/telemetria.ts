import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirTecnicaOperativa} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const TELEMETRIA: FuseNavigationItem =
    {
        id: 'depto-telemetria',
        title: 'Telemetria',
        type: 'collapsable',
        icon: 'feather:cpu',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: false,
        acceso: false,
        children:
            [
                {
                    id: 'instalaciones',
                    title: 'Instalaciones',
                    type: 'basic',
                    icon: 'device_hub',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirTecnicaOperativa + 'telemetria/' + 'instalaciones'
                },
                {
                    id: 'motores',
                    title: 'Motores',
                    type: 'basic',
                    icon: 'feather:sliders',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirTecnicaOperativa + 'telemetria/' + 'motores'
                },
                {
                    id: 'bombas',
                    title: 'Bombas',
                    type: 'basic',
                    icon: 'settings_input_composite',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirTecnicaOperativa + 'telemetria/' + 'bombas'
                },
                {
                    id: 'cfe',
                    title: 'C.F.E',
                    type: 'basic',
                    icon: 'bolt',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: false,
                    acceso: false,
                    link: dirTecnicaOperativa + 'telemetria/' + 'cfe'
                }
            ]
    };
