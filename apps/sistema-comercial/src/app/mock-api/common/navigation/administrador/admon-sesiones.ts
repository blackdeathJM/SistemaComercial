import {FuseNavigationItem} from '@s-fuse/navigation';
import {rutaBaseAdministrador} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/constantes/rutas';

export const ADMON_SESIONES: FuseNavigationItem =
    {
        id: 'depto-admonSesiones',
        title: 'Admon. sesiones',
        type: 'basic',
        icon: 'manage_accounts',
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        puedeAsigPermisos: true,
        acceso: true,
        link: rutaBaseAdministrador + 'empleados-sesion'
    };
