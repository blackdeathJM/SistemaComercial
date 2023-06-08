import {Injectable} from '@angular/core';
import {IFormComun, TiposFormulario} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {IDatosTablaComun, ITabla} from '#/libs/models/src/lib/tabla.interface';
import * as math from 'mathjs';
import {isNil} from '@angular-ru/cdk/utils';

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    static formula(ids: string[], tipoForm: TiposFormulario, datos: IFormComun[]): string
    {
        if (ids.length === 1 && tipoForm === TiposFormulario.COMUN)
        {
            return ids[0] + '/100';
        }
        if (ids.length === 2 && tipoForm === TiposFormulario.COMUN)
        {
            return '(' + '(' + ids[0] + '/' + ids[1] + ')' + '*100' + ')' + '/100';
        }

        if (ids.length > 2 && tipoForm === TiposFormulario.COMUN)
        {
            return '(' + ids.join('+') + ')' + '/100';
        }

        if (ids.length === 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            return '(' + ids[0] + '/' + 'trimAnt' + ')' + '/100';
        }

        if (ids.length > 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            return '(' + ids.join('+') + ')/100';
        }

        if (ids.length === 2 && tipoForm === TiposFormulario.CON_OTRO_ID_PBR)
        {
            return '((' + ids[0] + '/' + ids[1] + '))/100'
        }
        if (datos.length >= 2)
        {
            const idsForm: string[] = [];
            const idsAd: string[] = [];
            datos.forEach(value =>
            {
                idsForm.push(value.idIndicador);
                idsAd.push(value.idIndicadorAd);
            });
            return '((' + idsForm.join('+') + ')' + '/' + '(' + idsAd.join('+') + '))/100';
        }
        return '';
    }

    static objFormula(pbr: IPbrCuestionario[], ids: string[]): object[]
    {
        const trim1 = {};
        const trim2 = {};
        const trim3 = {};
        const trim4 = {};

        for (const ele of pbr)
        {
            if (ids.includes(ele.idIndicador))
            {
                trim1[ele.idIndicador] = ele.trim1;
                trim2[ele.idIndicador] = ele.trim2;
                trim3[ele.idIndicador] = ele.trim3;
                trim4[ele.idIndicador] = ele.trim4;
            }
        }
        return [trim1, trim2, trim3, trim4];
    }

    static calcAvances(formula: string, obj: object): string
    {
        if (isNil(formula) || Object.keys(obj).length === 0)
        {
            return '0';
        }

        return math.evaluate(formula, obj);
    }

    construirDatosTabla(pbr: IPbrCuestionario[], form: IFormComun[]): IDatosTablaComun[]
    {
        const tablaValores: IDatosTablaComun[] = [];
        for (const elePbr of pbr)
        {
            for (const v of form)
            {
                if (elePbr.idIndicador === v.idIndicador)
                {
                    const datos: IDatosTablaComun = {
                        idIndicador: elePbr.idIndicador,
                        dato: elePbr.dato,
                        trim1: elePbr.trim1,
                        trim2: elePbr.trim2,
                        trim3: elePbr.trim3,
                        trim4: elePbr.trim4,
                        idIndicadorAd: '',
                        datoAd: '',
                        trim1Ad: 0,
                        trim2Ad: 0,
                        trim3Ad: 0,
                        trim4Ad: 0,
                        trim1Ant: 0,
                        trim2Ant: 0,
                        trim3Ant: 0,
                        trim4Ant: 0,
                    };

                    const pbrAd = pbr.find((x) => x.idIndicador === v.idIndicadorAd);
                    if (pbrAd)
                    {
                        datos.idIndicadorAd = pbrAd.idIndicador;
                        datos.datoAd = pbrAd.dato;
                        datos.trim1Ad = pbrAd.trim1;
                        datos.trim2Ad = pbrAd.trim2;
                        datos.trim3Ad = pbrAd.trim3;
                        datos.trim4Ad = pbrAd.trim4;
                    }

                    tablaValores.push(datos);
                }
            }
        }
        return tablaValores;
    }


    static colComun(formato: string): ITabla[]
    {
        return [
            {
                etiqueta: 'Variable',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '10%',
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto',
            },
            {
                etiqueta: 'Trimestre 1',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '10%',
                formato
            },
            {
                etiqueta: 'Trimestre 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '10%',
                formato
            },
            {
                etiqueta: 'Trimestre 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '10%',
                formato
            },
            {
                etiqueta: 'Trimestre 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '10%',
                formato
            }
        ];
    }

    static colConValorAd(formato: string): ITabla[]
    {
        return [
            {
                etiqueta: 'Variable',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '10%',
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto',
            },
            {
                etiqueta: 'Trim 1',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '5%',
                formato
            },
            {
                etiqueta: 'TrimAd 1',
                def: 'trim1Ad',
                llaveDato: 'trim1Ad',
                width: '5%',
                formato
            },
            {
                etiqueta: 'Trim 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '5%',
                formato
            },
            {
                etiqueta: 'TrimAd 2',
                def: 'trim2Ad',
                llaveDato: 'trim2Ad',
                width: '5%',
                formato
            },
            {
                etiqueta: 'Trim 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '5%',
                formato
            },
            {
                etiqueta: 'TrimAd 3',
                def: 'trim3Ad',
                llaveDato: 'trim3Ad',
                width: '5%',
                formato
            },
            {
                etiqueta: 'Trim 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '5%',
                formato
            },
            {
                etiqueta: 'TrimAd 4',
                def: 'trim4Ad',
                llaveDato: 'trim4Ad',
                width: '5%',
                formato
            }
        ];
    }

    static colPeriodoAnt(): ITabla[]
    {
        return [
            {
                etiqueta: 'Variable',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '10%',
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'auto',
            },
            {
                etiqueta: 'Per. Act. 1',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 1',
                def: 'trim1Ant',
                llaveDato: 'trim1Ant',
                width: '5%',
            },
            {
                etiqueta: 'Per. Act. 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 2',
                def: 'trim2Ant',
                llaveDato: 'trim2Ant',
                width: '5%',
            },
            {
                etiqueta: 'Per. Act. 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 3',
                def: 'trim3Ant',
                llaveDato: 'trim3Ant',
                width: '5%',
            },
            {
                etiqueta: 'Per. Act. 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '5%',
            },
            {
                etiqueta: 'Per. Ant. 4',
                def: 'trim4Ant',
                llaveDato: 'trim4Ant',
                width: '5%',
            }
        ];
    }
}
