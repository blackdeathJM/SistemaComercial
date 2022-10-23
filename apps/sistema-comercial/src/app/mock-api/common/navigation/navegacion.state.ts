import {makeVar, ReactiveVar} from '@apollo/client';
import {FuseNavigationItem} from '@s-fuse/navigation';

export const STATE_NAVEGACION: ReactiveVar<FuseNavigationItem[]> = makeVar<FuseNavigationItem[]>([]);
