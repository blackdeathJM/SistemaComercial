import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    standalone: true,
    imports:
        [
            RouterOutlet
        ],
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent
{

}
