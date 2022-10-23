/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@s-fuse/components/navigation';
import {concat} from 'lodash-es';
import {ADMINISTRADOR, ADMINISTRADOR_C, ADMINISTRADOR_F, ADMINISTRADOR_H} from '#/libs/models/src/lib/navigation/administrador.nav';
import {PRESIDENCIA, PRESIDENCIA_C, PRESIDENCIA_F, PRESIDENCIA_H} from '#/libs/models/src/lib/navigation/presidencia.nav';
import {GENERAL, GENERAL_C, GENERAL_F, GENERAL_H} from '#/libs/models/src/lib/navigation/general.nav';
import {DIR_ADMON_FINANZAS, DIR_ADMON_FINANZAS_C, DIR_ADMON_FINANZAS_F, DIR_ADMON_FINANZAS_H} from '#/libs/models/src/lib/navigation/dirAdmonFinanzas.nav';
import {DIR_COMERCIAL, DIR_COMERCIAL_C, DIR_COMERCIAL_F, DIR_COMERCIAL_H} from '#/libs/models/src/lib/navigation/dir-comercial';
import {DIR_TECNICA_OPERATIVA, DIR_TECNICA_OPERATIVA_C, DIR_TECNICA_OPERATIVA_F, DIR_TECNICA_OPERATIVA_H} from '#/libs/models/src/lib/navigation/dir-tecnica-operativa';
import {DIR_ATENCION_COMUNIDADES, DIR_ATENCION_COMUNIDADES_C, DIR_ATENCION_COMUNIDADES_F, DIR_ATENCION_COMUNIDADES_H} from '#/libs/models/src/lib/navigation/dir-atencion-comunidades';
import {DIR_ARCHIVO_REG, DIR_ARCHIVO_REG_C, DIR_ARCHIVO_REG_F, DIR_ARCHIVO_REG_H} from '#/libs/models/src/lib/navigation/dir-archivo-reg';

export const defaultNavigation: FuseNavigationItem[] = concat(PRESIDENCIA, DIR_ADMON_FINANZAS, DIR_COMERCIAL, DIR_TECNICA_OPERATIVA,
    DIR_ATENCION_COMUNIDADES, DIR_ARCHIVO_REG, ADMINISTRADOR, GENERAL);

export const compactNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_C, DIR_ADMON_FINANZAS_C, DIR_COMERCIAL_C, DIR_TECNICA_OPERATIVA_C,
    DIR_ATENCION_COMUNIDADES_C, DIR_ARCHIVO_REG_C, ADMINISTRADOR_C, GENERAL_C);

export const futuristicNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_F, DIR_ADMON_FINANZAS_F, DIR_COMERCIAL_F, DIR_TECNICA_OPERATIVA_F,
    DIR_ATENCION_COMUNIDADES_F, DIR_ARCHIVO_REG_F, ADMINISTRADOR_F, GENERAL_F);

export const horizontalNavigation: FuseNavigationItem[] = concat(PRESIDENCIA_H, DIR_ADMON_FINANZAS_H, DIR_COMERCIAL_H, DIR_TECNICA_OPERATIVA_H,
    DIR_ATENCION_COMUNIDADES_H, DIR_ARCHIVO_REG_H, ADMINISTRADOR_H, GENERAL_H);
