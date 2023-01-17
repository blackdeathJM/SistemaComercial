import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-imss',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatButtonModule],
    templateUrl: './imss.component.html',
    styleUrls: ['./imss.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImssComponent {}
