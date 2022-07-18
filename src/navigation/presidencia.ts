import {FuseNavigationItem} from '../@fuse/components/navigation';

export const PRESIDENCIA: FuseNavigationItem[] =
    [
        {
            id: 'presidencia',
            title: 'PRESIDENCIA',
            type: 'group',
            icon: 'corporate_fare',
            children:
                [
                    {
                        id: 'deptos',
                        title: 'Departamentos',
                        type: 'basic',
                        icon: '',
                        link: ''
                    }
                ]
        }
    ];
