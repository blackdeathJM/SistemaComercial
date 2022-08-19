import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IDepto} from '#/libs/models/src';

@Component({
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss']
})
export class ListaDeptosComponent
{
    @Output() eventoEditar: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventoEliminar: EventEmitter<any> = new EventEmitter<any>();
    _deptos: IDepto[];

    @Input() set datos(valor: IDepto[])
    {
        this._deptos = valor;
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
