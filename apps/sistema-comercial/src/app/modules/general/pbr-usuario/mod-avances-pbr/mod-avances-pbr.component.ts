import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';

@Component({
    selector: 'app-mod-avances-pbr',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent],
    templateUrl: './mod-avances-pbr.component.html',
    styleUrls: ['./mod-avances-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAvancesPbrComponent {}
