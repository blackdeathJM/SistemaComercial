import {FuseNavigationItem} from '@s-fuse/navigation';
import {FINANCIERO_RURAL} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-atencion-comunidades/financiero-rural';
import {OPERATIVO_RURAL} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-atencion-comunidades/operativo-rural';
import {LEGAL_RURAL} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-atencion-comunidades/legal-rural';

export const DIR_ATENCION_COMUNIDADES: FuseNavigationItem[] =
    [
        {
            id: 'dirAtencionComunidades',
            title: 'DIR. ATENCION COMUNIDADES',
            type: 'group',
            icon: 'attractions',
            activo: false,
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            active: false,
            children: [FINANCIERO_RURAL, OPERATIVO_RURAL, LEGAL_RURAL]
        }
    ];
export const DIR_ATENCION_COMUNIDADES_C: FuseNavigationItem[] = [];
export const DIR_ATENCION_COMUNIDADES_F: FuseNavigationItem[] = [];
export const DIR_ATENCION_COMUNIDADES_H: FuseNavigationItem[] = [];
