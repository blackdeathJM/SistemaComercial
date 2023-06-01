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
import {IFormComun, TiposFormulario, TipoValores} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {NumericValueType, RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgxToastService} from "@s-services/ngx-toast.service";
import {ModComponenteTablaComponent} from "@s-dir-general/componentes/mod-componentes/mod-componente-tabla/mod-componente-tabla.component";

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
    datos: IFormComun[] = [];
    periodoAnt = signal<boolean>(false);

    tipoForm = TiposFormulario.COMUN;

    cargando = false;
    valoresPeriodoAnt: boolean = false;

    valorAdicionalMulti: boolean = false;
    tipoValores = Object.values(TipoValores);

    validadorNumerico = [RxwebValidators.required({message: 'Este campo es requerido'}), RxwebValidators.numeric({
        allowDecimal: true,
        message: 'El valor debe ser numerico'
    })];

    formComun: FormGroup = this.fb.group({
        idIndicador: ['', RxwebValidators.required({message: 'El id del indicador es requerido'})],
        dato: ['Descripcion', RxwebValidators.required({message: 'Es necesario la definicion para este campo'})],
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico],
        valorAdicional: [0, RxwebValidators.numeric({allowDecimal: true, acceptValue: NumericValueType.PositiveNumber, persistZero: true})],
    });

    formTrimAnterior: FormGroup = this.fb.group({
        trim1: [0, this.validadorNumerico],
        trim2: [0, this.validadorNumerico],
        trim3: [0, this.validadorNumerico],
        trim4: [0, this.validadorNumerico]
    });

    formComponente: FormGroup = this.fb.group({
        tipoValorTrim: [null, RxwebValidators.required({message: 'Es necesario seleccionar que tipo de valor son los trimestres'})],
        tipoValorAvance: [null, RxwebValidators.required({message: 'Es necesario seleccionar el tipo de valor para los avances trimestrales'})]
    })

    constructor(public planeacionQuery: PlaneacionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, public mdr: MatDialogRef<ModCompComun>,
                private ngxToast: NgxToastService, private md: MatDialog)
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
            if (isNotNil(this.planeacionQuery.sumatoriaPbr()))
            {
                this.valoresPeriodoAnt = true;

                this.formComun.get('idIndicador').setValue(this.planeacionQuery.sumatoriaPbr().idSumatoria);
                this.formComun.get('dato').setValue(this.planeacionQuery.sumatoriaPbr().nombreSumatoria);
                this.formComun.patchValue(this.planeacionQuery.sumatoriaPbr());
            }
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
        const {trim1, trim2, trim3, trim4} = this.formTrimAnterior.value;
        this.datos.push({
            idIndicador: this.formComun.get('idIndicador').value,
            dato: this.formComun.get('dato').value,
            trim1: +this.formComun.get('trim1').value,
            trim2: +this.formComun.get('trim2').value,
            trim3: +this.formComun.get('trim3').value,
            trim4: +this.formComun.get('trim4').value,
            trim1Ant: this.periodoAnt ? +trim1 : 0,
            trim2Ant: this.periodoAnt ? +trim2 : 0,
            trim3Ant: this.periodoAnt ? +trim3 : 0,
            trim4Ant: this.periodoAnt ? +trim4 : 0,
            valorAdicional: +this.formComun.get('valorAdicional').value
        });

        this.ngxToast.infoToast('Se ha agregado un elemento a la lista para su registro', 'Componente');

        this.formComun.reset();
        this.formTrimAnterior.reset();
    }

    registrar(): void
    {
        if (this.datos.length === 0)
        {
            this.ngxToast.errorToast('No se puede continuar con el proceso de registro porque la lista esta vacia', 'Componente');
            return;
        }
        this.cargando = true;
        this.md.open(ModComponenteTablaComponent, {width: '40%', data: [this.periodoAnt, this.valorAdicionalMulti, 10], hasBackdrop: true, disableClose: true}).afterClosed().subscribe((res) =>
        {
            console.log(res);
        });

        // const regComponente: TRegComponente =
        //     {
        //         _id: this.planeacionQuery.getActive()._id,
        //         idIndicadorMir: this.planeacionQuery.cuestionarioMir().idIndicador,
        //
        //         tipoForm: this.tipoForm,
        //         valorAdicional: this.valorAdicionalUnico ? +this.formComun.get('valorAdicionalValor').value : 0,
        //         tipoValorTrim: this.formComponente.get('tipoValorTrim').value,
        //         tipoValorAvance: this.formComponente.get('tipoValorAvance').value,
        //         formComun: this.datos
        //     }
        // this.formComun.disable();
        // this.formTrimAnterior.disable();
        //
        // this.planeacionService.regComponente(regComponente).pipe(finalize(() =>
        // {
        //     this.cargando = false;
        //     this.formComun.enable();
        //     this.formTrimAnterior.enable();
        //     this.mdr.close();
        // })).subscribe();
    }

    periodoAntCheck(e: MatCheckboxChange): void
    {
        if (this.datos.length === 0)
        {
            this.periodoAnt.set(e.checked);
            this.tipoForm = e ? TiposFormulario.PERIODO_ANT : TiposFormulario.COMUN;
        }
    }

    establecerValorUnico(e: MatCheckboxChange): void
    {
        this.valorAdicionalMulti = e.checked;
    }
}
