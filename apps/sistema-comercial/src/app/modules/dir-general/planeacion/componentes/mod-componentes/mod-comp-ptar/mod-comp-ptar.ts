import {ChangeDetectionStrategy, Component, inject, Input} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {SeleccionQuery} from "@s-dir-general/selecciones/store/seleccion.query";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {TRegComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";
import {v4 as uuidv4} from 'uuid';

@Component({
    selector: 'app-mod-comp-ptar',
    standalone: true,
    templateUrl: './mod-comp-ptar.html',
    styleUrls: ['./mod-comp-ptar.scss'],
    imports:
        [
            MatInputModule, MatCardModule, MatChipsModule, NgForOf, MatIconModule, MatListModule, MatSelectModule, NgIf, AsyncPipe, ReactiveFormsModule, RxReactiveFormsModule, MatButtonModule
        ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModCompPtar
{
    @Input({required: true}) idIndicadorMir: string = null;

    readonly separador = [ENTER, COMMA] as const;
    locutor = inject(LiveAnnouncer);
    filCuestionarioPbr: IPbrCuestionario[] = [];

    cabeceraColumna: string[] = ['idIndicador', 'Dato'];
    columnasMod: string[] = [];

    obj =
        {
            dato: ['', RxwebValidators.required({message: ''})]
        }
    formComp: FormGroup = this.rxFb.group({
        idIndicador: ['', RxwebValidators.required({message: 'Es necesario el identificador unico de la tabla PBR'})]
    });

    constructor(public seleccionQuery: SeleccionQuery, private planeacionQuery: PlaneacionQuery, private rxFb: RxFormBuilder, private planeacionService: PlaneacionService) {}

    agregar(e: MatChipInputEvent): void
    {
        const valor = (e.value || '').trim();
        if (valor)
        {
            this.cabeceraColumna.push(valor);
        }
        e.chipInput!.clear();
    }

    editar(cabecera: string, e: MatChipEditedEvent): void
    {
        const valor = e.value.trim();
        if (!valor)
        {
            this.remover(cabecera);
            return;
        }
        const index = this.cabeceraColumna.indexOf(cabecera);
        if (index >= 0)
        {
            this.cabeceraColumna[index] = valor;
        }
    }

    remover(cabecera: string): void
    {
        const index = this.cabeceraColumna.indexOf(cabecera);
        if (index >= 0)
        {
            this.cabeceraColumna.splice(index, 1);
            this.locutor.announce(`Columna removida`).then();
        }
    }

    cambioValorChipColumnas(e: string[]): void
    {
        e.forEach((x: string) =>
        {
            if (x === 'idIndicador')
            {
                this.columnasMod.push(x);
                return;
            }
            const generarUuid = uuidv4().toString().substring(0, 7).toUpperCase();
            const variableMod = x + '-' + generarUuid;
            this.columnasMod.push(variableMod);
        });

        console.log('Nuevas propiedades para los campos', this.columnasMod);
    }

    cambioDepto(e: string): void
    {
        const deptos = this.planeacionQuery.getActive().pbrCuestionario.slice();
        this.filCuestionarioPbr = deptos.filter(x => x.centroGestor === e);
    }

    dobleClick(pbr: IPbrCuestionario): void
    {
        console.log('------', pbr);
    }

    agregarLista(): void
    {
        const datos: TRegComponente =
            {
                _id: 'idCocumento',
                formula: 'formula',
                ids: ['Ids para la formula'],
                idIndicadorMir: 'IdIndicadorMir',
                tipoForm: 'formDinamico',
                formComun: [],
                tipoValorAvance: 'TipoValorAvance',
                tipoValorTrim: 'ValorParaTrimestre',
                formDinamico: [this.obj]
            };
        this.planeacionService.regCompDinamico(datos).subscribe();
    }

    regComponente(): void
    {

    }
}
