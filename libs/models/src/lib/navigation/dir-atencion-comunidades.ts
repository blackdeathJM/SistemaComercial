import {FuseNavigationItem} from 'apps/sistema-comercial/src/@fuse/components/navigation';

export const DIR_ATENCION_COMUNIDADES: FuseNavigationItem[] =
    [
        {
            id: 'dirAtencionComunidades',
            title: 'DIR. ATENCION COMUNIDADES',
            type: 'group',
            icon: 'attractions',
            children:
                [
                    {
                        id: 'operativoRural',
                        title: 'Operativo rural',
                        type: 'basic',
                        icon: 'agriculture'
                    },
                    {
                        id: 'financieroRural',
                        title: 'Financiero Rural',
                        type: 'basic',
                        icon: 'heroicons_outline:cash'
                    },
                    {
                        id: 'legalRural',
                        title: 'Legal Rural',
                        type: 'basic',
                        icon: 'assignment_late'
                    }
                ]
        }
    ];
export const DIR_ATENCION_COMUNIDADES_C: FuseNavigationItem[] = [];
export const DIR_ATENCION_COMUNIDADES_F: FuseNavigationItem[] = [];
export const DIR_ATENCION_COMUNIDADES_H: FuseNavigationItem[] = [];
