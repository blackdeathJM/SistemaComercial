import {Component, OnInit} from '@angular/core';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {Portal, PortalService} from '#/apps/sistema-comercial/src/services/portal.service';

@Component({
    standalone: true,
    exportAs: 'app-portal',
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    imports:
        [
            CommonModule, PortalModule
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
