import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {FuseCardModule} from '@s-fuse/card';

@Component({
    selector: 'app-mod-instalacion',
    standalone: true,
    imports: [CommonModule, MatDialogModule, FuseCardModule],
    templateUrl: './mod-instalacion.component.html',
    styleUrls: ['./mod-instalacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModInstalacionComponent {}
