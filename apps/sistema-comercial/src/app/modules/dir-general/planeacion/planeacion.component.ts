import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {SeleccionService} from '@s-dir-general/selecciones/seleccion.service';

@Component({
    selector: 'app-planeacion',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './planeacion.component.html',
    styleUrls: ['./planeacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaneacionComponent implements OnInit
{
    constructor(private seleccionService: SeleccionService)
    {
    }

    ngOnInit(): void
    {
        this.seleccionService.centrosGestores().subscribe();
    }
}
