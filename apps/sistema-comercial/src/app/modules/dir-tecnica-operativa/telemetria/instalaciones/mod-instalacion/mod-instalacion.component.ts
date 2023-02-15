import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TActInst, TRegInstalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {Instalacion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria';
import {finalize} from 'rxjs';
import {CapitalizarDirective} from "@s-directives/capitalizar.directive";
import {$cast} from "@angular-ru/cdk/utils";

@Component({
    selector: 'app-mod-instalacion',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatInputModule, MatSelectModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule, CapitalizarDirective],
    templateUrl: './mod-instalacion.component.html',
    styleUrls: ['./mod-instalacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModInstalacionComponent implements OnInit
{
    formInstalacion: FormGroup;
    cargando = false;

    constructor(private entityTelemetria: EntityTelemetria, public mdr: MatDialogRef<ModInstalacionComponent>, private telemetriaService: TelemetriaService, private fb: RxFormBuilder,
                @Inject(MAT_DIALOG_DATA) private esActualizacion: boolean)
    {

    }

    ngOnInit(): void
    {
        this.formInstalacion = this.fb.formGroup(new Instalacion());
        if (this.esActualizacion)
        {
            this.formInstalacion.patchValue(this.entityTelemetria.snapshot.instalacion.instalacion);
        }
    }

    regInstalacion(): void
    {
        this.cargando = true;
        this.formInstalacion.disable();
        const inst: TRegInstalacion =
            {
                instalacion: {
                    tipoInstalacion: this.formInstalacion.get('tipoInstalacion').value,
                    diamAdeme: parseFloat(this.formInstalacion.get('diamAdeme').value),
                    diamCol: parseFloat(this.formInstalacion.get('diamCol').value),
                    longCol: parseFloat(this.formInstalacion.get('longCol').value),
                    nombre: this.formInstalacion.get('nombre').value,
                    direccion: this.formInstalacion.get('direccion').value,
                    profPozo: parseFloat(this.formInstalacion.get('profPozo').value),
                    diamPerforacion: parseFloat(this.formInstalacion.get('diamPerforacion').value),
                    activo: true
                }
            };

        if (this.esActualizacion)
        {
            const args: TActInst =
                {
                    _id: this.entityTelemetria.snapshot.instalacion._id,
                    ...inst
                };
            this.telemetriaService.actInst(args).pipe(finalize(() =>
            {
                this.cargando = false;
                this.formInstalacion.enable();
                this.mdr.close();
            })).subscribe();
        } else
        {
            this.telemetriaService.regInstalacion(inst).pipe(finalize(() =>
            {
                this.cargando = false;
                this.formInstalacion.enable();
                this.mdr.close();
            })).subscribe();
        }
    }
}
