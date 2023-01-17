import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-nomina',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatSelectModule, MatTabsModule, MatButtonModule],
    templateUrl: './nomina.component.html',
    styleUrls: ['./nomina.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NominaComponent {}
