import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    standalone: true,
    exportAs: 'app-registros',
    selector: 'app-registros',
    templateUrl: './registros.component.html',
    imports:
        [
            CommonModule,
            MatExpansionModule,
            MatButtonModule,
            MatIconModule,
            MatProgressSpinnerModule
        ],
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
