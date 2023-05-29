import {ChangeDetectionStrategy, Component, effect, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
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
    datos: IformComun[] = [];

    periodoAnt = signal<boolean>(false);
    tipoForm: TiposFormulario;
    cargando = false;
    valoresPeriodoAnt: boolean = false;

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
            if (isNotNil(this.planeacionQuery.cuestionarioPbr()))
            {
                this.valoresPeriodoAnt = false;
                this.formComun.patchValue(this.planeacionQuery.cuestionarioPbr());
            }
        });

        effect(() =>
        {
            this.valoresPeriodoAnt = true;
            this.formComun.get('idIndicador').setValue(this.planeacionQuery.sumatoriaPbr().nombreSumatoria);
            this.formComun.get('dato').setValue(this.planeacionQuery.sumatoriaPbr().descripcion);
            this.formComun.get('trim1').setValue(this.planeacionQuery.sumatoriaPbr().trim1);
            this.formComun.get('trim2').setValue(this.planeacionQuery.sumatoriaPbr().trim2);
            this.formComun.get('trim3').setValue(this.planeacionQuery.sumatoriaPbr().trim3);
            this.formComun.get('trim4').setValue(this.planeacionQuery.sumatoriaPbr().trim4);
        });

        effect(() =>
        {
            if (this.periodoAnt())
            {
                const id = this.formComun.get('idIndicador').value;
                const periodoAnterior = this.planeacionQuery.filPorAno(this.planeacionQuery.getActive().ano, id, this.valoresPeriodoAnt);
                if (isNotNil(periodoAnterior))
                {
                    this.formTrimAnterior.patchValue(periodoAnterior);
                }
            }
        });
    }

    agregarAlArreglo(): void
    {
        const {idIndicador} = this.formComun.value;

        const {trim1, trim2, trim3, trim4} = this.formTrimAnterior.value;
        this.datos.push({
            idIndicador,
            dato: this.formComun.get('dato').value,
            trim1: +this.planeacionQuery.cuestionarioPbr().trim1,
            trim2: +this.planeacionQuery.cuestionarioPbr().trim2,
            trim3: +this.planeacionQuery.cuestionarioPbr().trim3,
            trim4: +this.planeacionQuery.cuestionarioPbr().trim4,
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
        if (this.datos.length === 0)
        {
            this.ngxToast.errorToast('No se puede continuar con el proceso de registro porque la lista esta vacia', 'Componente');
            return;
        }
        this.cargando = true;

        const regComponente: TRegComponente =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicadorMir: this.planeacionQuery.cuestionarioMir().idIndicador,
                formComun: this.datos,
                tipoForm: this.tipoForm,
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
            this.tipoForm =e ? TiposFormulario.PERIODO_ANT : TiposFormulario.COMUN;
        }
    }
}
