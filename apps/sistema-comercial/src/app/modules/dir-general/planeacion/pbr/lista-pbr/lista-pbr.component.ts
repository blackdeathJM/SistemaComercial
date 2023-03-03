import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lista-pbr',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lista-pbr.component.html',
    styleUrls: ['./lista-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaPbrComponent {}
