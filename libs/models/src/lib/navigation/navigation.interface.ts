export interface INavigation
{
    id: string;
    acceso: boolean;
    ctrls: ICtrl[];
}

interface ICtrl
{
    id: string;
    acceso: boolean;
}
