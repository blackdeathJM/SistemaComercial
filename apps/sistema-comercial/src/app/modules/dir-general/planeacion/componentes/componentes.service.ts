import {Injectable} from '@angular/core';
import {IFormComun, TiposFormulario} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario, ISumatorias} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {ITablaGen} from '#/libs/models/src/lib/tabla.interface';
import * as math from 'mathjs';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';
import {IDatosTablaComun} from "@s-dir-general/componentes/tabla-comun/tabla-comun.component";

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    static formula(ids: string[], tipoForm: TiposFormulario, datos: IFormComun[]): string
    {
        if (tipoForm === TiposFormulario.COMUN && ids.length === 1)
        {
            const valor = ids[0];
            return `(${valor}) * 100`;
        }

        if (tipoForm === TiposFormulario.COMUN && ids.length === 2)
        {
            const valor1 = ids[0];
            const valor2 = ids[1];
            return `( ${valor1} / ${valor2}) * 100`;
        }

        if (tipoForm === TiposFormulario.COMUN && ids.length > 2)
        {
            const trim = ids.join('+');
            return `(${trim}) / 100`;
        }

        if (tipoForm === TiposFormulario.PERIODO_ANT)
        {
            const periodoActual = ids.join('+');
            const periodoAnt = ids.join('+') + 'Ant';
            return `((${periodoActual}) - (${periodoAnt})/ ${periodoAnt}) * 100`;
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

    static crearObjFormula(pbr: IPbrCuestionario[], ids: string[], sumatorias: ISumatorias[], formComun: IFormComun[]): object[]
    {
        const objFormula: Record<string, number>[] = [{}, {}, {}, {}];

        ids.forEach((id) =>
        {
            const idDivididoEnArray = id.split('-');
            const nvoId = idDivididoEnArray.shift();
            const sufijo = isNotNil(idDivididoEnArray.pop()) ? '-Ad' : '';

            const pbrEncontrado = pbr.find(x => x.idIndicador === nvoId);
            if (isNotNil(pbrEncontrado))
            {
                objFormula[0][pbrEncontrado.idIndicador + sufijo] = pbrEncontrado.trim1;
                objFormula[1][pbrEncontrado.idIndicador + sufijo] = pbrEncontrado.trim2;
                objFormula[2][pbrEncontrado.idIndicador + sufijo] = pbrEncontrado.trim3;
                objFormula[3][pbrEncontrado.idIndicador + sufijo] = pbrEncontrado.trim3;
            }
            const sumatoria = sumatorias.find(x => x.idSumatoria === nvoId);
            //Obtener los valores de los trimestres anteriores, solo se buscan en el idPrincipal, ya que el idIndicador-Ad no va a tener trimestres anteriores
            formComun.forEach(x =>
            {
                if (x.idIndicador === id)
                {
                    objFormula[0]['trim1Ant'] = x.trim1Ant;
                    objFormula[1]['trim2Ant'] = x.trim2Ant;
                    objFormula[2]['trim3Ant'] = x.trim3Ant;
                    objFormula[3]['trim4Ant'] = x.trim4Ant;
                }
            });

            if (isNotNil(sumatoria))
            {
                objFormula[0][sumatoria.idSumatoria + sufijo] = sumatoria.trim1;
                objFormula[1][sumatoria.idSumatoria + sufijo] = sumatoria.trim2;
                objFormula[2][sumatoria.idSumatoria + sufijo] = sumatoria.trim3;
                objFormula[3][sumatoria.idSumatoria + sufijo] = sumatoria.trim4;
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
