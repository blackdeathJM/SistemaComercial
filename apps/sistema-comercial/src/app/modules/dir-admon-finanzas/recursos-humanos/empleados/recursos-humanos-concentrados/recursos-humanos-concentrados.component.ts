import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-recursos-humanos-concentrados',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recursos-humanos-concentrados.component.html',
    styleUrls: ['./recursos-humanos-concentrados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecursosHumanosConcentradosComponent {}
