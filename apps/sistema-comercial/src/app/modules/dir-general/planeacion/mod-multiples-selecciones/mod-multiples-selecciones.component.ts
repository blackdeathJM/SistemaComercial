import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {CdkScrollable} from '@angular/cdk/overlay';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-mod-multiples-selecciones',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatListModule, CdkScrollable, MatButtonModule, MatIconModule, ReactiveFormsModule],
    templateUrl: './mod-multiples-selecciones.component.html',
    styleUrls: ['./mod-multiples-selecciones.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMultiplesSeleccionesComponent implements OnInit
{
    centrosGestores: string[];
    ctrlCentroGestor: FormControl = new FormControl();

    constructor(@Inject(MAT_DIALOG_DATA) private data: boolean, private mdr: MatDialogRef<ModMultiplesSeleccionesComponent>, private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
        this.planeacionService.centrosGestores().subscribe((res) =>
        {
            if (res.data.centrosGestores.length > 0)
            {
                this.centrosGestores = res.data.centrosGestores;
            }
        });
    }

    agregarCentroGestor(): void
    {
        this.planeacionService.agregarCentroGestor(this.ctrlCentroGestor.value).subscribe();
    }
}
