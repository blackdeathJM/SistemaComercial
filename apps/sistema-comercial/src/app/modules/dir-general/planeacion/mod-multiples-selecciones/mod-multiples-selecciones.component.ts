import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {CdkScrollable} from '@angular/cdk/overlay';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {SeleccionService} from '@s-dir-general/selecciones/seleccion.service';
import {ListDropSeleccionComponent} from '@s-dir-general/mir/list-drop-seleccion/list-drop-seleccion.component';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {SeleccionType} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {finalize, Subscription} from 'rxjs';
import {isNotNil} from '@angular-ru/cdk/utils';
import {CapitalizarDirective} from '@s-directives/capitalizar.directive';

@Component({
    selector: 'app-mod-multiples-selecciones',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatListModule, CdkScrollable, MatButtonModule, MatIconModule, ReactiveFormsModule, ListDropSeleccionComponent, CapitalizarDirective],
    templateUrl: './mod-multiples-selecciones.component.html',
    styleUrls: ['./mod-multiples-selecciones.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMultiplesSeleccionesComponent implements OnInit, OnDestroy
{
    ctrlCentroGestor = new FormControl('');
    ctrlUnidad = new FormControl('');
    ctrlVariable = new FormControl('');
    sub = new Subscription();
    centrosGestores: string[] = [];
    unidades: string[] = [];
    variableOrigen: string[] = [];

    constructor(public mdr: MatDialogRef<ModMultiplesSeleccionesComponent>, private seleccionService: SeleccionService,
                private seleccionStore: SeleccionStore)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.seleccionStore.state$.subscribe((res) =>
        {
            if (isNotNil(res))
            {
                this.centrosGestores = res.centroGestor;
                this.unidades = res.unidad;
                this.variableOrigen = res.variableOrigen;
            }
        }));
    }

    agregarCentroGestor(): void
    {
        const seleccion: SeleccionType =
            {
                _id: this.seleccionStore.snapshot !== null ? this.seleccionStore.snapshot._id : '',
                centroGestor: this.ctrlCentroGestor.value !== '' ? [this.ctrlCentroGestor.value] : ['sinDatos'],
                unidad: this.ctrlUnidad.value !== '' ? [this.ctrlUnidad.value] : ['sinDatos'],
                variableOrigen: this.ctrlVariable.value !== '' ? [this.ctrlVariable.value] : ['sinDatos']
            };

        this.seleccionService.agregarCentroGestor(seleccion).pipe(finalize(() =>
        {
            this.ctrlCentroGestor.setValue('');
            this.ctrlVariable.setValue('');
            this.ctrlUnidad.setValue('');
        })).subscribe();
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
