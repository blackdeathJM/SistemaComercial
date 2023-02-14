import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {FuseCardModule} from '@s-fuse/card';
import {MatInputModule} from "@angular/material/input";

@Component({
    selector: 'app-mod-instalacion',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatInputModule],
    templateUrl: './mod-instalacion.component.html',
    styleUrls: ['./mod-instalacion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModInstalacionComponent
{
    constructor()
    {
    }
}
