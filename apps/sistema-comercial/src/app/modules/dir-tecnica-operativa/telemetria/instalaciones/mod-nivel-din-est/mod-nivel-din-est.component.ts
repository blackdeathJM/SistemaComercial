import {ChangeDetectionStrategy, Component, Inject, OnInit, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {RxReactiveFormsModule, RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Medicion, Meses} from '#/libs/models/src/lib/tecnica-operativa/telemetria/medicion';
import {IMedicionDinamicoEstatico} from '@s-dir-tecnica-operativa/instalaciones/detalle-instalacion/detalle-instalacion.component';
import {DeshabilitarCtrlDirective} from '@s-directives/deshabilitar-ctrl.directive';
import {toArray} from 'lodash-es';
import {ITomarMedicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/instalacion/instalacion.interface';
import {finalize} from 'rxjs';
import {TelemetriaQuery} from '@s-dir-tecnica-operativa/store/telemetria.query';

@Component({
    selector: 'app-mod-nivel-din-est',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, RxReactiveFormsModule, ReactiveFormsModule, DeshabilitarCtrlDirective],
    templateUrl: './mod-nivel-din-est.component.html',
    styleUrls: ['./mod-nivel-din-est.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModNivelDinEstComponent implements OnInit, AfterViewInit
{
    formNiveles: FormGroup;
    ano: number;
    cargando = false;
    meses = toArray(Meses).filter(elemento => !['ano', 'accion'].includes(elemento));

    constructor(@Inject(MAT_DIALOG_DATA) private data: IMedicionDinamicoEstatico, private telemetriaService: TelemetriaService, private telemetriaQuery: TelemetriaQuery, private fb: RxFormBuilder,
                public mdr: MatDialogRef<ModNivelDinEstComponent>)
    {
    }

    ngOnInit(): void
    {
        this.formNiveles = this.fb.formGroup(new Medicion());
        if (this.data)
        {
            // const instalacion = this.entityTelemetria.selectOne(this.data._id);
            const instalacion = this.telemetriaQuery.getEntity(this.data._id);
            const nivel = this.data.tipoMedicion.split('.');
            const medicion = instalacion.instalacion[nivel[1]][this.data.indice];
            this.ano = medicion.ano;
            // this.formNiveles.patchValue(this.entityTelemetria.snapshot.instalacion.instalacion[nivel[1]][this.data.indice]);

            // this.formNiveles.patchValue(this.telemetriaQuery.[nivel[1]][this.data.indice]);
        }
    }

    ngAfterViewInit(): void
    {
        this.meses.forEach((ctrl) =>
        {
            const control = this.formNiveles.get(ctrl);
            if (control.value !== 0)
            {
                control.disable();
            } else
            {
                control.enable();
            }
        });
    }

    reg(): void
    {
        //Volvemos habilitar los controles para que poder tomar el valor de los controles
        this.meses.forEach(ctrl => this.formNiveles.get(ctrl).enable());
        const args: ITomarMedicion =
            {
                _id: this.data._id,
                tipoNivel: this.data.tipoMedicion,
                ano: this.ano,
                ...this.meses.reduce((acc, mes) =>
                {
                    acc[mes] = parseFloat(this.formNiveles.get(mes).value);
                    return acc;
                }, {}),
            };
        this.cargando = true;
        this.formNiveles.disable();
        this.telemetriaService.actLectura(args).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formNiveles.enable();
            this.mdr.close();
        })).subscribe();
    }
}
