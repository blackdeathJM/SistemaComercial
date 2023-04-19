import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'sistema-comercial-mod-inicialzar-registro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mod-inicialzar-registro.component.html',
    styleUrls: ['./mod-inicialzar-registro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModInicialzarRegistroComponent {}
