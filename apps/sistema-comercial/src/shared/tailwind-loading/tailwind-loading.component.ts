import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    standalone: true,
    exportAs: 'app-tailwind-loading',
    selector: 'app-tailwind-loading',
    templateUrl: './tailwind-loading.component.html',
    styleUrls: ['./tailwind-loading.component.scss'],
    imports: [
        NgIf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TailwindLoadingComponent
{
    _longitud = 0;
    @Input() set longitud(v: number)
    {
        this._longitud = v;
    }
}
