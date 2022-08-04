/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@s-fuse/components/navigation';

import {concat} from 'lodash-es';
import {AREA_TECNICA, AREA_TECNICA_C, AREA_TECNICA_F, AREA_TECNICA_H} from '@s-app/mock-api/common/navigation/area-tecnica';
import {ADMINISTRADOR, ADMINISTRADOR_C, ADMINISTRADOR_F, ADMINISTRADOR_H} from '@s-app/mock-api/common/navigation/administrador';
import {PRESIDENCIA, PRESIDENCIA_C, PRESIDENCIA_F, PRESIDENCIA_H} from '@s-app/common/navigation/presidencia';

export const defaultNavigation: FuseNavigationItem[] = concat(PRESIDENCIA, AREA_TECNICA, ADMINISTRADOR);
export const compactNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_C, AREA_TECNICA_C, ADMINISTRADOR_C);
export const futuristicNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_F, AREA_TECNICA_F, ADMINISTRADOR_F);
export const horizontalNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_H, AREA_TECNICA_H, ADMINISTRADOR_H);
