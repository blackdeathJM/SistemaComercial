import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseAlertModule} from "@s-fuse/alert";
import {MatCardModule} from "@angular/material/card";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";

@Component({
    selector: 'app-lista-sum-pbr',
    standalone: true,
    imports: [CommonModule, FuseAlertModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './lista-sum-pbr.component.html',
    styleUrls: ['./lista-sum-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaSumPbrComponent
{
    constructor(private planeacionQuery: PlaneacionQuery)
    {
    }
}
