import {Component, OnInit} from '@angular/core';
import {Portal, PortalService} from '@s-shared/services/portal.service';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
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
