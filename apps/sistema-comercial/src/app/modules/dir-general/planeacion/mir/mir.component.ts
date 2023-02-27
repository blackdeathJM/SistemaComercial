import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModMirComponent} from '@s-dir-general/mir/mod-mir/mod-mir.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {ModMultiplesSeleccionesComponent} from '@s-dir-general/mod-multiples-selecciones/mod-multiples-selecciones.component';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {FormsModule} from "@angular/forms";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, ModMirComponent, MatTableModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, FormsModule],
    templateUrl: './mir.component.html',
    styleUrls: ['./mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MirComponent implements OnInit
{
    centrosGestores: string[] = [];

    constructor(public mdr: MatDialog, private planeacionService: PlaneacionService)
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

    regSelecciones(): void
    {
        const data = false;
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '40%', data});
    }

    buscarPorCentroGestor(e: Event): void
    {
        console.log(e);
    }

    seleccion(e: MatOptionSelectionChange<string>): void
    {
        console.log(e);
    }

    cambio(e: Event): void
    {
        console.log('change', e);
    }
}
