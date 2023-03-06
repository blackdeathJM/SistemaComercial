import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pbr-usuario',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pbr-usuario.component.html',
    styleUrls: ['./pbr-usuario.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PbrUsuarioComponent
{}
