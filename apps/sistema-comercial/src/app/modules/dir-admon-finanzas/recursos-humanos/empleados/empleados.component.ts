import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkWithHref} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {ModRegistroEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/mod-registro-empleado/mod-registro-empleado.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Subject, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {MenuEmpleadosComponent} from "@s-dirAdmonFinanzas/empleados/menu-empleados/menu-empleados.component";
import {ListaEmpleadosComponent} from "@s-shared/components/lista-empleados/lista-empleados.component";
import {FuseCardModule} from "@s-fuse/card";

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports: [CommonModule, MatIconModule, RouterLinkWithHref, MatButtonModule, MatTabsModule, MatSidenavModule, RouterLink, MenuEmpleadosComponent, ListaEmpleadosComponent, FuseCardModule],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit, OnDestroy
{
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }


    // registroEmpleado(): void
    // {
    //     this.mdr.open(ModRegistroEmpleadoComponent, {data: null, width: '45%'});
    // }

    ngOnInit(): void
    {
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened if
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
