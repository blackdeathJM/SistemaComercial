import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-mod-pbr',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mod-pbr.component.html',
    styleUrls: ['./mod-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModPbrComponent
{
    @Output() panel = new EventEmitter<boolean>();

    constructor()
    {
    }
}
