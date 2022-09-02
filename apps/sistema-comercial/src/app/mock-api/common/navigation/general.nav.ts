import {FuseNavigationItem} from '@s-fuse/navigation';

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
                        link: ''
                    },
                    {
                        id: 'misResguardos',
                        title: 'Mis resguardos',
                        type: 'basic',
                        icon: 'feather:archive',
                        link: ''
                    }
                ]
        }
    ];

export const GENERAL_C: FuseNavigationItem[] = [];
export const GENERAL_F: FuseNavigationItem[] = [];
export const GENERAL_H: FuseNavigationItem[] = [];
