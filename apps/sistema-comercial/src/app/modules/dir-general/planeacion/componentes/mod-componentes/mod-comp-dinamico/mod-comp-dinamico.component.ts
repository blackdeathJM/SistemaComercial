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
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {SeleccionQuery} from "@s-dir-general/selecciones/store/seleccion.query";
import {FuseAlertModule} from "@s-fuse/alert";
import {compact, isEqual, isNil, pullAllWith} from "lodash-es";
import {ActivatedRoute} from "@angular/router";
import {finalize, Subscription} from "rxjs";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {v4 as uuidv4} from 'uuid';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {TablaMatComponent} from "@s-shared/components/tabla-mat/tabla-mat.component";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ToastrService} from "ngx-toastr";
import {ComponentesService, IDatosFormulario, PrefFormDin} from "@s-dir-general/componentes/services/componentes.service";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {TRegComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";
import {TablaComponenteService} from "@s-dir-general/componentes/services/tabla-componente.service";
import {ObtenerIdFormPipe} from "@s-dir-general/componentes/pipes/obtener-id-form.pipe";

@Component({
    selector: 'app-mod-comp-dinamico',
    standalone: true,
    imports: [CommonModule, MatCardModule, ReactiveFormsModule, RxReactiveFormsModule, MatFormFieldModule, MatListModule, MatOptionModule, MatSelectModule, FuseAlertModule, MatChipsModule,
        MatIconModule, MatInputModule, ObtenerIdFormPipe, MatButtonModule, MatExpansionModule, TablaMatComponent, MatCheckboxModule, MatTooltipModule, ObtenerIdFormPipe],
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
    sub = new Subscription();

    filPbr: IPbrCuestionario[] = [];
    filSumatorias: ISumatorias[] = [];
    tituloCols: string[] = [];

    objFormulario: IDatosFormulario[] = [];
    datosTabla = new MatTableDataSource<any>([]);
    columnas: IGenerarColumnTabla[] = [];

    idsDelFormulario: string[] = [];
    ctrlNombre: string = null;
    idParaFormula: string = null;
    focoEnTxtformula = false;

    indiceCtrlActual = 0;
    chkDeshabilitar = false;
    chkPeriodoAntValores = false;
    chkOmitirPrimerIdEnTabla = false;
    chkValorUnico = false;
    tipoValores = Object.keys(TipoValoresTrim);

    formDinamico: FormGroup;
    tipoFormulario: TiposFormulario = TiposFormulario.DIN;

    formTipoValores: FormGroup = this.rxFb.group({
        tipoValorTrim: [null, RxwebValidators.required({message: 'Es necesario seleccionar que tipo de valor son los trimestres'})],
        tipoValorAvance: [null, RxwebValidators.required({message: 'Es necesario seleccionar el tipo de valor para los avances trimestrales'})],
        formula: ['', RxwebValidators.required({message: 'Es necesario que coloques la formula para calcular los avances trimestrales'})],
        etiqueta: ['']
    });

    constructor(private rxFb: RxFormBuilder, public planeacionQuery: PlaneacionQuery, public seleccionQuery: SeleccionQuery, private location: Location, private activatedRoute: ActivatedRoute,
                private render: Renderer2, private toastrService: ToastrService, private planeacionService: PlaneacionService)
    {
    }

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
            const validarNumero = RxwebValidators.numeric({
                allowDecimal: true,
                message: 'Valor numerico',
                persistZero: true
            });
            const requerido = RxwebValidators.required({message: 'Requerido'});

            ComponentesService.agCtrlForm(Object.values(PrefFormDin).slice(0, 2), generarUuid, '', [requerido], this.formDinamico);
            ComponentesService.agCtrlForm(Object.values(PrefFormDin).slice(2), generarUuid, '0', [requerido, validarNumero], this.formDinamico);
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

    dblPbr(pbr: IPbrCuestionario)
    {
        if (this.focoEnTxtformula)
        {
            this.asigFormulaTxt(pbr.idIndicador + ' + ');
        } else
        {
            if (isNil(this.ctrlNombre))
            {
                return;
            }
            // this.asigValorAFormulario([''], this.ctrlNombre, [pbr.idIndicador]);
            ComponentesService.asigValForm([''], this.ctrlNombre, [pbr.idIndicador], this.formDinamico);
            const ctrlId = this.ctrlNombre.replace(PrefFormDin.idIndicador, '').trim();
            ComponentesService.asigValForm([PrefFormDin.dato, PrefFormDin.trim1, PrefFormDin.trim2, PrefFormDin.trim3, PrefFormDin.trim4], ctrlId, [pbr.dato, pbr.trim1.toString(), pbr.trim2.toString(),
                pbr.trim3.toString(), pbr.trim4.toString()], this.formDinamico);
            this.cambioDeFocoCtrlsInput();
            const valoresTrimAnt = this.planeacionQuery.filPeriodoAnt(this.planeacionQuery.getActive().ano, pbr.idIndicador, false);
            if (isNil(valoresTrimAnt))
            {
                return;
            }
            ComponentesService.asigValForm([PrefFormDin.ant1, PrefFormDin.ant2, PrefFormDin.ant3, PrefFormDin.ant4], ctrlId, [valoresTrimAnt.trim1.toString(), valoresTrimAnt.trim2.toString(),
                valoresTrimAnt.trim3.toString(), valoresTrimAnt.trim4.toString()], this.formDinamico);
        }
    }

    dblSumatoria(sumatoria: ISumatorias)
    {
        if (this.focoEnTxtformula)
        {
            this.asigFormulaTxt(sumatoria.idSumatoria + ' + ');
        } else
        {
            if (isNil(this.ctrlNombre))
            {
                return;
            }
            ComponentesService.asigValForm([''], this.ctrlNombre, [sumatoria.idSumatoria], this.formDinamico);
            const ctrlId = this.ctrlNombre.replace(PrefFormDin.idIndicador, '').trim();
            ComponentesService.asigValForm([PrefFormDin.dato, PrefFormDin.trim1, PrefFormDin.trim2, PrefFormDin.trim3, PrefFormDin.trim4], ctrlId, [sumatoria.nombreSumatoria, sumatoria.trim1.toString(),
                sumatoria.trim2.toString(), sumatoria.trim3.toString(), sumatoria.trim4.toString()], this.formDinamico);
            this.cambioDeFocoCtrlsInput();
            const valoresSumatoria = this.planeacionQuery.filPeriodoAnt(this.planeacionQuery.getActive().ano, sumatoria.idSumatoria, true);
            if (isNil(valoresSumatoria))
            {
                return;
            }
            ComponentesService.asigValForm([PrefFormDin.ant1, PrefFormDin.ant2, PrefFormDin.ant3, PrefFormDin.ant4], ctrlId, [sumatoria.trim1.toString(), sumatoria.trim2.toString(), sumatoria.trim3.toString(),
                sumatoria.trim4.toString()], this.formDinamico);
        }
    }

    dblFormula(): void
    {
        this.formTipoValores.get('formula').reset();

        this.idsDelFormulario.forEach(x =>
        {
            const idPbr = x.split('__').shift();
            this.asigFormulaTxt(idPbr + ' + ');
            if (this.chkPeriodoAntValores)
            {
                this.asigFormulaTxt(idPbr + '__ANT' + ' + ');
            }
        });
    }

    asigFormulaTxt(valorAsig: string): void
    {
        const valorActual = this.formTipoValores.get('formula').value;
        this.formTipoValores.get('formula').setValue(valorActual + valorAsig);
    }

    clkPbr(pbr: IPbrCuestionario): void
    {
        this.idParaFormula = pbr.idIndicador;
    }

    clkSumatoria(sumatoria: ISumatorias): void
    {
        this.idParaFormula = sumatoria.idSumatoria;
    }

    focoInput(formCtrlNombre: string, i: number, pref: string): void
    {
        this.focoEnTxtformula = false;
        this.ctrlNombre = pref + formCtrlNombre.split('__').pop();
        this.indiceCtrlActual = i;
    }

    focoFormula(): void
    {
        this.focoEnTxtformula = true;
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

    chkPeriodoAnt(e: MatCheckboxChange): void
    {
        this.chkPeriodoAntValores = e.checked;
        this.tipoFormulario = e.checked ? TiposFormulario.PERIODO_ANT : TiposFormulario.DIN;
    }

    chkOmitirPrimerId(e: MatCheckboxChange): void
    {
        this.chkOmitirPrimerIdEnTabla = e.checked;
    }

    chkUnicoValor(e: MatCheckboxChange)
    {
        this.chkValorUnico = e.checked;
    }

    agregarLista(): void
    {
        if (this.formDinamico.invalid)
        {
            this.toastrService.warning('Varifica que el formulario este completamente y correctamente llenado', 'Componente');
            return;
        }
        // Asignar él, id obtenido del formulario y sus valores trimestrales
        const idsPbrDelFormulario: string[] = this.tituloCols.map((x) =>
        {
            const ctrlId = x.split('__').pop();
            const idPbr = this.formDinamico.get(PrefFormDin.idIndicador + ctrlId).value;
            const ant1 = this.formDinamico.get(PrefFormDin.ant1 + ctrlId).value;
            const ant2 = this.formDinamico.get(PrefFormDin.ant2 + ctrlId).value;
            const ant3 = this.formDinamico.get(PrefFormDin.ant3 + ctrlId).value;
            const ant4 = this.formDinamico.get(PrefFormDin.ant4 + ctrlId).value;
            return idPbr + '__V' + ant1 + '__V' + ant2 + '__V' + ant3 + '__V' + ant4;
        });

        if (ComponentesService.hayDuplicados(idsPbrDelFormulario))
        {
            this.toastrService.warning('Hay elementos duplicados en el formulario', 'Componente dinámico');
            return;
        }
        const tempIdsGuardados = [...this.idsDelFormulario, ...idsPbrDelFormulario];
        if (ComponentesService.hayDuplicados(tempIdsGuardados))
        {
            this.toastrService.warning('Hay elementos duplicados en la lista', 'Componente dinámico');
            return;
        }

        this.idsDelFormulario.push(...idsPbrDelFormulario);

        const etiquetas: string[] = [];
        const def: string[] = [];

        const objDinamico: IDatosFormulario = this.tituloCols.reduce((obj, titulo, i) =>
        {
            //? Creacion del obj del formulario
            const idColArreglo = titulo.split('__');
            const primerValor = idColArreglo.shift();
            const idCol = idColArreglo.pop();

            const prefijos = Object.values(PrefFormDin);
            const eliminaTrim = [PrefFormDin.trim1, PrefFormDin.trim2, PrefFormDin.trim3, PrefFormDin.trim4];
            const nvosPref: string[] = pullAllWith(prefijos, eliminaTrim, isEqual);

            const arregloValores = ComponentesService.obtValoresForm(nvosPref, idCol, this.formDinamico);
            const valoresParaObj = ComponentesService.formarObj(nvosPref, idCol, arregloValores);
            if (i === 0)
            {
                etiquetas.push(primerValor, 'Descripcion');
                def.push(PrefFormDin.idIndicador + idCol, PrefFormDin.dato + idCol);
            } else
            {
                etiquetas.push(primerValor);
                def.push(PrefFormDin.idIndicador + idCol);
            }
            //Restablecer formulario
            ComponentesService.restCtrls([PrefFormDin.idIndicador], idCol, this.formDinamico, '');
            ComponentesService.restCtrls([PrefFormDin.ant1, PrefFormDin.ant2, PrefFormDin.ant3, PrefFormDin.ant4], idCol, this.formDinamico, '0');
            return {...obj, ...valoresParaObj};
        }, {});

        this.objFormulario.push(objDinamico);

        this.columnas = TablaComponenteService.genCols(etiquetas, def, ['auto'], 'texto');
        this.datosTabla.data = [...this.objFormulario];
        this.toastrService.info('Se ha agregado un nuevo registro a la lista', 'Lista elementos');
        this.chkDeshabilitar = true;
        this.deshabilitarChips = true;
    }

    regComponente(): void
    {
        this.cargando = true;
        const {formula, tipoValorTrim, tipoValorAvance, etiqueta} = this.formTipoValores.value;

        const sinCaracteresEspeciales = formula.replace(/[^\w\s]|(?<!\w)_(?!\w)/g, '');
        const sinNumerosAdicionales = sinCaracteresEspeciales.replace(/\b\d+\b/g, '').split(' ');
        const idsFormula: string[] = compact(sinNumerosAdicionales);

        const datos: TRegComponente =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicadorMir: this.idIndicadorMir,
                formula,
                idsFormula,
                colsTabla: this.tituloCols,
                formDinamico: this.objFormulario,
                tipoValorTrim,
                tipoValorAvance,
                etiqueta,
                tipoForm: this.tipoFormulario,
                idsFormulario: this.idsDelFormulario,
                omitirPrimerId: this.chkOmitirPrimerIdEnTabla
            };
        this.formDinamico.disable();
        this.formTipoValores.disable();
        this.planeacionService.regComponente(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formDinamico.enable();
            this.formTipoValores.enable();
            this.location.back();
        })).subscribe();
    }

    regresar(): void
    {
        this.location.back();
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
