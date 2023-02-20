import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {RxReactiveFormsModule, RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Medicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/medicion';
import {IMedicionDinamicoEstatico} from '@s-dir-tecnica-operativa/instalaciones/detalle-instalacion/detalle-instalacion.component';
import {DeshabilitarCtrlDirective} from '@s-directives/deshabilitar-ctrl.directive';

@Component({
    selector: 'app-mod-nivel-din-est',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, RxReactiveFormsModule, ReactiveFormsModule, DeshabilitarCtrlDirective],
    templateUrl: './mod-nivel-din-est.component.html',
    styleUrls: ['./mod-nivel-din-est.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModNivelDinEstComponent implements OnInit
{
    formNiveles: FormGroup;
    ano: number;
    cargando = false;

    constructor(@Inject(MAT_DIALOG_DATA) private data: IMedicionDinamicoEstatico, private telemetriaService: TelemetriaService, private entityTelemetria: EntityTelemetria, private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
        this.formNiveles = this.fb.formGroup(new Medicion());
        if (this.data)
        {
            const instalacion = this.entityTelemetria.selectOne(this.data._id);
            const medicion = instalacion.instalacion[this.data.tipoMedicion][this.data.indice];
            this.ano = medicion.ano;
            this.formNiveles.patchValue(this.entityTelemetria.snapshot.instalacion.instalacion[this.data.tipoMedicion][this.data.indice]);
        }
    }

    reg(): void
    {
        console.log(this.formNiveles.value);
    }
}
