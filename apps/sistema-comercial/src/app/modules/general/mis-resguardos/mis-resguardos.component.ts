import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {fuseAnimations} from '@s-fuse/public-api';
import {ListaMisResguardosComponent} from "@s-general/lista-mis-resguardos/lista-mis-resguardos.component";

@Component({
    standalone: true,
    imports: [
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        ListaMisResguardosComponent,
    ],
    selector: 'app-mis-resguardos',
    templateUrl: './mis-resguardos.component.html',
    styleUrls: ['./mis-resguardos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class MisResguardosComponent
{
}
