import {FuseNavigationItem} from '../../../../@fuse/components/navigation';

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
                        type: 'basic',
                        icon: 'heroicons_outline:chip',
                        link: ''
                    }
                ]
        }
    ];

export const AREA_TECNICA_C: FuseNavigationItem[] = [];
export const AREA_TECNICA_F: FuseNavigationItem[] = [];
export const AREA_TECNICA_H: FuseNavigationItem[] = [];
