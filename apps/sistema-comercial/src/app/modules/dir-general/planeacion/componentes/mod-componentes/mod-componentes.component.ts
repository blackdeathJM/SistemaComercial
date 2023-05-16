import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TRegComp} from "@s-dir-general/store/planeacion.interface";
import {RegistrosComponent} from "#/apps/sistema-comercial/src/shared/registros/registros.component";

@Component({
    selector: 'app-mod-componentes',
    standalone: true,
    imports: [CommonModule, MatRadioModule, FormsModule, MatInputModule, MatSelectModule, RegistrosComponent],
    templateUrl: './mod-componentes.component.html',
    styleUrls: ['./mod-componentes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModComponentesComponent
{
    constructor(private planeacionQuery: PlaneacionQuery, @Inject(MAT_DIALOG_DATA) private data: TRegComp)
    {
    }

    registro(): void
    {

    }
}
