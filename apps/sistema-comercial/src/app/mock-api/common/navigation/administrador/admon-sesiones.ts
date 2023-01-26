import {FuseNavigationItem} from '@s-fuse/navigation';
import {rutaBaseAdministrador} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const ADMON_SESIONES: FuseNavigationItem =
    {
        id: 'admonSesiones',
        title: 'Admon. sesiones',
        type: 'basic',
        icon: 'manage_accounts',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
        link: rutaBaseAdministrador + 'empleados-sesion'
    };
