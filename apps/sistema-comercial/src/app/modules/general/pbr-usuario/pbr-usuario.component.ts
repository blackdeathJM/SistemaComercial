import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {PlaneacionService, usuarioFil} from '@s-dir-general/store/planeacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {ComponentesComponent} from "@s-dir-general/componentes/componentes.component";
import {ListaMirSeleccionComponent} from "@s-dir-general/mir/lista-mir-seleccion/lista-mir-seleccion.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ModAsigActividadComponent} from "@s-general/pbr-usuario/mod-asig-actividad/mod-asig-actividad.component";

@Component({
    selector: 'app-pbr-usuario',
    standalone: true,
    imports: [CommonModule, ListaPbrComponent, MatInputModule, AccionesMirPbrComponent, ComponentesComponent, ListaMirSeleccionComponent, MatButtonModule, MatIconModule],
    templateUrl: './pbr-usuario.component.html',
    styleUrls: ['./pbr-usuario.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PbrUsuarioComponent implements OnInit, OnDestroy
{
    constructor(private planeacionService: PlaneacionService, public planeacionQuery: PlaneacionQuery, private mdr: MatDialog, private toastrService: ToastrService)
    {
    }

    ngOnInit(): void
    {
        //Obtenermos el usuario que ha iniciado sesion y la asignamos a una variable para usarla en el componente lista del pbr
        usuarioFil(true);
        // Obtenermos de la coleccion todos los años para poderlos seleccionar recoredad que toda la información se maneja en una sola coleccion,
        // mirCuestionario, pbrCuestionario, sumatorias etc.
        this.planeacionService.filTodos().subscribe();
    }

    ngOnDestroy(): void
    {
        usuarioFil(false);
    }

    asignarActividad(): void
    {
        if (!this.planeacionQuery.getActive())
        {
            this.toastrService.warning('No se detecto actividad activa', 'Asignacion de actividades');
            return;
        }
        this.mdr.open(ModAsigActividadComponent, {width: '70%'});
    }
}
