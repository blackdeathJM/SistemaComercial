import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {RegistrosComponent} from "@s-shared/registros/registros.component";

@Component({
    selector: 'app-mod-avances',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent],
    templateUrl: './mod-avances.component.html',
    styleUrls: ['./mod-avances.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAvancesComponent {}
