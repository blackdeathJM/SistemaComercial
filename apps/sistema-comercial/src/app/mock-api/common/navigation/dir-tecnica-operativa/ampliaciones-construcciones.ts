import {FuseNavigationItem} from '@s-fuse/navigation';

export const AMPLIACIONES_CONSTRUCCIONES: FuseNavigationItem =
    {
        id: 'ampleacionesConstrucciones',
        title: 'Amp y construccion',
        tooltip: 'Ampleaciones y construccion',
        type: 'basic',
        icon: 'add_road',
        activo: false,
        oculto: false,
        hidden: (item: FuseNavigationItem): boolean => item.oculto,
        badge: {},
        controles: [],
        disabled: false,
        active: false,
    };
