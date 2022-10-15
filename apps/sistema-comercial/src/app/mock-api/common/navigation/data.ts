/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@s-fuse/components/navigation';

import {concat} from 'lodash-es';
import {AREA_TECNICA, AREA_TECNICA_C, AREA_TECNICA_F, AREA_TECNICA_H} from '@s-app/common/navigation/area-tecnica.nav';
import {ADMINISTRADOR, ADMINISTRADOR_C, ADMINISTRADOR_F, ADMINISTRADOR_H} from '@s-app/common/navigation/administrador.nav';
import {PRESIDENCIA, PRESIDENCIA_C, PRESIDENCIA_F, PRESIDENCIA_H} from '@s-app/common/navigation/presidencia.nav';
import {GENERAL, GENERAL_C, GENERAL_F, GENERAL_H} from '@s-app/common/navigation/general.nav';
import {DIR_ADMON_FINANZAS, DIR_ADMON_FINANZAS_C, DIR_ADMON_FINANZAS_F, DIR_ADMON_FINANZAS_H} from "@s-app/common/navigation/dirAdmonFinanzas.nav";

export const defaultNavigation: FuseNavigationItem[] = concat(PRESIDENCIA, DIR_ADMON_FINANZAS, AREA_TECNICA, ADMINISTRADOR, GENERAL);
export const compactNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_C, DIR_ADMON_FINANZAS_C, AREA_TECNICA_C, ADMINISTRADOR_C, GENERAL_C);
export const futuristicNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_F, DIR_ADMON_FINANZAS_F, AREA_TECNICA_F, ADMINISTRADOR_F, GENERAL_F);
export const horizontalNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_H, DIR_ADMON_FINANZAS_H, AREA_TECNICA_H, ADMINISTRADOR_H, GENERAL_H);
