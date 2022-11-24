import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-dir-tecnica-operativa',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './dir-tecnica-operativa.component.html',
    styleUrls: ['./dir-tecnica-operativa.component.scss'],
})
export class DirTecnicaOperativaComponent {}
