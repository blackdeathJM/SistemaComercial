import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-ctrl-entradas-salidas-retardos',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule],
    templateUrl: './ctrl-entradas-salidas-retardos.component.html',
    styleUrls: ['./ctrl-entradas-salidas-retardos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtrlEntradasSalidasRetardosComponent {}
