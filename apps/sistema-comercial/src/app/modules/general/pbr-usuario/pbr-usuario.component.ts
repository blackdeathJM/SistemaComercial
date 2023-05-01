import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {AuthQuery} from '@s-core/auth/store/auth.query';

@Component({
    selector: 'app-pbr-usuario',
    standalone: true,
    imports: [CommonModule, ListaPbrComponent, MatInputModule, ModAvancesPbrComponent, AccionesMirPbrComponent],
    templateUrl: './pbr-usuario.component.html',
    styleUrls: ['./pbr-usuario.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PbrUsuarioComponent implements OnInit
{
    planeacion: IPlaneacion = null;

    constructor(private planeacionService: PlaneacionService, private planeacionStore: PlaneacionStore, private planeacionQuery: PlaneacionQuery,
                private authQuery: AuthQuery)
    {
    }

    ngOnInit(): void
    {
        this.planeacionService.filTodos().subscribe();
    }

    seleccionarPlaneacion(e: IPlaneacion): void
    {
        this.planeacionStore.setActive(e._id);
        this.planeacion = this.planeacionQuery.filPlaneacionCentroGestorEmpleado('pbrCuestionario', 'idEmpleado', this.authQuery.getValue()._id);
    }
}
