import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IEmpleado} from '#/libs/models/src';

@Component({
    selector: 'app-detalle-empleado',
    templateUrl: './detalle-empleado.component.html',
    styleUrls: ['./detalle-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleEmpleadoComponent
{
    @Output() abrirPanel = new EventEmitter<boolean>();
    _empleado: IEmpleado;

    constructor()
    {
    }

    @Input() set empleado(valor: IEmpleado)
    {
        this._empleado = valor;
    }

    abrir(): void
    {
        this.abrirPanel.emit(false);
    }
}
