import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-dir-general',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './dir-general.component.html',
    styleUrls: ['./dir-general.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirGeneralComponent {}
