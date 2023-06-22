import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {IPbrCuestionario, ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {MatTableDataSource} from "@angular/material/table";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";
import {TiposFormulario, TipoValoresTrim} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SeleccionQuery} from "@s-dir-general/selecciones/store/seleccion.query";
import {FuseAlertModule} from "@s-fuse/alert";
import {isNil} from "lodash-es";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {v4 as uuidv4} from 'uuid';
import {MatInputModule} from "@angular/material/input";
import {ObtenerIdFormPipe} from "@s-dir-general/componentes/mod-componentes/mod-comp-ptar/obtener-id-form.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {TablaMatComponent} from "@s-shared/components/tabla-mat/tabla-mat.component";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ToastrService} from "ngx-toastr";
import {ComponentesService} from "@s-dir-general/componentes/services/componentes.service";

export enum PrefFormDin
{
    idIndicador = 'idIndicador',
    dato = 'dato',
    ant1 = 'ant1',
    ant2 = 'ant2',
    ant3 = 'ant3',
    ant4 = 'ant4',
    trim1 = 'trim1',
    trim2 = 'trim2',
    trim3 = 'trim3',
    trim4 = 'trim4'
}

interface IDatosFormulario
{
    [key: string]: string;
}

@Component({
    selector: 'app-mod-comp-dinamico',
    standalone: true,
    imports: [CommonModule, MatCardModule, ReactiveFormsModule, RxReactiveFormsModule, MatFormFieldModule, MatListModule, MatOptionModule, MatSelectModule, FuseAlertModule, MatChipsModule, MatIconModule, MatInputModule, ObtenerIdFormPipe, MatButtonModule, MatExpansionModule, TablaMatComponent, MatCheckboxModule, MatTooltipModule],
    templateUrl: './mod-comp-dinamico.component.html',
    styleUrls: ['./mod-comp-dinamico.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModCompDinamicoComponent implements OnInit, AfterContentInit, OnDestroy
{
    @Input({required: true}) idIndicadorMir: string;
    @ViewChildren('listaCtrls', {read: ElementRef}) listaCtrls: QueryList<ElementRef>;
    protected readonly PrefFormDin = PrefFormDin;
    protected readonly separador = [ENTER, COMMA] as const;
    //Elementos utilizados para mostrar la alerta en el html con las indicaciones para realizar las operaciones
    definicionIndicador = '';
    metodoDeCalculo = '';

    expander = false;
    cargando = false;
    locutor = inject(LiveAnnouncer);
    deshabilitarChips = false;
    deshabilitarChk = false;
    sub = new Subscription();

    filPbr: IPbrCuestionario[] = [];
    filSumatorias: ISumatorias[] = [];
    tituloCols: string[] = [];

    objFormulario: IDatosFormulario[] = [];
    datosTabla = new MatTableDataSource<any>([]);
    columnas: IGenerarColumnTabla[] = [];

    idsUtilizadosEnFormula: string[] = [];
    ctrlNombre: string = null;
    ctrlIdIndicadorPbr: string = null;

    indiceCtrlActual = 0;
    mostrarPeriodoAnt = false;
    tipoValores = Object.keys(TipoValoresTrim);

    formDinamico: FormGroup;
    tipoFormulario: TiposFormulario;

    formTipoValores: FormGroup = this.rxFb.group({
        tipoValorTrim: [null, RxwebValidators.required({message: 'Es necesario seleccionar que tipo de valor son los trimestres'})],
        tipoValorAvance: [null, RxwebValidators.required({message: 'Es necesario seleccionar el tipo de valor para los avances trimestrales'})],
        formula: ['', RxwebValidators.required({message: 'Es necesario que coloques la formula para calcular los avances trimestrales'})],
        etiqueta: ['']
    });

    constructor(private rxFb: RxFormBuilder, public planeacionQuery: PlaneacionQuery, public seleccionQuery: SeleccionQuery, private location: Location, private activatedRoute: ActivatedRoute,
                private render: Renderer2, private toastrService: ToastrService)
    {}

    ngOnInit(): void
    {
        if (isNil(this.planeacionQuery.getActive()))
        {
            this.location.back();
        }
        this.sub.add(this.activatedRoute.params.subscribe(params => this.idIndicadorMir = params.idMir));
        this.formDinamico = new FormGroup({});
    }

    ngAfterContentInit(): void
    {
        if (isNil(this.planeacionQuery.getActive()))
        {
            return;
        }
        const mirBuscado = this.planeacionQuery.getActive().mirCuestionario.find(x => x.idIndicador === this.idIndicadorMir);
        this.definicionIndicador = mirBuscado.definicionIndicador;
        this.metodoDeCalculo = mirBuscado.metodoCalculo;
    }

    agCtrlForm(pref: PrefFormDin[], uuid: string, ctrl: FormControl[]): void
    {
        pref.forEach((v, i) =>
        {
            this.formDinamico.addControl(v + uuid, ctrl[i]);
        });
    }

    agregar(e: MatChipInputEvent)
    {
        let valor = (e.value || '').trim();
        if (this.tituloCols.length >= 8)
        {
            this.toastrService.warning('No puedes agregar mas columnas llegaste al limite', 'Limite de columnas');
            return;
        }
        if (valor)
        {
            const generarUuid = uuidv4().toString().substring(0, 7).toUpperCase()
            valor = valor + '__' + generarUuid;
            const validarNumero = RxwebValidators.numeric({allowDecimal: true, message: 'Valor numerico', persistZero: true});

            const ctrlId = new FormControl('', RxwebValidators.required({message: 'Este campo es requerido'}));
            const ctrlDato = new FormControl('');
            const trim1Ant = new FormControl(0, validarNumero);
            const trim2Ant = new FormControl(0, validarNumero);
            const trim3Ant = new FormControl(0, validarNumero);
            const trim4Ant = new FormControl(0, validarNumero);

            this.formDinamico.addControl(PrefFormDin.idIndicador + generarUuid, ctrlId);
            this.formDinamico.addControl(PrefFormDin.dato + generarUuid, ctrlDato);
            this.formDinamico.addControl(PrefFormDin.ant1 + generarUuid, trim1Ant);
            this.formDinamico.addControl(PrefFormDin.ant2 + generarUuid, trim2Ant);
            this.formDinamico.addControl(PrefFormDin.ant3 + generarUuid, trim3Ant);
            this.formDinamico.addControl(PrefFormDin.ant4 + generarUuid, trim4Ant);

            this.tituloCols.push(valor);
        }
        e.chipInput!.clear();
    }

    remover(cabecera: string)
    {
        const index = this.tituloCols.indexOf(cabecera);
        if (index >= 0)
        {
            this.tituloCols.splice(index, 1);
            this.locutor.announce('Columna removida').then();
        }
    }

    cambioDepto(e: string): void
    {
        const deptos = this.planeacionQuery.getActive().pbrCuestionario.slice();
        this.filPbr = deptos.filter(x => x.centroGestor === e);

        const sumatoriasPorDepto = this.planeacionQuery.getActive().pbrSumatoria.slice();
        this.filSumatorias = sumatoriasPorDepto.filter(x => x.centroGestor === e);
    }

    asigValorMul(pref: string[], ctrlId: string, valorAsig: string[]): void
    {
        pref.forEach((v, i) =>
        {
            this.formDinamico.get(v + ctrlId[i]).setValue(valorAsig[i]);
        })
    }

    dobleClickPbr(pbr: IPbrCuestionario)
    {
        if (isNil(this.ctrlNombre))
        {
            return;
        }
        this.asigValorMul([''], this.ctrlNombre, [pbr.idIndicador]);
        const ctrlId = this.ctrlNombre.replace(PrefFormDin.idIndicador, '').trim();

        this.asigValorMul([PrefFormDin.dato, PrefFormDin.trim1, PrefFormDin.trim2, PrefFormDin.trim3, PrefFormDin.trim4], ctrlId, [pbr.dato, pbr.trim1.toString(), pbr.trim2.toString(),
            pbr.trim3.toString(), pbr.trim4.toString()]);
        this.cambioDeFocoCtrlsInput();
        const valoresTrimAnt = this.planeacionQuery.filPeriodoAnt(this.planeacionQuery.getActive().ano, pbr.idIndicador, false);
        if (isNil(valoresTrimAnt))
        {
            return;
        }
        this.asigValorMul([PrefFormDin.ant1, PrefFormDin.ant2, PrefFormDin.ant3, PrefFormDin.ant4], ctrlId, [valoresTrimAnt.trim1.toString(), valoresTrimAnt.trim2.toString(),
            valoresTrimAnt.trim3.toString(), valoresTrimAnt.trim4.toString()])
    }

    dobleClickSumatoria(sumatoria: ISumatorias)
    {
        if (isNil(this.ctrlNombre))
        {
            return;
        }
        this.asigValorMul([''], this.ctrlNombre, [sumatoria.idSumatoria]);
        const ctrlId = this.ctrlNombre.replace(PrefFormDin.idIndicador, '').trim();
        this.asigValorMul([PrefFormDin.dato, PrefFormDin.trim1, PrefFormDin.trim2, PrefFormDin.trim3, PrefFormDin.trim4], ctrlId, [sumatoria.nombreSumatoria, sumatoria.trim1.toString(),
            sumatoria.trim2.toString(), sumatoria.trim3.toString(), sumatoria.trim4.toString()])
        this.cambioDeFocoCtrlsInput();
        const valoresSumatoria = this.planeacionQuery.filPeriodoAnt(this.planeacionQuery.getActive().ano, sumatoria.idSumatoria, true);
        if (isNil(valoresSumatoria))
        {
            return;
        }
        this.formDinamico.get(PrefFormDin.ant1 + ctrlId).setValue(valoresSumatoria.trim1);
        this.formDinamico.get(PrefFormDin.ant2 + ctrlId).setValue(valoresSumatoria.trim2);
        this.formDinamico.get(PrefFormDin.ant3 + ctrlId).setValue(valoresSumatoria.trim3);
        this.formDinamico.get(PrefFormDin.ant4 + ctrlId).setValue(valoresSumatoria.trim4);
    }

    focoInput(formCtrlNombre: string, i: number, pref: string): void
    {
        this.ctrlNombre = pref + formCtrlNombre.split('__').pop();
        this.indiceCtrlActual = i;
    }

    cambioDeFocoCtrlsInput(): void
    {
        const ctrlsInput = this.listaCtrls.toArray();
        if (this.indiceCtrlActual < ctrlsInput.length - 1)
        {
            const sigElemento = ctrlsInput[this.indiceCtrlActual + 1].nativeElement;
            this.render.selectRootElement(sigElemento).focus();
        }
    }

    agregarLista(): void
    {
        if (this.formDinamico.invalid)
        {
            this.toastrService.warning('Varifica que el formulario este completamente y correctamente llenado', 'Componente');
            return;
        }
        const idsPbrDelFormulario: string[] = this.tituloCols.map((x) =>
        {
            const ctrlId = x.split('__').pop();
            return this.formDinamico.get(PrefFormDin.idIndicador + ctrlId).value;
        });

        if (this.hayDuplicados(idsPbrDelFormulario))
        {
            this.toastrService.warning('Hay elementos duplicados en el formulario', 'Componente dinámico');
            return;
        }
        const tempIdsGuardados = [...this.idsUtilizadosEnFormula, ...idsPbrDelFormulario];
        if (this.hayDuplicados(tempIdsGuardados))
        {
            this.toastrService.warning('Hay elementos duplicados en la lista', 'Componente dinámico');
            return;
        }

        this.idsUtilizadosEnFormula.push(...idsPbrDelFormulario);
        const objDinamico: IDatosFormulario = this.tituloCols.reduce((obj, idCtrlForm) =>
        {
            const ctrlId = idCtrlForm.split('__').pop();
            const idPbr = this.obtValoresForm(PrefFormDin.idIndicador, ctrlId);
            const dato = this.obtValoresForm(PrefFormDin.dato, ctrlId);
            const ant1 = this.obtValoresForm(PrefFormDin.ant1, ctrlId);
            const ant2 = this.obtValoresForm(PrefFormDin.ant2, ctrlId);
            const ant3 = this.obtValoresForm(PrefFormDin.ant3, ctrlId);
            const ant4 = this.obtValoresForm(PrefFormDin.ant4, ctrlId);

            obj[PrefFormDin.idIndicador + ctrlId] = idPbr;
            obj[PrefFormDin.dato + ctrlId] = dato;
            obj[PrefFormDin.ant1 + ctrlId] = ant1;
            obj[PrefFormDin.ant2 + ctrlId] = ant2;
            obj[PrefFormDin.ant3 + ctrlId] = ant3;
            obj[PrefFormDin.ant4 + ctrlId] = ant4;
            return obj;
        }, {});
        this.objFormulario.push(objDinamico);
        this.deshabilitarChk = true;
        this.deshabilitarChips = true;
        //? Crear la estructura para las columnas

        const asigPrefCols = this.tituloCols.flatMap((x, i) =>
        {
            const tituloEnArray = x.split('__');
            const titulo = tituloEnArray.shift();
            const id = tituloEnArray.pop();

            if (i == 0)
            {
                return [titulo + '__' + PrefFormDin.idIndicador + id, titulo + '__' + PrefFormDin.dato + id];
            }
            return [titulo + '__' + PrefFormDin.idIndicador + id];
        });

        this.columnas = ComponentesService.colCompDinamico(asigPrefCols, 'texto');
        this.datosTabla.data = [...this.objFormulario];
    }

    dblFormula(): void
    {

    }

    regComponente(): void
    {
        console.log('Columnas--', this.columnas);
        console.log('Datos---', this.objFormulario);
        console.log('formulario', this.formDinamico.value);
    }

    asignarIdsParaFormula(): void
    {
        const valorFormula = this.formTipoValores.get('formula').value;
        this.formTipoValores.get('formula').setValue(valorFormula + this.ctrlIdIndicadorPbr);
    }

    chkPeriodoAnt(e: MatCheckboxChange): void
    {
        this.mostrarPeriodoAnt = e.checked;
        this.tipoFormulario = e.checked ? TiposFormulario.PERIODO_ANT : TiposFormulario.DIN;
    }

    hayDuplicados(arr: string[]): boolean
    {
        return arr.length !== new Set(arr).size;
    }

    obtValoresForm(pref: string, ctrlId: string): string | number
    {
        return this.formDinamico.get(pref + ctrlId).value;
    }

    trackByCtrls(indice: number, elemento: string): string | number
    {
        return indice || elemento;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
