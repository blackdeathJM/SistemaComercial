import {Injectable} from '@angular/core';
import {isNil} from '@angular-ru/cdk/utils';
import * as math from 'mathjs';
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {isEqual, pullAllWith} from "lodash-es";
import {ToastrService} from "ngx-toastr";

export enum PrefFormDin
{
    idIndicador = 'idIndicador__',
    dato = 'dato__',
    ant1 = 'ant1__',
    ant2 = 'ant2__',
    ant3 = 'ant3__',
    ant4 = 'ant4__',
    trim1 = 'trim1__',
    trim2 = 'trim2__',
    trim3 = 'trim3__',
    trim4 = 'trim4__'
}

export interface IDatosFormulario
{
    [key: string]: string | number;
}

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    constructor(private planeacionQuery: PlaneacionQuery, private toastrService: ToastrService) {}

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

    static restCtrls(pref: string[], ctrlIs: string, form: FormGroup, valorASet: string): void
    {
        pref.forEach(x =>
        {
            form.get(x + ctrlIs).setValue(valorASet);
        });
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

    calcAvances(formula: string, obj: object): string
    {
        try
        {
            if (isNil(formula) || Object.keys(obj).length === 0)
            {
                return '0';
            }
            return math.evaluate(formula, obj);
        } catch (e)
        {
            this.toastrService.error(e);
        }
    }

    datosTablaDinamica(mirActivo: IMirCuestionario, planeacionActiva: IPlaneacion): IDatosFormulario[]
    {
        const objConDatosActualizados: IDatosFormulario[] = [];
        const valorDinamicoProp = mirActivo.componente.colsTabla.map(x => x.split('__').pop());

        for (const elemPbr of mirActivo.componente.formDinamico)
        {
            const datosActualizados: IDatosFormulario = {};

            for (const idDin of valorDinamicoProp)
            {
                const idElemBuscar: string = elemPbr[PrefFormDin.idIndicador + idDin];
                const trimAnt: string[] = [elemPbr[PrefFormDin.ant1 + idDin], elemPbr[PrefFormDin.ant2 + idDin], elemPbr[PrefFormDin.ant3 + idDin], elemPbr[PrefFormDin.ant4 + idDin]];

                let existeEnPbr: boolean = false;

                const pbr = planeacionActiva.pbrCuestionario.find(p => p.idIndicador === idElemBuscar);
                if (pbr)
                {
                    existeEnPbr = true;
                    const pbrAnt = this.planeacionQuery.filPeriodoAnt(planeacionActiva.ano, idElemBuscar, false);
                    datosActualizados[PrefFormDin.idIndicador + idDin] = pbr.idIndicador;
                    datosActualizados[PrefFormDin.dato + idDin] = pbr.dato;
                    datosActualizados[PrefFormDin.trim1 + idDin] = pbr.trim1;
                    datosActualizados[PrefFormDin.trim2 + idDin] = pbr.trim2;
                    datosActualizados[PrefFormDin.trim3 + idDin] = pbr.trim3;
                    datosActualizados[PrefFormDin.trim4 + idDin] = pbr.trim4;
                    datosActualizados[PrefFormDin.ant1 + idDin] = pbrAnt ? pbrAnt.trim1 : trimAnt[0];
                    datosActualizados[PrefFormDin.ant2 + idDin] = pbrAnt ? pbrAnt.trim2 : trimAnt[1];
                    datosActualizados[PrefFormDin.ant3 + idDin] = pbrAnt ? pbrAnt.trim3 : trimAnt[2];
                    datosActualizados[PrefFormDin.ant4 + idDin] = pbrAnt ? pbrAnt.trim4 : trimAnt[3];
                }

                if (!existeEnPbr)
                {
                    const sumatoria = planeacionActiva.pbrSumatoria.find(s => s.idSumatoria === idElemBuscar);
                    if (sumatoria)
                    {
                        const sumatoriaAnt = this.planeacionQuery.filPeriodoAnt(planeacionActiva.ano, idElemBuscar, true);
                        datosActualizados[PrefFormDin.idIndicador + idDin] = sumatoria.idSumatoria;
                        datosActualizados[PrefFormDin.dato + idDin] = sumatoria.nombreSumatoria;
                        datosActualizados[PrefFormDin.trim1 + idDin] = sumatoria.trim1;
                        datosActualizados[PrefFormDin.trim2 + idDin] = sumatoria.trim2;
                        datosActualizados[PrefFormDin.trim3 + idDin] = sumatoria.trim3;
                        datosActualizados[PrefFormDin.trim4 + idDin] = sumatoria.trim4;
                        datosActualizados[PrefFormDin.ant1 + idDin] = sumatoriaAnt ? sumatoriaAnt.trim1 : trimAnt[0];
                        datosActualizados[PrefFormDin.ant2 + idDin] = sumatoriaAnt ? sumatoriaAnt.trim2 : trimAnt[1];
                        datosActualizados[PrefFormDin.ant3 + idDin] = sumatoriaAnt ? sumatoriaAnt.trim3 : trimAnt[2];
                        datosActualizados[PrefFormDin.ant4 + idDin] = sumatoriaAnt ? sumatoriaAnt.trim4 : trimAnt[3];
                    }
                }
            }

            objConDatosActualizados.push(datosActualizados);
        }
        return objConDatosActualizados;
    }

    objParaLaFormula(mirActivo: IMirCuestionario, planeacionActiva: IPlaneacion): IDatosFormulario[]
    {
        const pref = '__ANT'
        const obj: IDatosFormulario[] = [{}, {}, {}, {}];
        const idsFormulaConTrim = this.separarIdsFormConValAnt(mirActivo);
        const idsPbrEncontrados: string[][] = [];

        idsFormulaConTrim.forEach((valor) =>
        {
            const elementoPbr = planeacionActiva.pbrCuestionario.find(pbr => pbr.idIndicador === valor[0]);
            if (elementoPbr)
            {
                const trimAnt = this.planeacionQuery.filPeriodoAnt(planeacionActiva.ano, valor[0], false);
                idsPbrEncontrados.push(valor);
                for (let i = 0; i < valor.length - 1; i++)
                {
                    const trim = i + 1;
                    obj[i][valor[0]] = elementoPbr[`trim${trim}`];
                    obj[i][valor[0] + pref] = trimAnt ? trimAnt[`trim${trim}`] : valor[i + 1];
                }
            }
        });
        const idsRestantes: string[][] = pullAllWith(idsFormulaConTrim, idsPbrEncontrados, isEqual);

        idsRestantes.forEach((valor) =>
        {
            const elementoSumatoria = planeacionActiva.pbrSumatoria.find(sumatoria => sumatoria.idSumatoria === valor[0]);
            if (elementoSumatoria)
            {
                const trimAnt = this.planeacionQuery.filPeriodoAnt(planeacionActiva.ano, valor[0], true);
                for (let i = 0; i < valor.length - 1; i++)
                {
                    const trim = i + 1;
                    obj[i][valor[0]] = elementoSumatoria[`trim${trim}`];
                    obj[i][valor[0] + pref] = trimAnt ? trimAnt[`trim1${trim}`] : valor[i + 1];
                }
            }
        });
        return obj;
    }

    private separarIdsFormConValAnt(mirActivo: IMirCuestionario): string[][]
    {
        //? Extraer todos los ids con prefijo __ant, porque todos los ids tendran su valor anterior no importa que no se use en la fórmula
        const ids = mirActivo.componente.idsFormula.map(elemento => elemento.split('__').shift());
        //? Quitamos el sufijo de __ANT a los ids para solo dejar un, id
        const sinIdsDuplicados = [...new Set(ids)];
        //? Combinamos los ids del formulario con los ids de la fórmula, porque en los ids del formulario tenemos los valores de los trimestres anteriores
        const idsCombinados = [...mirActivo.componente.idsFormulario, ...sinIdsDuplicados];
        const idsSeparadosEnArrayConValoresTrimAnt = idsCombinados.map(x => x.split('__'));

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
