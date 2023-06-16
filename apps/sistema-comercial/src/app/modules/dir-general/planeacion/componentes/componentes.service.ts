import {Injectable} from '@angular/core';
import {IFormComun, TiposFormulario} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario, ISumatorias} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {ITablaGen} from '#/libs/models/src/lib/tabla.interface';
import * as math from 'mathjs';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';
import {IDatosTablaComun} from "@s-dir-general/componentes/tabla-comun/tabla-comun.component";
import {exclude} from "@angular-ru/cdk/array";

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    static formula(ids: string[], tipoForm: TiposFormulario, form: IFormComun[]): string
    {
        const valFormComun = form.map(x => x.idIndicador);
        const valor = valFormComun.join('+');
        const valoresInclEnFormula = ids.filter(exclude(valFormComun));
        if (tipoForm === TiposFormulario.COMUN)
        {
            return `(${valor}) *100 ${valoresInclEnFormula}`;
        }

        if (tipoForm === TiposFormulario.PERIODO_ANT)
        {
            const periodoAnt = form.map(x => x.idIndicador + '-Ant');
            const unirValores = periodoAnt.join('+');
            const excluirValoresAnt = valoresInclEnFormula.filter(exclude(periodoAnt));
            return `(((${valor}) - (${unirValores})) / (${unirValores})) *100 ${excluirValoresAnt}`;
        }
        if (tipoForm === TiposFormulario.CON_OTRO_ID_PBR)
        {
            const valFormAd = form.map(x => x.idIndicadorAd);
            const unirValorAd = valFormAd.join('+');
            const excluirValoresAd = valoresInclEnFormula.filter(exclude(valFormAd));
            return `((${valor})-(${unirValorAd}) / ${unirValorAd}) * 100  ${excluirValoresAd}`;
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
        const objeto = {
            id: 0,
            idsigue: 50
        }
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
            const sumatoriaAd = sumatorias.find(z => z.idSumatoria === i.idIndicadorAd);

            if (isNotNil(sumatoriaAd))
            {
                datos.idIndicadorAd = sumatoriaAd.idSumatoria;
                datos.datoAd = sumatoriaAd.idSumatoria;
                datos.trim1 = sumatoriaAd.trim1;
                datos.trim2 = sumatoriaAd.trim2;
                datos.trim3 = sumatoriaAd.trim3;
                datos.trim4 = sumatoriaAd.trim4;
            }
            tablaValores.push(datos);
        }
        return tablaValores;
    }

    static colCompDinamico(columnas: string[], formato: string): ITablaGen[]
    {
        const columnasTabla: ITablaGen[] = [];

        columnas.forEach(x =>
        {
            const tituloColumna = x.split('-');
            const etiqueta = tituloColumna.shift();
            const def = tituloColumna.pop();

            const columnaTabla: ITablaGen =
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
