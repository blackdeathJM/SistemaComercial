import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirGeneral} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const PLANEACION: FuseNavigationItem =
    {
        id: 'depto-planeacion',
        title: 'Planeacion',
        type: 'collapsable',
        icon: 'feather:calendar',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true,
        children:
            [
                {
                    id: 'depto-mir',
                    title: 'MIR',
                    type: 'basic',
                    icon: 'heroicons_solid:duplicate',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    acceso: true,
                    link: dirGeneral + 'planeacion/mir'
                },
                {
                    id: 'depto-pbr',
                    title: 'PBR',
                    type: 'basic',
                    icon: 'mat_solid:6_ft_apart',
                    oculto: false,
                    hidden: (item: FuseNavigationItem): boolean => item.oculto,
                    badge: {},
                    controles: [],
                    disabled: false,
                    puedeAsigPermisos: true,
                    acceso: true,
                    link: dirGeneral + 'planeacion/pbr'
                }
            ]
    };
