import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IEmpleado} from '#/libs/models/src';
import {MatDialog} from '@angular/material/dialog';
import {RegistroSesionComponent} from "@s-app/empleado/components/registro-sesion/registro-sesion.component";

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

    constructor(private dialogRef: MatDialog)
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

    asignarSesion(_id: string): void
    {
        this.dialogRef.open(RegistroSesionComponent, {data: _id, width: '40%'});
    }
}
