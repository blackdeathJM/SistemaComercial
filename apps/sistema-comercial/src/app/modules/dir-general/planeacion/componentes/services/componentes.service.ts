import {Injectable} from '@angular/core';
import {IFormComun} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario, ISumatorias} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {IDatosTablaFormComun, IGenerarColumnTabla} from '#/libs/models/src/lib/tabla.interface';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';
import * as math from 'mathjs';
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {PrefFormDin} from "@s-dir-general/componentes/mod-componentes/mod-comp-dinamico/mod-comp-dinamico.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";

export interface IDatosFormulario
{
    [key: string]: string | number;
}

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    constructor(private planeacionQuery: PlaneacionQuery) {}

    static formarObj(pref: string[], ctrlId: string, valores: string[]): IDatosFormulario
    {
        const obj: IDatosFormulario = {};
        pref.forEach((x, i) =>
        {
            obj[x + ctrlId] = valores[i];
        });
        return obj;
    };

    static obtValoresForm(pref: string[], ctrlId: string, form: FormGroup): string[]
    {
        const valores: string[] = [];
        pref.forEach(x =>
        {
            const valor = form.get(x + ctrlId).value;
            valores.push(valor);
        });
        return valores;
    }

    static asigValForm(pref: string[], ctrlId: string, valorAsig: string[], form: FormGroup): void
    {
        pref.forEach((x, i) =>
        {
            form.get(x + ctrlId).setValue(valorAsig[i]);
        });
    }

    static agCtrlForm(pref: PrefFormDin[], uuid: string, valorDef: string | number, validacion: Validators, form: FormGroup): void
    {
        pref.forEach((x) =>
        {
            const nvoCtrl = new FormControl(valorDef, validacion);
            form.addControl(x + uuid, nvoCtrl);
        });
    }

    static hayDuplicados(arr: string[]): boolean
    {
        return arr.length !== new Set(arr).size;
    }

    static calcAvances(formula: string, obj: object): string
    {
        if (isNil(formula) || Object.keys(obj).length === 0)
        {
            return '0';
        }
        return math.evaluate(formula, obj);
    }

    datosTablaComun(pbr: IPbrCuestionario[], form: IFormComun[], sumatorias: ISumatorias[]): IDatosTablaFormComun[]
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

    static colCompDinamico(columnas: string[], tipoDeDato: string): IGenerarColumnTabla[]
    {
        const columnasTabla: IGenerarColumnTabla[] = [];
        // const regex = /^(.+)__(.+)$/;
        columnas.forEach((x, i) =>
        {
            // const coincidencia = x.match(regex);
            const tituloColumna = x.split('__');
            const etiqueta = tituloColumna.shift();
            const def = tituloColumna.pop();
            const columnaTabla: IGenerarColumnTabla =
                {
                    etiqueta,
                    def: def,
                    tipoDeDato,
                    tooltip: '',
                    width: i === 1 ? 'auto' : '9%'
                };
            columnasTabla.push(columnaTabla);
        });
        return columnasTabla;
    }

    private objFormulaComun(pbr: IPbrCuestionario[], sumatorias: ISumatorias[], mirActivo: IMirCuestionario): object[]
    {
        const objFormula: Record<string, number>[] = [{}, {}, {}, {}];
        const ids = mirActivo.componente.idsFormulario;
        const formComun = mirActivo.componente.formComun;


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

    datosTablaDinamica(mirActivo: IMirCuestionario, pbrs: IPbrCuestionario[], planeacionActiva: IPlaneacion): IDatosFormulario[]
    {
        const obj: IDatosFormulario[] = [{}, {}, {}, {}];
        const idsFormulaConTrim = this.separarIdsFormularioConValAnt(mirActivo);
        const pbrEncontrados: string[][] = [];

        idsFormulaConTrim.forEach((valor, indice) =>
        {
            const elementoPbr = pbrs.find(pbr => pbr.idIndicador === valor[0]);
            if (elementoPbr)
            {
                const trimAnt = this.planeacionQuery.filPeriodoAnt(planeacionActiva.ano, valor[0], false);
                pbrEncontrados.push(valor);
                obj[0][valor[0]] = elementoPbr.trim1;
                obj[0][valor[0] + '__ANT'] = trimAnt ? trimAnt.trim1 : valor[1];
                obj[1][valor[0]] = elementoPbr.trim2;
                obj[1][valor[0] + '__ANT'] = trimAnt.trim2 ? trimAnt.trim2 : valor[2];
            }
        });
        return obj;
    }

    private separarIdsFormularioConValAnt(mirActivo: IMirCuestionario): string[][]
    {
        //? Extraer todos los ids con prefijo __ant, porque todos los ids tendran su valor anterior no importa que no se use en la fórmula
        const ids = mirActivo.componente.idsFormula.map(elemento => elemento.split('__').shift());
        //? Quitamos el sufijo de __ANT a los ids para solo dejar un, id
        const sinIdsDuplicados = [...new Set(ids)];
        //? Combinamos los ids del formulario con los ids de la fórmula, porque en los ids del formulario tenemos los valores de los trimestres anteriores
        const combinarIds = [...mirActivo.componente.idsFormulario, ...sinIdsDuplicados];

        const idsSeparadosEnArrayConValoresTrimAnt = combinarIds.map(x => x.split('__'));

        const resultado: string[][] = idsSeparadosEnArrayConValoresTrimAnt.reduce((acc: string[][], elemento: string[]) =>
        {
            const indice = elemento[0];
            const indiceExistente = acc.findIndex((item) => item[0] === indice);
            if (indiceExistente === -1)
            {
                acc.push(elemento);
            } else if (acc[indiceExistente].length === 1)
            {
                acc[indiceExistente] = elemento;
            }
            return acc;
        }, []);

        resultado.forEach((elemento) =>
        {
            if (elemento.length === 1)
            {
                elemento.push('0', '0', '0', '0');
            } else
            {
                elemento.splice(1).forEach((valor, indice) =>
                {
                    elemento[indice + 1] = valor.replace('V', '');
                });
            }
        });
        return resultado;
    }
}
