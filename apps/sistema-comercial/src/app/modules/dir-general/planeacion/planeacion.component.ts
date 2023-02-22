import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-planeacion',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './planeacion.component.html',
    styleUrls: ['./planeacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaneacionComponent {}
