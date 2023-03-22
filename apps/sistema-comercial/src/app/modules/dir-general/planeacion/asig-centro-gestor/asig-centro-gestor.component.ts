import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-asig-centro-gestor',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './asig-centro-gestor.component.html',
    styleUrls: ['./asig-centro-gestor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsigCentroGestorComponent {}
