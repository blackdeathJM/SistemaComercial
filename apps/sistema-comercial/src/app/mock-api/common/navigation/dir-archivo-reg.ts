import {FuseNavigationItem} from '@s-fuse/navigation';
import {dirArchivoRegulacion} from '@s-app/common/navigation/constantes/rutas';

export const DIR_ARCHIVO_REG: FuseNavigationItem[] =
    [
        {
            id: 'dirArchivoReg',
            title: 'DIR. ARCHIVO GRAL REG',
            tooltip: 'Direccion de archivo general y regulacion',
            type: 'group',
            icon: 'heroicons_outline:office-building',
            children:
                [
                    {
                        id: 'transparencia',
                        title: 'Transparencia',
                        type: 'basic',
                        icon: 'heroicons_outline:document-report',
                        link: dirArchivoRegulacion
                    },
                    {
                        id: 'juridico',
                        title: 'Juridico',
                        type: 'basic',
                        icon: 'heroicons_outline:newspaper',
                        link: dirArchivoRegulacion
                    },
                    {
                        id: 'regulacion',
                        title: 'Regulacion',
                        type: 'basic',
                        icon: 'heroicons_outline:collection'
                    }
                ]
        }
    ];

export const DIR_ARCHIVO_REG_C: FuseNavigationItem[] = [];
export const DIR_ARCHIVO_REG_F: FuseNavigationItem[] = [];
export const DIR_ARCHIVO_REG_H: FuseNavigationItem[] = [];
