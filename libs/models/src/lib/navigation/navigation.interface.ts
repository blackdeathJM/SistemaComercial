export interface INavegacion
{
    id?: string;
    title?: string;
    subtitle?: string;
    type:
        | 'aside'
        | 'basic'
        | 'collapsable'
        | 'divider'
        | 'group'
        | 'spacer';
    hidden?: (item: INavegacion) => boolean;
    active?: boolean;
    disabled?: boolean;
    tooltip?: string;
    link?: string;
    fragment?: string;
    preserveFragment?: boolean;
    queryParams?: [key: string] | null;
    queryParamsHandling?: 'merge' | 'preserve' | '' | null;
    externalLink?: boolean;
    target?:
        | '_blank'
        | '_self'
        | '_parent'
        | '_top'
        | string;
    exactMatch?: boolean;
    isActiveMatchOptions?: {
        matrixParams: 'exact' | 'subset' | 'ignored';
        queryParams: 'exact' | 'subset' | 'ignored';
        paths: 'exact' | 'subset';
        fragment: 'exact' | 'ignored';
    };
    function?: (item: INavegacion) => void;
    classes?: {
        title?: string;
        subtitle?: string;
        icon?: string;
        wrapper?: string;
    };
    icon?: string;
    badge?: {
        title?: string;
        classes?: string;
    };
    children?: INavegacion[];
    meta?: any;
}

export type FuseVerticalNavigationAppearance =
    | 'default'
    | 'compact'
    | 'dense'
    | 'thin';

export type FuseVerticalNavigationMode =
    | 'over'
    | 'side';

export type FuseVerticalNavigationPosition =
    | 'left'
    | 'right';
