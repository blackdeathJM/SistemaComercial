import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    Input,
    QueryList,
    Renderer2,
    ViewChildren
} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {AsyncPipe, Location, NgClass, NgForOf, NgIf} from "@angular/common";
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
import {
    TiposFormulario,
    TipoValoresTrim
} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatExpansionModule} from "@angular/material/expansion";
import {TablaMatComponent} from "@s-shared/components/tabla-mat/tabla-mat.component";
import {IGenerarColumnTabla} from "#/libs/models/src/lib/tabla.interface";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";
import {TRegComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";
import {finalize} from "rxjs";

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
    @ViewChildren('listaCtrls', {read: ElementRef}) listCtrls: QueryList<ElementRef>;

    expander = false;

    readonly separador = [ENTER, COMMA] as const;
    locutor = inject(LiveAnnouncer);
    deshabilitarChips = false;

    objFormulario =
        {
            idIndicador: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
            dato: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
        };

    filCuestionarioPbr: IPbrCuestionario[] = [];
    filSumatorias: ISumatorias[] = [];
    tituloColumnas: string[] = ['idIndicador', 'dato'];

    datosTabla: MatTableDataSource<any> = new MatTableDataSource<any>();
    columnas: IGenerarColumnTabla[] = [];
    ids: string[] = [];

    ctrlNombre: string = null;
    ctrlValor: string = null;
    ctrlDato: string = null;

    cargando = false;
    indiceCtrlActual = 0;
    tipoValores = Object.values(TipoValoresTrim);

    formDin: FormGroup;

    formTipoValores: FormGroup = this.rxFb.group({
        tipoValorTrim: [null, RxwebValidators.required({message: 'Es necesario seleccionar que tipo de valor son los trimestres'})],
        tipoValorAvance: [null, RxwebValidators.required({message: 'Es necesario seleccionar el tipo de valor para los avances trimestrales'})],
        formula: ['', RxwebValidators.required({message: 'Es necesario que coloques la formula para calcular los avances trimestrales'})],
        etiqueta: ['']
    });

    constructor(public seleccionQuery: SeleccionQuery, private planeacionQuery: PlaneacionQuery, private rxFb: RxFormBuilder, private planeacionService: PlaneacionService,
                private toastrService: ToastrService, private localizacion: Location, private render: Renderer2)
    {

    }

    agregar(e: MatChipInputEvent): void
    {
        //Agregamos un nuevo elemento al mat-chip
        let valor = (e.value || '').trim();
        if (valor)
        {
            const generarUuid = uuidv4().toString().substring(0, 7).toUpperCase();
            valor = valor + '__' + generarUuid;
            this.objFormulario[generarUuid] = ['', RxwebValidators.required({message: 'Este campo es requerido'})];
            this.formDin = this.rxFb.group(this.objFormulario);
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
            this.formDin.get('idIndicador').setValue(pbr.idIndicador);
            this.formDin.get('dato').setValue(pbr.dato);
            return;
        }
        this.formDin.get(this.ctrlNombre).setValue(pbr.idIndicador);
        this.cambioDeFocoCtrlsInput();
    }

    dobleClickSumatoria(sumatoria: ISumatorias): void
    {
        if (isNil(this.ctrlNombre))
        {
            return;
        }

        if (this.ctrlNombre === 'idIndicador' || this.ctrlNombre === 'dato')
        {
            this.formDin.get('idIndicador').setValue(sumatoria.idSumatoria);
            this.formDin.get('dato').setValue(sumatoria.nombreSumatoria);
            return;
        }
        this.formDin.get(this.ctrlNombre).setValue(sumatoria.idSumatoria);
        this.cambioDeFocoCtrlsInput();
    }

    cambioDeFocoCtrlsInput(): void
    {
        const ctrlsInput = this.listCtrls.toArray();
        if (this.indiceCtrlActual < ctrlsInput.length - 1)
        {
            const sigElemento = ctrlsInput[this.indiceCtrlActual + 1].nativeElement;
            this.render.selectRootElement(sigElemento).focus();
        }
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

    dblAsigValCtrl(): void
    {
        if (isNil(this.ctrlValor))
        {
            return;
        }
        if (this.ctrlNombre === 'idIndicador' || this.ctrlNombre === 'dato')
        {
            this.formDin.get('idIndicador').setValue(this.ctrlValor);
            this.formDin.get('dato').setValue(this.ctrlDato);
            return;
        }

        this.formDin.get(this.ctrlNombre).setValue(this.ctrlValor);
    }

    asignarIdsParaFormula(): void
    {
        const valorFormula = this.formTipoValores.get('formula').value;
        this.formTipoValores.get('formula').setValue(valorFormula + this.ctrlValor);
    }

    dblFormula(): void
    {
        if (isNil(this.ctrlValor))
        {
            return;
        }
        this.asignarIdsParaFormula();
    }


    conFoco(formCtrlNombre: string, i: number): void
    {
        this.ctrlNombre = formCtrlNombre.split('__').pop();
        this.indiceCtrlActual = i;
    }

    agregarLista(): void
    {
        if (isNil(this.formDin))
        {
            this.toastrService.warning('No se detactaron elementos en el formulario', 'Componente dinamico');
            return;
        }
        const objCompDin: Record<string, string> = {};
        this.tituloColumnas.forEach(x =>
        {
            const idObtenido = x.split('__').pop();
            const valorFormulario = this.formDin.get(idObtenido).value;
            //Se asignan los IdIndicador a un arreglo para tenerlos
            if (this.ids.includes(idObtenido))
            {
                this.toastrService.warning(`No puedes utilizar ids dubplicado para asignarlos a la lista, si necesitas utilizar el mismo valor del id al momento
                de realizar tu formula solo asignalo en la formula`, 'Lista componete dinamico')
                return;
            }
            //Objecto que almacenara la matriz del objectos con él, id generando y que es almacenado en los ids de las columnas
            objCompDin[idObtenido] = valorFormulario;

            if (idObtenido === 'dato')
            {
                return;
            }
            this.ids.push(valorFormulario);
            this.formTipoValores.get('formula').setValue(this.ids.join('+'));
        });

        // this.columnas = ComponentesService.colCompDinamico(this.tituloColumnas, 'texto');
        this.datosTabla.data.push(objCompDin);
        this.datosTabla.data = [...this.datosTabla.data];
        this.toastrService.info('Se ha agregado un nuevo elemento a la lista', 'Componente dinamico');
        this.deshabilitarChips = true;
        this.formDin.reset();
    }

    regComponente(): void
    {
        this.cargando = true;
        const datos: TRegComponente =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicadorMir: this.idIndicadorMir,
                ids: this.ids,
                idsColsTabla: this.tituloColumnas,
                tipoForm: TiposFormulario.DIN,
                tipoValorTrim: this.formTipoValores.get('tipoValorTrim').value,
                tipoValorAvance: this.formTipoValores.get('tipoValorAvance').value,
                etiqueta: this.formTipoValores.get('etiqueta').value,
                formula: this.formTipoValores.get('formula').value,
                formDinamico: this.datosTabla.data
            };
        this.planeacionService.regComponente(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            this.localizacion.back();

        })).subscribe();
    }

    trackByCtrls(indice: number, elemento: string): string | number
    {
        return indice || elemento;
    }
}
