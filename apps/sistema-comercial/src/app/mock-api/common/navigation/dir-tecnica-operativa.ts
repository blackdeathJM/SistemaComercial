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
                                    id: 'instalaciones',
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
                                },
                                {
                                    id: 'motores',
                                    title: 'Motores',
                                    type: 'basic',
                                    icon: 'feather:sliders',
                                    activo: true,
                                    disabled: false,
                                    link: dirTecnicaOperativa + 'telemetria/' + 'motores'
                                },
                                {
                                    id: 'bombas',
                                    title: 'Bombas',
                                    type: 'basic',
                                    icon: 'settings_input_composite',
                                    activo: true,
                                    disabled: false,
                                    link: dirTecnicaOperativa + 'telemetria/' + 'bombas'
                                },
                                {
                                    id: 'cfe',
                                    title: 'C.F.E',
                                    type: 'basic',
                                    icon: 'bolt',
                                    activo: true,
                                    disabled: false,
                                    link: dirTecnicaOperativa + 'telemetria/' + 'cfe'
                                }
                            ]
                    }
                ]
        }
    ];
export const DIR_TECNICA_OPERATIVA_C: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_F: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_H: FuseNavigationItem[] = [];
