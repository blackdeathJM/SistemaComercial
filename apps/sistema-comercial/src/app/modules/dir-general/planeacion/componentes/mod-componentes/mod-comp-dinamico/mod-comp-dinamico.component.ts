import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {IPbrCuestionario, ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {MatTableDataSource} from "@angular/material/table";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";
import {TiposFormulario, TipoValores} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
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

export enum PrefFormDin
{
    idIndicador = 'idIndicador',
    dato = 'dato',
    ant1 = 'ant1',
    ant2 = 'ant2',
    ant3 = 'ant3',
    ant4 = 'ant4'
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
    definicionIndicador = '';
    metodoDeCalculo = '';
    expander = false;
    cargando = false;
    readonly separador = [ENTER, COMMA] as const;
    locutor = inject(LiveAnnouncer);
    deshabilitarChips = false;
    sub = new Subscription();
    filPbr: IPbrCuestionario[] = [];
    filSumatorias: ISumatorias[] = [];
    tituloCols: string[] = [];

    datosTabla = new MatTableDataSource<any>([]);
    columnas: IGenerarColumnTabla[] = [];
    ids: string[] = [];
    ctrlNombre: string = null;
    ctrlValor: string = null;
    ctrlDato: string = null;
    ctrlAnt1: number = 0;
    ctrlAnt2: number = 0;
    ctrlAnt3: number = 0;
    ctrlAnt4: number = 0;

    indiceCtrlActual = 0;
    mostrarPeriodoAnt = false;
    tipoValores = Object.keys(TipoValores);
    ctrlTooltip = '';

    mjsIdDuplicado: string = `No puedes agregar elementos que tengan el mismo id si requieres el mismo dato para realizar la formula solo necesitas aplicarlo en tu
                formula cuantas veces necesites`;

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

    agregar(e: MatChipInputEvent)
    {
        let valor = (e.value || '').trim();
        if (this.tituloCols.length === 8)
        {
            this.toastrService.warning('No puedes agregar mas columnas llegaste al limite', 'Limite de columnas');
            return;
        }
        if (valor)
        {
            const generarUuid = uuidv4().toString().substring(0, 7).toUpperCase()
            valor = valor + '__' + generarUuid;

            const ctrlId = new FormControl('', RxwebValidators.required({message: 'Este campo es requerido'}));
            const ctrlDato = new FormControl('');
            const trim1Ant = new FormControl(0, RxwebValidators.numeric({allowDecimal: true, message: 'Valor num'}));
            const trim2Ant = new FormControl(0, RxwebValidators.numeric({allowDecimal: true, message: 'Valor num'}));
            const trim3Ant = new FormControl(0, RxwebValidators.numeric({allowDecimal: true, message: 'Valor num'}));
            const trim4Ant = new FormControl(0, RxwebValidators.numeric({allowDecimal: true, message: 'Valor num'}));

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

    dobleClickPbr(pbr: IPbrCuestionario)
    {
        if (isNil(this.ctrlNombre))
        {
            return;
        }
        this.formDinamico.get(this.ctrlNombre).setValue(pbr.idIndicador);
        const ctrlId = this.ctrlNombre.replace(PrefFormDin.idIndicador, '');
        this.formDinamico.get(PrefFormDin.dato + ctrlId).setValue(pbr.dato);
        const valoresTrimAnt = this.planeacionQuery.filPeriodoAnt(this.planeacionQuery.getActive().ano, pbr.idIndicador, false);

        if (isNil(valoresTrimAnt))
        {
            return;
        }

        this.formDinamico.get(PrefFormDin.ant1 + ctrlId).setValue(valoresTrimAnt.trim1);
        this.formDinamico.get(PrefFormDin.ant2 + ctrlId).setValue(valoresTrimAnt.trim1);
        this.formDinamico.get(PrefFormDin.ant3 + ctrlId).setValue(valoresTrimAnt.trim1);
        this.formDinamico.get(PrefFormDin.ant4 + ctrlId).setValue(valoresTrimAnt.trim1);
        this.cambioDeFocoCtrlsInput();
    }

    dobleClickSumatoria(sumatoria: ISumatorias)
    {
        if (isNil(this.ctrlNombre))
        {
            return;
        }
        this.formDinamico.get(this.ctrlNombre).setValue(sumatoria.idSumatoria);
        this.cambioDeFocoCtrlsInput();
    }

    clickValorPbr(pbr: IPbrCuestionario)
    {
        this.ctrlValor = pbr.idIndicador;
        this.ctrlDato = pbr.dato;
    }

    clickSumatoria(sumatoria: ISumatorias)
    {
        this.ctrlValor = sumatoria.idSumatoria;
        this.ctrlDato = sumatoria.nombreSumatoria;
    }

    conFoco(formCtrlNombre: string, i: number, pref: string): void
    {
        this.ctrlNombre = pref + formCtrlNombre.split('__').pop();
        this.indiceCtrlActual = i;
        this.ctrlTooltip = this.ctrlDato;
    }

    focoTrimAnt(ctrlNombre: string, pref: string): void
    {

    }

    dblAsigValCtrl(): void
    {
        if (isNil(this.ctrlValor))
        {
            return;
        }

        this.formDinamico.get(this.ctrlNombre).setValue(this.ctrlValor);
    }

    agregarLista(): void
    {
        console.log(this.formDinamico.value);
    }

    dblFormula(): void
    {

    }

    regComponente(): void
    {

    }

    asignarIdsParaFormula(): void
    {
        const valorFormula = this.formTipoValores.get('formula').value;
        this.formTipoValores.get('formula').setValue(valorFormula + this.ctrlValor);
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
        this.mostrarPeriodoAnt = e.checked;
        this.tipoFormulario = e.checked ? TiposFormulario.PERIODO_ANT : TiposFormulario.DIN;
    }

    trackByCtrls(indice: number, elemento: string): string | number
    {
        return indice || elemento;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }

    protected readonly PrefFormDin = PrefFormDin;
}
