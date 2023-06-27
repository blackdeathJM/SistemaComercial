import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InicioComponent
{
}
