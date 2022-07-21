/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';
import {PRESIDENCIA, PRESIDENCIA_C, PRESIDENCIA_F, PRESIDENCIA_H} from './presidencia';
import {concat} from 'lodash-es';
import {AREA_TECNICA, AREA_TECNICA_C, AREA_TECNICA_F, AREA_TECNICA_H} from '@app/mock-api/common/navigation/area-tecnica';
import {ADMINISTRADOR, ADMINISTRADOR_C, ADMINISTRADOR_F, ADMINISTRADOR_H} from '@app/mock-api/common/navigation/administrador';

export const defaultNavigation: FuseNavigationItem[] = concat(PRESIDENCIA, AREA_TECNICA, ADMINISTRADOR);
export const compactNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_C, AREA_TECNICA_C, ADMINISTRADOR_C);
export const futuristicNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_F, AREA_TECNICA_F, ADMINISTRADOR_F);
export const horizontalNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_H, AREA_TECNICA_H, ADMINISTRADOR_H);
