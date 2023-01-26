/* tslint:disable:max-line-length */
import {concat} from 'lodash-es';
import {FuseNavigationItem} from '@s-fuse/navigation';
import {DIR_COMERCIAL, DIR_COMERCIAL_C, DIR_COMERCIAL_F, DIR_COMERCIAL_H} from './dir-comercial';
import {DIR_TECNICA_OPERATIVA, DIR_TECNICA_OPERATIVA_C, DIR_TECNICA_OPERATIVA_F, DIR_TECNICA_OPERATIVA_H} from './dir-tecnica-operativa';
import {GENERAL, GENERAL_C, GENERAL_F, GENERAL_H} from './general.nav';
import {ADMINISTRADOR, ADMINISTRADOR_C, ADMINISTRADOR_F, ADMINISTRADOR_H} from './administrador.nav';
import {DIR_ARCHIVO_REG, DIR_ARCHIVO_REG_C, DIR_ARCHIVO_REG_F, DIR_ARCHIVO_REG_H} from './dir-archivo-reg';
import {DIR_ATENCION_COMUNIDADES, DIR_ATENCION_COMUNIDADES_C, DIR_ATENCION_COMUNIDADES_F, DIR_ATENCION_COMUNIDADES_H} from './dir-atencion-comunidades';
import {DIR_ADMON_FINANZAS, DIR_ADMON_FINANZAS_C, DIR_ADMON_FINANZAS_F, DIR_ADMON_FINANZAS_H} from './dir-admon-finanzas/dir-admon-finanzas';

export const defaultNavigation: FuseNavigationItem[] = concat(DIR_ADMON_FINANZAS, DIR_COMERCIAL, DIR_TECNICA_OPERATIVA,
    DIR_ATENCION_COMUNIDADES, DIR_ARCHIVO_REG, ADMINISTRADOR, GENERAL);

export const compactNavigation: FuseNavigationItem[] = concat(DIR_ADMON_FINANZAS_C, DIR_COMERCIAL_C, DIR_TECNICA_OPERATIVA_C,
    DIR_ATENCION_COMUNIDADES_C, DIR_ARCHIVO_REG_C, ADMINISTRADOR_C, GENERAL_C);

export const futuristicNavigation: FuseNavigationItem[] = concat(DIR_ADMON_FINANZAS_F, DIR_COMERCIAL_F, DIR_TECNICA_OPERATIVA_F,
    DIR_ATENCION_COMUNIDADES_F, DIR_ARCHIVO_REG_F, ADMINISTRADOR_F, GENERAL_F);

export const horizontalNavigation: FuseNavigationItem[] = concat(DIR_ADMON_FINANZAS_H, DIR_COMERCIAL_H, DIR_TECNICA_OPERATIVA_H,
    DIR_ATENCION_COMUNIDADES_H, DIR_ARCHIVO_REG_H, ADMINISTRADOR_H, GENERAL_H);
