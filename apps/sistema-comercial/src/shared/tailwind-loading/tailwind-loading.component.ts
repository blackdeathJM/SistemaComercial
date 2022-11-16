import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    standalone: true,
    exportAs: 'app-tailwind-loading',
    selector: 'app-tailwind-loading',
    templateUrl: './tailwind-loading.component.html',
    styleUrls: ['./tailwind-loading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TailwindLoadingComponent
{

}
