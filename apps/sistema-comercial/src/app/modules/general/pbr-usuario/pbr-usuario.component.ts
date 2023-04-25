import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';
import {AccionesMirPbrComponent} from "@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component";
import {PlaneacionService} from "@s-dir-general/store/planeacion.service";

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
    constructor(private planeacionService: PlaneacionService)
    {
    }

    ngOnInit(): void
    {
        this.planeacionService.filTodos().subscribe();
    }
}
