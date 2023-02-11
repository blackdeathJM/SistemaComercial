import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
    standalone: true,
    exportAs: 'app-registros',
    selector: 'app-registros',
    templateUrl: './registros.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
        [
            CommonModule,
            MatExpansionModule,
            MatButtonModule,
            MatIconModule,
            MatProgressSpinnerModule,
            MatDialogModule
        ],
    styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent
{
    @Output() registro = new EventEmitter<void>();
    @Output() cancelar = new EventEmitter<void>();

    _cargando: boolean = false;
    _deshabilitar: boolean = false;
    @Input() set cargando(v: boolean)
    {
        this._cargando = v;
    }

    @Input() set deshabilitar(v: boolean)
    {
        this._deshabilitar = v;
    }

    reg(): void
    {
        this.registro.emit();
    }

    cerrar(): void
    {
        this.cancelar.emit();
    }
}
