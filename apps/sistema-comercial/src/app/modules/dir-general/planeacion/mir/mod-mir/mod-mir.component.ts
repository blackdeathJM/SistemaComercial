import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-mod-mir',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule],
    templateUrl: './mod-mir.component.html',
    styleUrls: ['./mod-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModMirComponent
{
    @Output() panel = new EventEmitter<boolean>();

    constructor()
    {
    }

    cerrar(): void
    {
        this.panel.emit(false);
    }
}
