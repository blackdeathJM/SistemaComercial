import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mod-bomba',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mod-bomba.component.html',
    styleUrls: ['./mod-bomba.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModBombaComponent {}
