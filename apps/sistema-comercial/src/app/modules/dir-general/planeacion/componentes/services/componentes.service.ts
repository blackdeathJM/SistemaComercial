import {Injectable} from '@angular/core';
import {IFormComun, TiposFormulario} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {IPbrCuestionario, ISumatorias} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {IDatosTablaFormComun, IGenerarColumnTabla} from '#/libs/models/src/lib/tabla.interface';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';
import * as math from 'mathjs';
import {isEqual, pullAllWith} from "lodash-es";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {PrefFormDin} from "@s-dir-general/componentes/mod-componentes/mod-comp-dinamico/mod-comp-dinamico.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";

export interface IDatosFormulario
{
    [key: string]: string;
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

    objFormulaDin(pbr: IPbrCuestionario[], sumatorias: ISumatorias[], mirActivo: IMirCuestionario): object[]
    {
        const objFormula: Record<string, number>[] = [{}, {}, {}, {}];
        //? Extraer todos los ids con prefijo __ant, porque todos los ids tendran su valor anterior no importa que no se use en la fórmula
        const ids = mirActivo.componente.idsFormula.map(elemento => elemento.split('__').shift());
        const sinIdsDuplicados = [...new Set(ids)];
        const elementosEnPbr: string[] = [];
        const planeacionActiva = this.planeacionQuery.getActive();

        const combinarIds = [...mirActivo.componente.idsFormulario, ...sinIdsDuplicados];

        const dis = combinarIds.map(x => x.split('__'));
        console.log('---', dis);
        // sinIdsDuplicados.forEach((elemento, indice) =>
        // {
        //     const elementoEncontrado = pbr.find(ele => ele.idIndicador === elemento);
        //     if (elementoEncontrado)
        //     {
        //         // Asignamos él, id para tener un array y después eliminarlos del resto de ids para y los find sean más optimos, ya que no tienen que realizar la busqueda de todos
        //         // sino nadamas de los que sobren
        //         elementosEnPbr.push(elementoEncontrado.idIndicador)
        //         //Creamos el objeto para la fórmula
        //         objFormula[0][elementoEncontrado.idIndicador] = elementoEncontrado.trim1;
        //         const valorAnt = this.planeacionQuery.filPeriodoAnt(planeacionActiva.ano, planeacionActiva._id, false);
        //         if (valorAnt)
        //         {
        //             objFormula[0][elementoEncontrado.idIndicador + '__ANT'] = elementoEncontrado.trim1;
        //         }
        //         objFormula[1][elementoEncontrado.idIndicador] = elementoEncontrado.trim1;
        //         objFormula[0][elementoEncontrado.idIndicador] = elementoEncontrado.trim1;
        //     }
        // });
        return objFormula;
    }
}
