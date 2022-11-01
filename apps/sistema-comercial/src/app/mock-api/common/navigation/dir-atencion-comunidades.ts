import {FuseNavigationItem} from '@s-fuse/navigation';

export const DIR_ATENCION_COMUNIDADES: FuseNavigationItem[] =
    [
        {
            id: 'dirAtencionComunidades',
            title: 'DIR. ATENCION COMUNIDADES',
            type: 'group',
            icon: 'attractions',
            activo: false,
            disabled: false,
            children:
                [
                    {
                        id: 'operativoRural',
                        title: 'Operativo rural',
                        type: 'basic',
                        icon: 'agriculture',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'financieroRural',
                        title: 'Financiero Rural',
                        type: 'basic',
                        icon: 'heroicons_outline:cash',
                        activo: false,
                        disabled: false,
                    },
                    {
                        id: 'legalRural',
                        title: 'Legal Rural',
                        type: 'basic',
                        icon: 'assignment_late',
                        activo: false,
                        disabled: false,
                    }
                ]
        }
    ];
export const DIR_ATENCION_COMUNIDADES_C: FuseNavigationItem[] = [];
export const DIR_ATENCION_COMUNIDADES_F: FuseNavigationItem[] = [];
export const DIR_ATENCION_COMUNIDADES_H: FuseNavigationItem[] = [];
