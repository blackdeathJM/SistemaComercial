import {ChangeDetectionStrategy, Component, inject, Input} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {SeleccionQuery} from "@s-dir-general/selecciones/store/seleccion.query";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {IPbrCuestionario, ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {v4 as uuidv4} from 'uuid';
import {ObtenerIdFormPipe} from "@s-dir-general/componentes/mod-componentes/mod-comp-ptar/obtener-id-form.pipe";
import {MatTooltipModule} from "@angular/material/tooltip";
import {isNil} from "@angular-ru/cdk/utils";
import {TipoValores} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatExpansionModule} from "@angular/material/expansion";
import {TablaMatComponent} from "@s-shared/components/tabla-mat/tabla-mat.component";
import {NgxToastService} from "@s-services/ngx-toast.service";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";
import {ComponentesService} from "@s-dir-general/componentes/services/componentes.service";

@Component({
    selector: 'app-mod-comp-ptar',
    standalone: true,
    templateUrl: './mod-comp-ptar.html',
    styleUrls: ['./mod-comp-ptar.scss'],
    imports:
        [
            MatInputModule, MatCardModule, MatChipsModule, NgForOf, MatIconModule, MatListModule, MatSelectModule, NgIf, AsyncPipe, ReactiveFormsModule, RxReactiveFormsModule, MatButtonModule, ObtenerIdFormPipe, NgClass, MatTooltipModule, MatExpansionModule, TablaMatComponent
        ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModCompPtar
{
    @Input({required: true}) idIndicadorMir: string = null;
    expander = false;
    readonly separador = [ENTER, COMMA] as const;
    locutor = inject(LiveAnnouncer);
    deshabilitarChips = false;

    objFormulario =
        {
            idIndicador: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
            dato: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
            // trim1: [0],
            // trim2: [0],
            // trim3: [0],
            // trim4: [0]
        };

    filCuestionarioPbr: IPbrCuestionario[] = [];
    filSumatorias: ISumatorias[] = [];
    tituloColumnas: string[] = ['idIndicador', 'dato'];

    compDinamico: object[] = [];
    columnas: IGenerarColumnTabla[] = [];

    objDatosFormula: object = {};

    formComp: FormGroup;
    ctrlNombre = null;
    ctrlValor: string = null;
    ctrlDato: string = null;
    cargando = false;
    tipoValores = Object.values(TipoValores);
    formTipoValores: FormGroup = this.rxFb.group({
        tipoValorTrim: [null, RxwebValidators.required({message: 'Es necesario seleccionar que tipo de valor son los trimestres'})],
        tipoValorAvance: [null, RxwebValidators.required({message: 'Es necesario seleccionar el tipo de valor para los avances trimestrales'})],
        formula: ['', RxwebValidators.required({message: 'Es necesario que coloques la formula para calcular los avances trimestrales'})],
        etiqueta: ['']
    });

    constructor(public seleccionQuery: SeleccionQuery, private planeacionQuery: PlaneacionQuery, private rxFb: RxFormBuilder, private planeacionService: PlaneacionService,
                private ngxToastService: NgxToastService)
    {}

    agregar(e: MatChipInputEvent): void
    {
        let valor = (e.value || '').trim();
        if (valor)
        {
            const generarUuid = uuidv4().toString().substring(0, 7).toUpperCase();
            valor = valor + '-' + generarUuid;
            this.objFormulario[generarUuid] = ['', RxwebValidators.required({message: 'Este campo es requerido'})];
            this.formComp = this.rxFb.group(this.objFormulario);
            this.tituloColumnas.push(valor);
        }

        e.chipInput!.clear();
    }

    remover(cabecera: string): void
    {
        const index = this.tituloColumnas.indexOf(cabecera);
        if (index >= 0)
        {
            this.tituloColumnas.splice(index, 1);
            this.locutor.announce(`Columna removida`).then();
        }
    }

    cambioDepto(e: string): void
    {
        const deptos = this.planeacionQuery.getActive().pbrCuestionario.slice();
        this.filCuestionarioPbr = deptos.filter(x => x.centroGestor === e);

        const sumatoriasPorDepto = this.planeacionQuery.getActive().pbrSumatoria.slice();
        this.filSumatorias = sumatoriasPorDepto.filter(x => x.centroGestor === e);
    }

    dobleClickPbr(pbr: IPbrCuestionario): void
    {
        if (isNil(this.ctrlNombre))
        {
            return;
        }

        if (this.ctrlNombre === 'idIndicador' || this.ctrlNombre === 'dato')
        {
            this.formComp.get('idIndicador').setValue(pbr.idIndicador);
            this.formComp.get('dato').setValue(pbr.dato);

            // this.formComp.get('trim1').setValue(pbr.trim1);
            // this.formComp.get('trim2').setValue(pbr.trim2);
            // this.formComp.get('trim3').setValue(pbr.trim3);
            // this.formComp.get('trim4').setValue(pbr.trim4);
            return;
        }
        // this.formComp.get('trim1').setValue(pbr.trim1);
        // this.formComp.get('trim2').setValue(pbr.trim2);
        // this.formComp.get('trim3').setValue(pbr.trim3);
        // this.formComp.get('trim4').setValue(pbr.trim4);

        this.formComp.get(this.ctrlNombre).setValue(pbr.idIndicador);
    }

    dobleClickSumatoria(sumatoria: ISumatorias): void
    {
        if (isNil(this.ctrlNombre))
        {
            return;
        }

        if (this.ctrlNombre === 'idIndicador' || this.ctrlNombre === 'dato')
        {
            this.formComp.get('idIndicador').setValue(sumatoria.idSumatoria);
            this.formComp.get('dato').setValue(sumatoria.nombreSumatoria);
            // this.formComp.get('trim1').setValue(sumatoria.trim1);
            // this.formComp.get('trim2').setValue(sumatoria.trim2);
            // this.formComp.get('trim3').setValue(sumatoria.trim3);
            // this.formComp.get('trim4').setValue(sumatoria.trim4);
            return;
        }
        // this.formComp.get('trim1').setValue(sumatoria.trim1);
        // this.formComp.get('trim2').setValue(sumatoria.trim2);
        // this.formComp.get('trim3').setValue(sumatoria.trim3);
        // this.formComp.get('trim4').setValue(sumatoria.trim4);
        this.formComp.get(this.ctrlNombre).setValue(sumatoria.idSumatoria);
    }

    clickValorPbr(pbr: IPbrCuestionario): void
    {
        this.ctrlValor = pbr.idIndicador;
        this.ctrlDato = pbr.dato;
    }

    clickSumatoria(sumatoria: ISumatorias): void
    {
        this.ctrlValor = sumatoria.idSumatoria;
        this.ctrlDato = sumatoria.nombreSumatoria;
    }

    conFoco(formCtrlNombre: string): void
    {
        this.ctrlNombre = formCtrlNombre.split('-').pop();
    }

    dblAsigValCtrl(): void
    {
        if (isNil(this.ctrlValor))
        {
            return;
        }
        if (this.ctrlNombre === 'idIndicador' || this.ctrlNombre === 'dato')
        {
            this.formComp.get('idIndicador').setValue(this.ctrlValor);
            this.formComp.get('dato').setValue(this.ctrlDato);
            return;
        }

        this.formComp.get(this.ctrlNombre).setValue(this.ctrlValor);
    }

    agregarLista(): void
    {
        if (isNil(this.formComp))
        {
            this.ngxToastService.satisfactorioToast('No se detactaron elementos en el formulario', 'Componente dinamico');
            return;
        }
        const objecto: Record<string, string> = {};

        this.tituloColumnas.forEach(x =>
        {
            const idObtenido = x.split('-').pop();
            const valorFormulario = this.formComp.get(idObtenido).value;
            objecto[idObtenido] = valorFormulario;
            this.objDatosFormula[valorFormulario] = valorFormulario;
        });

        this.columnas = ComponentesService.colCompDinamico(this.tituloColumnas, 'sin formato');
        this.compDinamico.push(objecto);
        this.deshabilitarChips = true;
        this.formComp.reset();
    }

    regComponente(): void
    {
    }

    trackByCtrls(indice: number, elemento: string): string | number
    {
        return indice || elemento;
    }
}
