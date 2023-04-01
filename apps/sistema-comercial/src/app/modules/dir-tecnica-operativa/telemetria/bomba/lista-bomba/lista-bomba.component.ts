import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lista-bomba',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lista-bomba.component.html',
    styleUrls: ['./lista-bomba.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaBombaComponent {}
