import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {FormGroup} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {RegistrosComponent} from "@s-shared/registros/registros.component";

@Component({
    selector: 'app-mod-motor',
    standalone: true,
    imports: [CommonModule, MatInputModule, RxReactiveFormsModule, RegistrosComponent],
    templateUrl: './mod-motor.component.html',
    styleUrls: ['./mod-motor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMotorComponent implements OnInit
{
    formMotor: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) private esActualizacion: boolean, private entityTelemetria: EntityTelemetria, private telemetriaService: TelemetriaService, private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
    }
}
