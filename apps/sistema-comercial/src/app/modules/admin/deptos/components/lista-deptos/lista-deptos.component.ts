import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {Observable} from 'rxjs';
import {DeptoEntitieState} from '@s-admin/depto.storeEntity';

@Component({
    standalone: true,
    exportAs: 'app-lista-deptos',
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            TailwindLoadingComponent,
        ],
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss'],
})
export class ListaDeptosComponent implements OnInit
{
    @Output() eventoEditar: EventEmitter<any> = new EventEmitter<any>();

    constructor(public deptosState: DeptoEntitieState)
    {

    }

    ngOnInit(): void
    {
        this.deptosState.cargarDeptos();
    }

    trackByFn(index: number, item: IDepto): string
    {
        return item._id;
    }

    editar(valor: any): void
    {
        this.eventoEditar.emit(valor);
    }
}
