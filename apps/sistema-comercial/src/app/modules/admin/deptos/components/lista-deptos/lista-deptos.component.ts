import {AfterContentChecked, Component, EventEmitter, Output} from '@angular/core';
import {IDepto} from '#/libs/models/src';
import {STATE_DEPTOS} from '@s-app/deptos/deptos.state';

@Component({
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss'],
})
export class ListaDeptosComponent implements AfterContentChecked
{
    @Output() eventoEditar: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventoEliminar: EventEmitter<any> = new EventEmitter<any>();
    deptos: IDepto[];

    ngAfterContentChecked(): void
    {
        this.deptos = STATE_DEPTOS();
    }

    trackByFn(index: number, item: IDepto): string
    {
        return item._id;
    }

    editar(valor: any): void
    {
        this.eventoEditar.emit(valor);
    }

    eliminar(valor: any): void
    {
        this.eventoEliminar.emit(valor);
    }
}
