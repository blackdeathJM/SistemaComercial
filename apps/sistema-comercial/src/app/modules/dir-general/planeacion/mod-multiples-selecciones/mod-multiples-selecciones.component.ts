import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {CdkScrollable} from '@angular/cdk/overlay';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {SeleccionService} from '@s-dir-general/selecciones/store/seleccion.service';
import {SeleccionType} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {finalize} from 'rxjs';
import {CapitalizarDirective} from '@s-directives/capitalizar.directive';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {isEmpty, nth} from 'lodash-es';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';

@Component({
    selector: 'app-mod-multiples-selecciones',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatListModule, CdkScrollable, MatButtonModule, MatIconModule, ReactiveFormsModule, CapitalizarDirective],
    templateUrl: './mod-multiples-selecciones.component.html',
    styleUrls: ['./mod-multiples-selecciones.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMultiplesSeleccionesComponent
{
    ctrlCentroGestor = new FormControl('');
    ctrlUnidad = new FormControl('');
    ctrlDimension = new FormControl('');

    ctrlTipo = new FormControl('');
    ctrlFrecuencia = new FormControl('');

    constructor(public mdr: MatDialogRef<ModMultiplesSeleccionesComponent>, private seleccionService: SeleccionService, private ngxToast: NgxToastService,
                public seleccionQuery: SeleccionQuery)
    {
    }

    agregarCentroGestor(): void
    {
        const seleccion: SeleccionType =
            {
                _id: this.seleccionQuery.getValue() !== null ? this.seleccionQuery.getValue()._id : null,
                centroGestor: this.ctrlCentroGestor.value !== '' ? [this.ctrlCentroGestor.value] : ['sinDatos'],
                unidad: this.ctrlUnidad.value !== '' ? [this.ctrlUnidad.value] : ['sinDatos'],
                dimension: this.ctrlDimension.value !== '' ? [this.ctrlDimension.value] : ['sinDatos'],
                tipo: this.ctrlTipo.value !== '' ? [this.ctrlTipo.value] : ['sinDatos'],
                frecuencia: this.ctrlFrecuencia.value !== '' ? [this.ctrlFrecuencia.value] : ['sinDatos']
            };

        if (isEmpty(this.seleccionQuery.getValue()))
        {
            this.registrar(seleccion);
            return;
        }

        const llaves = Object.keys(this.seleccionQuery.getValue());
        llaves.splice(llaves.indexOf('_id'), 1);
        llaves.splice(llaves.indexOf('__typename'), 1);

        llaves.forEach((value) =>
        {
            const valor: string[] = seleccion[value];

            if (valor.includes('sinDatos'))
            {
                return;
            }

            if (this.seleccionQuery.getValue()[value].includes(nth(valor)))
            {
                this.ngxToast.alertaToast('El dato que estas intentando ingresar ya se encuentra registrado', seleccion[value]);
                return;
            }
            this.registrar(seleccion);
        });
    }

    registrar(input: SeleccionType): void
    {
        this.ctrlCentroGestor.disable();
        this.ctrlDimension.disable();
        this.ctrlUnidad.disable();
        this.ctrlDimension.disable();
        this.ctrlTipo.disable();
        this.ctrlFrecuencia.disable();

        this.seleccionService.agregarCentroGestor(input).pipe(finalize(() =>
        {
            this.ctrlCentroGestor.enable();
            this.ctrlDimension.enable();
            this.ctrlUnidad.enable();
            this.ctrlDimension.enable();
            this.ctrlTipo.enable();
            this.ctrlFrecuencia.enable();

            this.ctrlCentroGestor.reset();
            this.ctrlDimension.reset();
            this.ctrlUnidad.reset();
            this.ctrlDimension.reset();
            this.ctrlTipo.reset();
            this.ctrlFrecuencia.reset();
        })).subscribe();
    }
}
