import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-imss',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './imss.component.html',
    styleUrls: ['./imss.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImssComponent {}
