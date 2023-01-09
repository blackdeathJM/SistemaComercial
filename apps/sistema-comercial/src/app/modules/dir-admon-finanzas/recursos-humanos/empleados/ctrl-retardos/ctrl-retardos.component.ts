import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ctrl-retardos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ctrl-retardos.component.html',
    styleUrls: ['./ctrl-retardos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtrlRetardosComponent {}
