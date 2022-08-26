import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {IEmpleado} from '#/libs/models/src';
import {MatDialog} from '@angular/material/dialog';
import {RegistroSesionComponent} from '@s-app/empleado/components/registro-sesion/registro-sesion.component';
import {Subscription} from 'rxjs';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {FormControl} from '@angular/forms';
import {MatButtonToggleChange} from '@angular/material/button-toggle';

@Component({
    selector: 'app-detalle-empleado',
    templateUrl: './detalle-empleado.component.html',
    styleUrls: ['./detalle-empleado.component.scss']
})
export class DetalleEmpleadoComponent implements OnDestroy
{
    @Output() abrirPanel = new EventEmitter<boolean>();
    _empleado: IEmpleado;
    subscripcion: Subscription = new Subscription();
    roles = ['ninguno', 'lectura', 'completo'];

    controlRoles: FormControl = new FormControl();


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

    asignarSesion(data: IEmpleado): void
    {
        this.subscripcion.add(this.dialogRef.open(RegistroSesionComponent, {data, width: '40%'}).afterClosed().subscribe(() =>
        {
            setTimeout(() =>
            {
                this._empleado = STATE_EMPLEADOS().filter(value => value._id === data._id)[0];
            }, 200);
        }));
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }

    permisoSeleccionado(evento: void | MatButtonToggleChange, empleado: IEmpleado): void
    {
        console.log('evento toggle', evento['value']);

    }

    // ngOnInit(): void
    // {
    //     setTimeout(() =>
    //     {
    //         this._empleado?.auth?.rol.filter(value => this.controlRoles.setValue(value));
    //     }, 200);
    //
    // }

    // compareFunction(o1: string, o2: string): boolean
    // {
    //     console.log(o1, o2);
    //     return true;
    // }
}
