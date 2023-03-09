import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {isNotNil} from '@angular-ru/cdk/utils';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionService} from '@s-dir-general/selecciones/seleccion.service';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {Subscription} from 'rxjs';
import {TipoSeleccion} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.interface';

@Component({
    selector: 'app-list-drop-seleccion',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatListModule, MatOptionModule, MatSelectModule],
    templateUrl: './list-drop-seleccion.component.html',
    styleUrls: ['./list-drop-seleccion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDropSeleccionComponent implements OnInit
{
    @Input() esLista = false;
    @Input() tipoArreglo: TipoSeleccion;
    arreglos: string[] = [];
    sub = new Subscription();

    constructor(private seleccionService: SeleccionService, private seleccionStore: SeleccionStore)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.seleccionStore.state$.subscribe((res) =>
        {
            if (isNotNil(res))
            {
                this.arreglos = this.seleccionStore.getState()[this.tipoArreglo];
            }
        }));
    }

    seleccion(e: any): void
    {
        console.log('control y lista', e);
    }
}
