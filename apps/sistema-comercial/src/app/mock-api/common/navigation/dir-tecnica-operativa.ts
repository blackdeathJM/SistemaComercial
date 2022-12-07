import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirTecnicaOperativa} from './constantes/rutas';

export const DIR_TECNICA_OPERATIVA: FuseNavigationItem[] =
    [
        {
            id: 'dirTecnicaOperativa',
            title: 'DIR. TECNICA OPERATIVA',
            type: 'group',
            icon: 'heroicons_outline:cube-transparent',
            activo: false,
            disabled: false,
            children:
                [
                    {
                        id: 'saneamiento',
                        title: 'Saneamiento',
                        type: 'basic',
                        icon: 'adjust',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'ampleacionesConstrucciones',
                        title: 'Amp y construccion',
                        tooltip: 'Ampleaciones y construccion',
                        type: 'basic',
                        icon: 'add_road',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'operaciones',
                        title: 'Operaciones',
                        type: 'basic',
                        icon: 'blur_linear',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'telemetria',
                        title: 'Telemetria',
                        type: 'collapsable',
                        icon: 'feather:cpu',
                        activo: false,
                        disabled: false,
                        children:
                            [
                                {
                                    id: 'resumInstalacion',
                                    title: 'Instalaciones',
                                    type: 'basic',
                                    icon: 'device_hub',
                                    activo: true,
                                    disabled: false,
                                    controles:
                                        [
                                            {
                                                id: 'agregarInstalacion',
                                                activo: false
                                            }
                                        ],
                                    link: dirTecnicaOperativa + 'telemetria/' + 'instalaciones'
                                }
                            ]
                    }
                ]
        }
    ];
export const DIR_TECNICA_OPERATIVA_C: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_F: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_H: FuseNavigationItem[] = [];
