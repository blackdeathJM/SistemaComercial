import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {Motor} from '#/libs/models/src/lib/tecnica-operativa/telemetria/motor/motor';
import {CapitalizarDirective} from '@s-directives/capitalizar.directive';
import {IAgregarMotor} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-mod-motor',
    standalone: true,
    imports: [CommonModule, MatInputModule, RxReactiveFormsModule, RegistrosComponent, MatDatepickerModule, CapitalizarDirective, ReactiveFormsModule],
    templateUrl: './mod-motor.component.html',
    styleUrls: ['./mod-motor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMotorComponent implements OnInit
{
    formMotor: FormGroup;
    cargando = false;

    constructor(@Inject(MAT_DIALOG_DATA) private esActualizacion: boolean, private entityTelemetria: EntityTelemetria, private telemetriaService: TelemetriaService, private fb: RxFormBuilder,
                public mdr: MatDialogRef<ModMotorComponent>)
    {
    }

    ngOnInit(): void
    {
        this.formMotor = this.fb.formGroup(new Motor());
    }

    registro(): void
    {
        this.cargando = true;
        const fechaInst = this.formMotor.get('fechaInstalacion').value;
        const mediciones = ['amperaje', 'eficiencia', 'factPotencia', 'hp', 'voltaje'];
        const args: IAgregarMotor =
            {
                _id: this.entityTelemetria.snapshot.instalacion._id,
                motor: {
                    fechaInstalacion: fechaInst.toISO(),
                    ...this.formMotor.value,
                    ...mediciones.reduce((acc, medicion) =>
                    {
                        acc[medicion] = Number.parseFloat(this.formMotor.get(medicion).value.toString());
                        return acc;
                    }, {}),
                }
            };
        this.formMotor.disable();
        this.telemetriaService.agregarMotor(args).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formMotor.enable();
            this.mdr.close();
        })).subscribe();
    }
}
