import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {CdkScrollable} from '@angular/cdk/overlay';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {SeleccionService} from '@s-dir-general/selecciones/seleccion.service';
import {ListDropSeleccionComponent} from '@s-dir-general/mir/list-drop-seleccion/list-drop-seleccion.component';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {SeleccionType} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {finalize} from 'rxjs';

@Component({
    selector: 'app-mod-multiples-selecciones',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatListModule, CdkScrollable, MatButtonModule, MatIconModule, ReactiveFormsModule, ListDropSeleccionComponent],
    templateUrl: './mod-multiples-selecciones.component.html',
    styleUrls: ['./mod-multiples-selecciones.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMultiplesSeleccionesComponent
{
    ctrlCentroGestor = new FormControl('');
    ctrlUnidad = new FormControl('');
    ctrlVariable = new FormControl('');

    constructor(@Inject(MAT_DIALOG_DATA) private data: boolean, private mdr: MatDialogRef<ModMultiplesSeleccionesComponent>, private seleccionService: SeleccionService,
                private seleccionStore: SeleccionStore)
    {
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
}
