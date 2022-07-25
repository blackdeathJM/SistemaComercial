import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-registros',
    templateUrl: './registros.component.html',
    styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent
{
    @Output() reg = new EventEmitter<void>();
    @Output() can = new EventEmitter<void>();

    _cargando: boolean;
    _deshabilitar: boolean;

    @Input() set cargando(v: boolean)
    {
        this._cargando = v;
    }

    @Input() set deshabilitar(v: boolean)
    {
        this._deshabilitar = v;
    }


    cancelar(): void
    {
        this.can.emit();
    }

    aceptar(): void
    {
        this.reg.emit();
    }

}
