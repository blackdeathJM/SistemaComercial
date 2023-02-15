import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TRegInstalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {Instalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria';

@Component({
    selector: 'app-mod-instalacion',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatInputModule, MatSelectModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule],
    templateUrl: './mod-instalacion.component.html',
    styleUrls: ['./mod-instalacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModInstalacionComponent implements OnInit
{
    formInstalacion: FormGroup;

    constructor(private entityTelemetria: EntityTelemetria, public mdr: MatDialogRef<ModInstalacionComponent>, private telemetriaService: TelemetriaService, private fb: RxFormBuilder)
    {

    }

    ngOnInit(): void
    {
        this.formInstalacion = this.fb.formGroup(new Instalacion());
        this.entityTelemetria.state$.subscribe(res => console.log(res));
    }

    regInstalacion(): void
    {
        const inst: TRegInstalacion =
            {
                instalacion: this.formInstalacion.value
            };
        this.telemetriaService.regInstalacion(inst).subscribe();
    }
}
