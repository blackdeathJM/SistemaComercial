import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
    standalone: true,
    exportAs: 'app-sin-datos',
    selector: 'app-sin-datos',
    templateUrl: './sin-datos.component.html',
    styleUrls: ['./sin-datos.component.scss'],
    imports: [
        NgIf,
        MatIconModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinDatosComponent
{
    _longitud = 0;
    @Input() set longitud(v: number)
    {
        this._longitud = v;
    }
}
