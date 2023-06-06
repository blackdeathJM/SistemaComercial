import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {PlaneacionService, usuarioFil} from '@s-dir-general/store/planeacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';

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
    constructor(private planeacionService: PlaneacionService, public planeacionQuery: PlaneacionQuery)
    {
    }

    ngOnInit(): void
    {
        //Obtenermos el usuario que ha iniciado sesion y la asignamos a una variable para usarla en el componente lista del pbr
        usuarioFil(true);
        // Pasamos el valor del centro gestor a null, por si el usuario accede a
    }

    ngAfterViewInit(): void
    {
        // Obtenermos de la coleccion todos los años para poderlos seleccionar recoredad que toda la información se maneja en una sola coleccion,
        // mirCuestionario, pbrCuestionario, sumatorias y lo que vaya saliendo
        this.planeacionService.filTodos().subscribe();
    }
    ngOnDestroy(): void
    {
        usuarioFil(false);
    }
}
