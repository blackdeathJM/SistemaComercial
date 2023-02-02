import {FuseNavigationItem} from '@s-fuse/navigation';
import {AMPLIACIONES_CONSTRUCCIONES} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/ampliaciones-construcciones';
import {OPERACIONES} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/operaciones';
import {SANEAMIENTO} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/saneamiento';
import {TELEMETRIA} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';

export const DIR_TECNICA_OPERATIVA: FuseNavigationItem[] =
    [
        {
            id: 'dir-tecnicaOperativa',
            title: 'DIR. TECNICA OPERATIVA',
            type: 'group',
            icon: 'heroicons_outline:cube-transparent',
            oculto: false,
            hidden: (item: FuseNavigationItem): boolean => item.oculto,
            badge: {},
            controles: [],
            disabled: false,
            puedeAsigPermisos: false,
            acceso: true,
            children: [AMPLIACIONES_CONSTRUCCIONES, OPERACIONES, SANEAMIENTO, TELEMETRIA]
        }
    ];
export const DIR_TECNICA_OPERATIVA_C: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_F: FuseNavigationItem[] = [];
export const DIR_TECNICA_OPERATIVA_H: FuseNavigationItem[] = [];
