import {AfterContentChecked, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {Select} from '@ngxs/store';
import {DeptoStore} from '@s-admin/depto.store';
import {Observable} from 'rxjs';

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
export class ListaDeptosComponent
{
    @Select(DeptoStore.deptos) deptos$: Observable<IDepto[]>;
    @Select(DeptoStore.estaCargando) estaCargando$: Observable<boolean>;
    @Output() eventoEditar: EventEmitter<any> = new EventEmitter<any>();

    trackByFn(index: number, item: IDepto): string
    {
        return item._id;
    }

    editar(valor: any): void
    {
        this.eventoEditar.emit(valor);
    }
}
