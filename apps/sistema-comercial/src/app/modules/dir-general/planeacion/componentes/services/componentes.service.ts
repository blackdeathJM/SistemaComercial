import {Injectable} from '@angular/core';
import {IFormComun, TiposFormulario} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario, ISumatorias} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {IDatosTablaFormComun, IGenerarColumnTabla} from '#/libs/models/src/lib/tabla.interface';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';
import * as math from 'mathjs';

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    static formula(ids: string[], tipoForm: TiposFormulario, form: IFormComun[]): string
    {

        const formActions = {
            [TiposFormulario.COMUN]: () =>
            {
                const valFormComun = form.map(x => x.idIndicador);
                const valor = valFormComun.join('+');
                const valoresInclEnFormula = ids.filter(id => !valFormComun.includes(id));
                return `(${valor}) * 100 ${valoresInclEnFormula.join(' ')}`;
            },
            [TiposFormulario.PERIODO_ANT]: () =>
            {
                const valFormComun = form.map(x => x.idIndicador);
                const valor = valFormComun.join('+');
                const periodoAnt = form.map(x => x.idIndicador + '__Ant');
                const unirValores = periodoAnt.join('+');
                const excluirValoresAnt = ids.filter(id => !valFormComun.includes(id) && !periodoAnt.includes(id));
                return `(((${valor}) - (${unirValores})) / (${unirValores})) * 100 ${excluirValoresAnt.join(' ')}`;
            },
            [TiposFormulario.CON_OTRO_ID_PBR]: () =>
            {
                const valFormComun = form.map(x => x.idIndicador);
                const valor = valFormComun.join('+');
                const valFormAd = form.map(x => x.idIndicadorAd);
                const unirValorAd = valFormAd.join('+');
                const excluirValoresAd = ids.filter(id => !valFormComun.includes(id) && !valFormAd.includes(id));
                return `((${valor}) - (${unirValorAd}) / ${unirValorAd}) * 100 ${excluirValoresAd.join(' ')}`;
            },
        };

        const formAction = formActions[tipoForm];
        if (formAction)
        {
            return formAction();
        }

        return '';
    }

    static crearObjFormula(pbr: IPbrCuestionario[], ids: string[], sumatorias: ISumatorias[], formComun: IFormComun[]): object[]
    {
        const objFormula: Record<string, number>[] = [{}, {}, {}, {}];
        ids.forEach((id) =>
        {
            const idDivididoEnArray = id.split('__');
            const nvoId = idDivididoEnArray.shift();
            let sufijo = '__' + idDivididoEnArray.pop();
            let trimestresAnt = [0, 0, 0, 0];

            const pbrEncontrado = pbr.find(x => x.idIndicador === nvoId);
            if (sufijo === '__undefined')
            {
                sufijo = '';
            }
            if (sufijo === '__Ant')
            {
                const valoresTrim = formComun.find(x => x.idIndicador === pbrEncontrado.idIndicador);
                trimestresAnt[0] = valoresTrim.trim1Ant;
                trimestresAnt[1] = valoresTrim.trim2Ant;
                trimestresAnt[2] = valoresTrim.trim3Ant;
                trimestresAnt[3] = valoresTrim.trim4Ant;
            }
            if (isNotNil(pbrEncontrado))
            {
                objFormula[0][(pbrEncontrado.idIndicador + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[0] : pbrEncontrado.trim1;
                objFormula[1][(pbrEncontrado.idIndicador + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[1] : pbrEncontrado.trim2;
                objFormula[2][(pbrEncontrado.idIndicador + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[2] : pbrEncontrado.trim3;
                objFormula[3][(pbrEncontrado.idIndicador + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[3] : pbrEncontrado.trim4;
            }
            const sumatoria = sumatorias.find(x => x.idSumatoria === nvoId);
            if (isNotNil(sumatoria))
            {
                objFormula[0][(sumatoria.idSumatoria + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[0] : sumatoria.trim1;
                objFormula[1][(sumatoria.idSumatoria + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[1] : sumatoria.trim2;
                objFormula[2][(sumatoria.idSumatoria + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[2] : sumatoria.trim3;
                objFormula[3][(sumatoria.idSumatoria + sufijo).trim()] = sufijo === '__Ant' ? trimestresAnt[3] : sumatoria.trim4;
            }
        });
        return objFormula;
    }

    static calcAvances(formula: string, obj: object): string
    {
        if (isNil(formula) || Object.keys(obj).length === 0)
        {
            return '0';
        }
        return math.evaluate(formula, obj);
    }

    construirDatosTabla(pbr: IPbrCuestionario[], form: IFormComun[], sumatorias: ISumatorias[]): IDatosTablaFormComun[]
    {
        const tablaValores: IDatosTablaFormComun[] = [];

        for (const i of form)
        {
            const datos: IDatosTablaFormComun = {

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
                Object.assign(datos, {
                    idIndicador: pbrElemento.idIndicador,
                    dato: pbrElemento.dato,
                    trim1: pbrElemento.trim1,
                    trim2: pbrElemento.trim2,
                    trim3: pbrElemento.trim3,
                    trim4: pbrElemento.trim4,

                    trim1Ant: i.trim1Ant,
                    trim2Ant: i.trim2Ant,
                    trim3Ant: i.trim3Ant,
                    trim4Ant: i.trim4Ant,
                });
            }

            const pbrAd = pbr.find((x) => x.idIndicador === i.idIndicadorAd);
            if (isNotNil(pbrAd))
            {
                Object.assign(datos,
                    {
                        idIndicadorAd: pbrAd.idIndicador,
                        datoAd: pbrAd.dato,
                        trim1Ad: pbrAd.trim1,
                        trim2Ad: pbrAd.trim2,
                        trim3Ad: pbrAd.trim3,
                        trim4Ad: pbrAd.trim4
                    });
            }

            const sumatoria = sumatorias.find(y => y.idSumatoria === i.idIndicador);
            if (isNotNil(sumatoria))
            {
                Object.assign(datos, {
                    idIndicador: sumatoria.idSumatoria,
                    dato: sumatoria.nombreSumatoria,
                    trim1: sumatoria.trim1,
                    trim2: sumatoria.trim2,
                    trim3: sumatoria.trim3,
                    trim4: sumatoria.trim4
                });
            }
            const sumatoriaAd = sumatorias.find(z => z.idSumatoria === i.idIndicadorAd);

            if (isNotNil(sumatoriaAd))
            {
                Object.assign(datos,
                    {
                        idIndicadorAd: sumatoriaAd.idSumatoria,
                        datoAd: sumatoriaAd.idSumatoria,
                        trim1: sumatoriaAd.trim1,
                        trim2: sumatoriaAd.trim2,
                        trim3: sumatoriaAd.trim3,
                        trim4: sumatoriaAd.trim4,
                    });
            }
            tablaValores.push(datos);
        }
        return tablaValores;
    }

    static colCompDinamico(columnas: string[], formato: string): IGenerarColumnTabla[]
    {
        const columnasTabla: IGenerarColumnTabla[] = [];
        columnas.forEach(x =>
        {
            const tituloColumna = x.split('__');
            const etiqueta = tituloColumna.shift();
            const def = tituloColumna.pop();

            const columnaTabla: IGenerarColumnTabla =
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
}
