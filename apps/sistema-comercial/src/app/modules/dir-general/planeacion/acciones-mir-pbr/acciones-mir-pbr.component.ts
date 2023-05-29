import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SeleccionQuery} from '@s-dir-general/selecciones/store/seleccion.query';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {PlaneacionStore} from "@s-dir-general/store/planeacion.store";

@Component({
    selector: 'app-acciones-mir-pbr',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
    templateUrl: './acciones-mir-pbr.component.html',
    styleUrls: ['./acciones-mir-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccionesMirPbrComponent
{
    @Input() habCentroGestor = false;

    constructor(public seleccionQuery: SeleccionQuery, public planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore)
    {
    }

    seleccionarPlaneacion(e: IPlaneacion): void
    {
        this.planeacionStore.setActive(e._id);
        this.planeacionQuery.cuestionarioPbrV.set([...e.pbrCuestionario]);
        this.planeacionQuery.cuestionarioMirV.set([...e.mirCuestionario]);
        this.planeacionQuery.sumatoriaPbrV.set([...e.pbrSumatoria]);
    }

    filCentroGestor(e: string): void
    {
        this.planeacionQuery.centroGestor.set(e);
    }

    trackByFn(index: number, elemento: string): number | string
    {
        return index || elemento;
    }
}
