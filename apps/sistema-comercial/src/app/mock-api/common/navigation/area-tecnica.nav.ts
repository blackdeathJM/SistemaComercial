import {FuseNavigationItem} from '@s-fuse/navigation';

export const AREA_TECNICA: FuseNavigationItem[] =
    [
        {
            id: 'dirAreaTecnica',
            title: 'AREA TECNICA',
            type: 'group',
            icon: 'heroicons_outline:cube-transparent',
            children:
                [
                    {
                        id: 'telemetria',
                        title: 'Telemetria',
                        type: 'collapsable',
                        icon: 'feather:cpu',
                        children:
                            [
                                {
                                    id: 'instalaciones',
                                    title: 'Instalaciones',
                                    type: 'basic',
                                }
                            ]
                    }
                ]
        }
    ];

export const AREA_TECNICA_C: FuseNavigationItem[] = [];
export const AREA_TECNICA_F: FuseNavigationItem[] = [];
export const AREA_TECNICA_H: FuseNavigationItem[] = [];
