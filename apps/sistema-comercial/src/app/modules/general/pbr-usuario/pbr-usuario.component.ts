import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';

@Component({
    selector: 'app-pbr-usuario',
    standalone: true,
    imports: [CommonModule, ListaPbrComponent, MatInputModule, ModAvancesPbrComponent],
    templateUrl: './pbr-usuario.component.html',
    styleUrls: ['./pbr-usuario.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PbrUsuarioComponent
{}
