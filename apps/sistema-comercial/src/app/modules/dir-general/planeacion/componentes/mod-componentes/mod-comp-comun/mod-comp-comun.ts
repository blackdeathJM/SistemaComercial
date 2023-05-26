import {ChangeDetectionStrategy, Component, effect, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {isNotNil} from "@angular-ru/cdk/utils";
import {IformComun, TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {finalize} from "rxjs";
import {TRegComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxToastService} from "@s-services/ngx-toast.service";

@Component({
    selector: 'app-mod-comp-comun',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, RegistrosComponent, MatButtonModule, MatIconModule, ReactiveFormsModule, MatTooltipModule, MatCheckboxModule,
        RxReactiveFormsModule],
    templateUrl: './mod-comp-comun.html',
    styleUrls: ['./mod-comp-comun.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModCompComun
{
    pbrCuestionario = this.planeacionQuery.cuestionarioPbr;

    datos: IformComun[] = [];

    periodoAnt = signal<boolean>(false);
    cargando = false;

    validadorNumerico = [RxwebValidators.required, RxwebValidators.numeric({allowDecimal: true, message: 'El valor debe ser numerico'})];
    formComun: FormGroup = this.fb.group({
        idIndicador: ['', RxwebValidators.required({message: 'El id del indicador es requerido'})],
        dato: ['', RxwebValidators.required],
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico],
        etiqueta: ['']
    });

    formTrimAnterior: FormGroup = this.fb.group({
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    constructor(public planeacionQuery: PlaneacionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private mdr: MatDialogRef<ModCompComun>,
                private ngxToast: NgxToastService)
    {
        effect(() =>
        {
            if (isNotNil(this.pbrCuestionario()))
            {
                this.formComun.patchValue(this.pbrCuestionario());
            }
            if (this.periodoAnt())
            {
                const periodoAnterior = this.obtenerPeriodoAnterior(this.formComun.get('idIndicador').value);
                if (isNotNil(periodoAnterior))
                {
                    this.formTrimAnterior.patchValue(periodoAnterior);
                }
            }
        });
    }

    obtenerPeriodoAnterior(idIndicador: string): IPbrCuestionario
    {
        return this.planeacionQuery.filPorAno(this.planeacionQuery.getActive().ano, idIndicador);
    }

    agregarAlArreglo(): void
    {
        const {idIndicador} = this.formComun.value;

        const {trim1, trim2, trim3, trim4} = this.formTrimAnterior.value;
        this.datos.push({
            idIndicador,
            dato: this.formComun.get('dato').value,
            trim1: +this.pbrCuestionario().trim1,
            trim2: +this.pbrCuestionario().trim2,
            trim3: +this.pbrCuestionario().trim3,
            trim4: +this.pbrCuestionario().trim4,
            trim1Anterior: this.periodoAnt ? +trim1 : 0,
            trim2Anterior: this.periodoAnt ? +trim2 : 0,
            trim3Anterior: this.periodoAnt ? +trim3 : 0,
            trim4Anterior: this.periodoAnt ? +trim4 : 0,
        });
        this.ngxToast.infoToast('Se ha agregado un elemento a la lista para su registro', 'Componente');
        this.formComun.reset();
    }

    registrar(): void
    {
        if (this.datos.length <= 1)
        {
            this.ngxToast.errorToast('No se puede continuar con el proceso de registro porque la lista esta vacia o debe tener por lo menos dos elementos', 'Componente');
            return;
        }


        this.cargando = true;

        const regComponente: TRegComponente =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicadorMir: this.planeacionQuery.cuestionarioMir().idIndicador,
                formComun: this.datos,
                tipoForm: this.periodoAnt() ? TiposFormulario.PERIODO_ANT : TiposFormulario.COMUN,
                etiqueta: this.formComun.get('etiqueta').value,
            }
        this.formComun.disable();
        this.formTrimAnterior.disable();

        this.planeacionService.regComponente(regComponente).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formComun.enable();
            this.formTrimAnterior.enable();
            this.mdr.close();
        })).subscribe();
    }

    periodoAntCheck(e: MatCheckboxChange): void
    {
        if (this.datos.length === 0)
        {
            this.periodoAnt.set(e.checked);
        }
    }
}
