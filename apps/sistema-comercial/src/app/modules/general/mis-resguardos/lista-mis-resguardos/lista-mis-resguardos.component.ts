import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-lista-mis-resguardos',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './lista-mis-resguardos.component.html',
    styleUrls: ['./lista-mis-resguardos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMisResguardosComponent {}
