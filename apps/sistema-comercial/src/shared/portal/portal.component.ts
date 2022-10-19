import {Component, OnInit} from '@angular/core';
import {Portal, PortalService} from '#/libs/services/src/lib/services/portal.service';
import {PortalModule} from "@angular/cdk/portal";

@Component({
    standalone: true,
    exportAs: 'app-portal',
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    imports:
        [
            PortalModule
        ],
    styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit
{
    portal: Portal;

    constructor(private portalService: PortalService)
    {
    }

    ngOnInit(): void
    {
        this.portalService.gPortal.subscribe(res => this.portal = res);
    }

}
