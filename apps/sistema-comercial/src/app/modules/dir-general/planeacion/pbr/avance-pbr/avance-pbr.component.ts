import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {fuseAnimations} from '@s-fuse/public-api';

@Component({
    selector: 'app-avance-pbr',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './avance-pbr.component.html',
    styleUrls: ['./avance-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvancePbrComponent {}
