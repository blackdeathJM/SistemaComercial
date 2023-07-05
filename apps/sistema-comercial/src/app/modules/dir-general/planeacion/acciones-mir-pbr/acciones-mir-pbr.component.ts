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
import {usuarioFil} from "@s-dir-general/store/planeacion.service";
import {AuthQuery} from "@s-core/auth/store/auth.query";

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

    constructor(public seleccionQuery: SeleccionQuery, public planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore, private authQuery: AuthQuery)
    {
    }

    seleccionarPlaneacion(e: IPlaneacion): void
    {
        this.planeacionStore.setActive(e._id);
        if (usuarioFil())
        {
            const filUsuario = e.mirCuestionario.filter(usuario => usuario.idEmpleado === this.authQuery.getValue()._id);
            this.planeacionQuery.cuestionarioMirV.set(filUsuario);
        } else
        {
            this.planeacionQuery.cuestionarioMirV.set(e.mirCuestionario);
        }

        this.planeacionQuery.cuestionarioPbrV.set(e.pbrCuestionario);
        this.planeacionQuery.sumatoriaPbrV.set(e.pbrSumatoria);
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
