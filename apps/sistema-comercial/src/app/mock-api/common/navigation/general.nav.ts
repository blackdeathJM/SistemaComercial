import {FuseNavigationItem} from '@s-fuse/navigation';
import {rutaGeneral} from '@s-app/common/navigation/constantes/rutas';

export const GENERAL: FuseNavigationItem[] =
    [
        {
            id: 'general',
            title: 'GENERAL',
            type: 'group',
            icon: '6_ft_apart',
            children:
                [
                    {
                        id: 'documentos',
                        title: 'Mis documentos',
                        type: 'basic',
                        icon: 'feather:folder',
                        link: rutaGeneral + 'mis-documentos'
                    },
                    {
                        id: 'misResguardos',
                        title: 'Mis resguardos',
                        type: 'basic',
                        icon: 'feather:archive',
                        link: rutaGeneral + 'mis-resguardos'
                    },
                    {
                        id: 'ordenesDeAtencion',
                        title: 'Ordenes de atencion',
                        type: 'basic',
                        icon: 'feather:file-text',
                        link: rutaGeneral + 'ordenes-atencion'
                    }
                ]
        }
    ];

export const GENERAL_C: FuseNavigationItem[] = [];
export const GENERAL_F: FuseNavigationItem[] = [];
export const GENERAL_H: FuseNavigationItem[] = [];
