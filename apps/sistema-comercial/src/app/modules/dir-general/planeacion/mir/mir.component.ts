import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mir.component.html',
    styleUrls: ['./mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MirComponent {}
