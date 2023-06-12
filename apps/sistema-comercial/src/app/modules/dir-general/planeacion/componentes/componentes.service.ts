import {Injectable} from '@angular/core';
import {IFormComun, TiposFormulario} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario, ISumatorias} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {IDatosTablaComun, ITabla} from '#/libs/models/src/lib/tabla.interface';
import * as math from 'mathjs';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    static formula(ids: string[], tipoForm: TiposFormulario, datos: IFormComun[]): string
    {
        if (ids.length === 1 && tipoForm === TiposFormulario.COMUN)
        {
            const valor = ids[0];
            return `${valor} * 100`
        }
        if (ids.length === 2 && tipoForm === TiposFormulario.COMUN)
        {
            const valor1 = ids[0];
            const valor2 = ids[1];
            return `( ${valor1} / ${valor2}) * 100`;
        }

        if (ids.length > 2 && tipoForm === TiposFormulario.COMUN)
        {
            return '(' + ids.join('+') + ')' + '/100';
        }

        if (ids.length === 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            const periodoActual = ids.join('+');
            const periodoAnt = ids.join('+Ant') + 'Ant';
            return `((${periodoActual} - ${periodoAnt})) / ${periodoAnt} * 100`
        }
        if (ids.length > 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            const periodoActual = ids.join('+');
            const periodoAnt = ids.join('+Ant') + 'Ant';
            return `(( ${periodoActual} - ${periodoAnt}) / ${periodoAnt}) *100`;
        }

        if (ids.length === 2 && tipoForm === TiposFormulario.CON_OTRO_ID_PBR)
        {
            // const valor1 = ids[0];
            // const valor2 = ids[1];
            return '((' + ids[0] + '/' + ids[1] + ')) *100'
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
            return '((' + idsForm.join('+') + ')' + '/' + '(' + idsAd.join('+') + '))*100';
        }
        return '';
    }

    static objFormula(pbr: IPbrCuestionario[], ids: string[], form: IFormComun[], sumatorias: ISumatorias[]): object[]
    {
        const trim1 = {};
        const trim2 = {};
        const trim3 = {};
        const trim4 = {};

        form.forEach((i) =>
        {
            const elemento = pbr.find(x => x.idIndicador === i.idIndicador);
            if (isNotNil(elemento))
            {
                trim1[elemento.idIndicador] = elemento.trim1;
                trim2[elemento.idIndicador] = elemento.trim2;
                trim3[elemento.idIndicador] = elemento.trim3;
                trim4[elemento.idIndicador] = elemento.trim4;

                trim1[elemento.idIndicador + 'Ant'] = i.trim1Ant;
                trim2[elemento.idIndicador + 'Ant'] = i.trim2Ant;
                trim3[elemento.idIndicador + 'Ant'] = i.trim3Ant;
                trim4[elemento.idIndicador + 'Ant'] = i.trim4Ant;
            }
        });
        //Filtramos los ids que se utilizan en la fórmula porque no necesariamente tienen que ir todos en el form y solo dejamos los que no están en el formulario para asi
        // optimizar el renidimiento de la aplicacion y no realice busquedas inecesarias.
        const idsRestantes = ids.filter((id) => !form.some(form => form.idIndicador === id));

        idsRestantes.forEach((i) =>
        {
            const elemento = pbr.find(x => x.idIndicador === i);
            if (isNotNil(elemento))
            {
                trim1[elemento.idIndicador] = elemento.trim1;
                trim2[elemento.idIndicador] = elemento.trim2;
                trim3[elemento.idIndicador] = elemento.trim3;
                trim4[elemento.idIndicador] = elemento.trim4;
            }
        });

        form.forEach((i) =>
        {
            const elemento = sumatorias.find(x => x.idSumatoria === i.idIndicador);
            if (isNotNil(elemento))
            {
                trim1[elemento.idSumatoria] = elemento.trim1;
                trim2[elemento.idSumatoria] = elemento.trim2;
                trim3[elemento.idSumatoria] = elemento.trim3;
                trim4[elemento.idSumatoria] = elemento.trim4;

                trim1[elemento.idSumatoria + 'Ant'] = i.trim1Ant;
                trim2[elemento.idSumatoria + 'Ant'] = i.trim2Ant;
                trim3[elemento.idSumatoria + 'Ant'] = i.trim3Ant;
                trim4[elemento.idSumatoria + 'Ant'] = i.trim4Ant;
            }
        });
        console.log('Objectos para el calculo', trim1, trim2, trim3, trim4);
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

    construirDatosTabla(pbr: IPbrCuestionario[], form: IFormComun[], sumatorias: ISumatorias[]): IDatosTablaComun[]
    {
        const tablaValores: IDatosTablaComun[] = [];

        for (const i of form)
        {
            const datos: IDatosTablaComun = {

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
            const pbrElemento = pbr.find(x => x.idIndicador === i.idIndicador);

            if (isNotNil(pbrElemento))
            {
                datos.idIndicador = pbrElemento.idIndicador;
                datos.dato = pbrElemento.dato;
                datos.trim1 = pbrElemento.trim1;
                datos.trim2 = pbrElemento.trim2;
                datos.trim3 = pbrElemento.trim3;
                datos.trim4 = pbrElemento.trim4;

                datos.trim1Ant = i.trim1Ant;
                datos.trim2Ant = i.trim2Ant;
                datos.trim3Ant = i.trim3Ant;
                datos.trim4Ant = i.trim4Ant;
            }

            const pbrAd = pbr.find((x) => x.idIndicador === i.idIndicadorAd);

            if (isNotNil(pbrAd))
            {
                datos.idIndicadorAd = pbrAd.idIndicador;
                datos.datoAd = pbrAd.dato;
                datos.trim1Ad = pbrAd.trim1;
                datos.trim2Ad = pbrAd.trim2;
                datos.trim3Ad = pbrAd.trim3;
                datos.trim4Ad = pbrAd.trim4;
            }
            const sumatoria = sumatorias.find(y => y.idSumatoria === i.idIndicador);

            if (isNotNil(sumatoria))
            {
                datos.idIndicador = sumatoria.idSumatoria;
                datos.dato = sumatoria.nombreSumatoria;
                datos.trim1 = sumatoria.trim1;
                datos.trim2 = sumatoria.trim2;
                datos.trim3 = sumatoria.trim3;
                datos.trim4 = sumatoria.trim4;
            }
            tablaValores.push(datos);
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
                def: 'Ind',
                llaveDato: 'idIndicador',
                width: '6%',
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
                width: '6%',
                formato
            },
            {
                etiqueta: 'Ad',
                def: 'trim1Ad',
                llaveDato: 'trim1Ad',
                width: '6%',
                formato
            },
            {
                etiqueta: 'Trim 2',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '6%',
                formato
            },
            {
                etiqueta: 'Ad',
                def: 'trim2Ad',
                llaveDato: 'trim2Ad',
                width: '6%',
                formato
            },
            {
                etiqueta: 'Trim 3',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '6%',
                formato
            },
            {
                etiqueta: 'Ad',
                def: 'trim3Ad',
                llaveDato: 'trim3Ad',
                width: '6%',
                formato
            },
            {
                etiqueta: 'Trim 4',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '6%',
                formato
            },
            {
                etiqueta: 'Ad',
                def: 'trim4Ad',
                llaveDato: 'trim4Ad',
                width: '6%',
                formato
            }
        ];
    }

    static colPeriodoAnt(formato: string): ITabla[]
    {
        return [
            {
                etiqueta: 'Indicador',
                def: 'idIndicador',
                llaveDato: 'idIndicador',
                width: '6%',
            },
            {
                etiqueta: 'Dato',
                def: 'dato',
                llaveDato: 'dato',
                width: 'Auto',
            },
            {
                etiqueta: 'Actual',
                def: 'trim1',
                llaveDato: 'trim1',
                width: '7%',
                formato
            },
            {
                etiqueta: 'Anterior',
                def: 'trim1Ant',
                llaveDato: 'trim1Ant',
                width: '7%',
                formato
            },
            {
                etiqueta: 'Actual',
                def: 'trim2',
                llaveDato: 'trim2',
                width: '7%',
                formato
            },
            {
                etiqueta: 'Anterior',
                def: 'trim2Ant',
                llaveDato: 'trim2Ant',
                width: '7%',
                formato
            },
            {
                etiqueta: 'Actual',
                def: 'trim3',
                llaveDato: 'trim3',
                width: '7%',
                formato
            },
            {
                etiqueta: 'Anterior',
                def: 'trim3Ant',
                llaveDato: 'trim3Ant',
                width: '7%',
                formato
            },
            {
                etiqueta: 'Actual',
                def: 'trim4',
                llaveDato: 'trim4',
                width: '7%',
                formato
            },
            {
                etiqueta: 'Anterior',
                def: 'trim4Ant',
                llaveDato: 'trim4Ant',
                width: '7%',
                formato
            }
        ];
    }

    static colCompDinamico(columnas: string[], formato: string): ITabla[]
    {
        const columnasTabla: ITabla[] = [];
        columnas.forEach(x =>
        {
            const tituloColumna = x.split('-');
            const etiqueta = tituloColumna.shift();
            const def = tituloColumna.pop();
            const columnaTabla: ITabla =
                {
                    etiqueta,
                    def: etiqueta === 'idIndicador' || etiqueta === 'dato' ? etiqueta : def,
                    formato,
                    llaveDato: etiqueta === 'idIndicador' || etiqueta === 'dato' ? etiqueta : def,
                    width: etiqueta === 'dato' ? 'auto' : '7%'

                };
            columnasTabla.push(columnaTabla);
        });
        return columnasTabla;
    }

    static datosCompDinamicoReg(listaDeValores: object[]): object[]
    {
        return [listaDeValores.reduce((acc, act) => Object.assign(acc, act), {})];
    }
}
