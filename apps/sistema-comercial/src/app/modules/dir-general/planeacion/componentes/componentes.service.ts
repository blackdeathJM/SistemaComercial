import {Injectable} from '@angular/core';
import {
    IFormComun,
    TiposFormulario
} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {IDatosTablaComun, ITabla} from '#/libs/models/src/lib/tabla.interface';
import * as math from 'mathjs';
import {isNil} from '@angular-ru/cdk/utils';

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    static formula(ids: string[], tipoForm: TiposFormulario): string
    {
        if (ids.length === 1 && tipoForm === TiposFormulario.COMUN)
        {
            return ids[0];
        }
        if (ids.length === 2 && tipoForm === TiposFormulario.COMUN)
        {
            return '(' + ids[0] + '/' + ids[1] + ')' + '*100';
        }

        if (ids.length > 2 && tipoForm === TiposFormulario.COMUN)
        {
            return '(' + ids.join('+') + ')';
        }

        if (ids.length === 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            return ids[0] + '/' + 'trimAnt';
        }

        if (ids.length > 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            return '(' + ids.join('+') + ')' + '/sumTrim'
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

        pbr.forEach(elePbr =>
        {
            form.forEach(v =>
            {
                const datos: IDatosTablaComun =
                    {
                        idIndicador: '',
                        dato: '',
                        trim1: 0,
                        trim2: 0,
                        trim3: 0,
                        trim4: 0,
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
                if (elePbr.idIndicador === v.idIndicadorAd)
                {
                    datos.idIndicadorAd = elePbr.idIndicador;
                    datos.dato = elePbr.dato;
                    datos.trim1Ad = elePbr.trim1;
                    datos.trim2Ad = elePbr.trim2;
                    datos.trim3Ad = elePbr.trim3;
                    datos.trim4Ad = elePbr.trim4;
                }

                if (elePbr.idIndicador === v.idIndicador)
                {
                    datos.idIndicador = elePbr.idIndicador;
                    datos.idIndicadorAd = elePbr.dato;
                    datos.trim1 = elePbr.trim1;
                    datos.trim2 = elePbr.trim2;
                    datos.trim3 = elePbr.trim3;
                    datos.trim4 = elePbr.trim4;
                    tablaValores.push(datos);
                }
            });
        })
        //TODO: Colocar un loading para cuando va hacer la carga
        return tablaValores;
    }

    static columnasComun(formato: string): ITabla[]
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

    static columnasPeriodoAnt(): ITabla[]
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
                def: 'trim1Anterior',
                llaveDato: 'trim1Anterior',
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
                def: 'trim2Anterior',
                llaveDato: 'trim2Anterior',
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
                def: 'trim3Anterior',
                llaveDato: 'trim3Anterior',
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
                def: 'trim4Anterior',
                llaveDato: 'trim4Anterior',
                width: '5%',
            }
        ];
    }
}
