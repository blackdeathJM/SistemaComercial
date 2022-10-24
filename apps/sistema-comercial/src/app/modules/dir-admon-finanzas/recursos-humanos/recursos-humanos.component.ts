import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-recursos-humanos',
    standalone: true,
    imports:
        [
            CommonModule,
            RouterOutlet
        ],
    templateUrl: './recursos-humanos.component.html',
    styleUrls: ['./recursos-humanos.component.scss']
})
export class RecursosHumanosComponent
{
}
