import {FuseNavigationItem} from '../../../../@fuse/components/navigation';

export const PRESIDENCIA: FuseNavigationItem[] =
    [
        {
            id: 'presidencia',
            title: 'PRESIDENCIA',
            type: 'group',
            children:
                [
                    {
                        id: 'deptos',
                        title: 'Departamentos',
                        type: 'basic',
                        icon: 'corporate_fare',
                        link: ''
                    }
                ]
        }
    ];
