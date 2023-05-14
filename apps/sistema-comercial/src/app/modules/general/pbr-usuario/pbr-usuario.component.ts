import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {PlaneacionService, usuarioFil, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
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
export default class PbrUsuarioComponent implements OnInit, AfterViewInit, OnDestroy
{
    constructor(private planeacionService: PlaneacionService, private planeacionStore: PlaneacionStore, public planeacionQuery: PlaneacionQuery,
                private authQuery: AuthQuery)
    {
    }

    ngOnInit(): void
    {
        //Obtenermos el usuario que ha iniciado sesion y la asignamos a una variable para usarla en el componente lista del pbr
        usuarioFil(this.authQuery.getValue()._id);
    }

    ngAfterViewInit(): void
    {
        // Obtenermos de la coleccion todos los años para poderlos seleccionar recoredad que toda la información se maneja en una sola coleccion,
        // mirCuestionario, pbrCuestionario, sumatorias y lo que vaya saliendo
        this.planeacionService.filTodos().subscribe();
    }
    ngOnDestroy(): void
    {
        usuarioFil(null);
    }
}
