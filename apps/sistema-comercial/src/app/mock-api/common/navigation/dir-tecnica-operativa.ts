import {FuseNavigationItem} from '@s-fuse/navigation';

export const DIR_TECNICA_OPERATIVA: FuseNavigationItem[] =
    [
        {
            id: 'dirTecnicaOperativa',
            title: 'DIR. TECNICA OPERATIVA',
            type: 'group',
            icon: 'heroicons_outline:cube-transparent',
            children:
                [
                    {
                        id: 'saneamiento',
                        title: 'Saneamiento',
                        type: 'basic',
                        icon: 'adjust'
                    },
                    {
                        id: 'ampleacionesConstrucciones',
                        title: 'Amp y construccion',
                        tooltip: 'Ampleaciones y construccion',
                        type: 'basic',
                        icon: 'add_road'
                    },
                    {
                        id: 'operaciones',
                        title: 'Operaciones',
                        type: 'basic',
                        icon: 'blur_linear'
                    },
                    {
                        id: 'telemetria',
                        title: 'Telemetria',
                        type: 'basic',
                        icon: 'feather:cpu'
                    }
                ]
        }
    ];
export const DIR_TECNICA_OPERATIVA_C: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_F: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_H: FuseNavigationItem[] = [];
