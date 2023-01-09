import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Subject, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {MenuEmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/menu-empleados/menu-empleados.component';
import {ListaEmpleadosComponent} from '@s-shared/components/lista-empleados/lista-empleados.component';
import {FuseCardModule} from '@s-fuse/card';
import {ConsultaEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/consulta-empleado/consulta-empleado.component';

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports:
        [
            CommonModule, MatIconModule, RouterLinkWithHref, MatButtonModule, MatTabsModule, MatSidenavModule,
            RouterLink, MenuEmpleadosComponent, ListaEmpleadosComponent, FuseCardModule, ConsultaEmpleadoComponent, RouterOutlet
        ],
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
            .subscribe(({matchingAliases}) =>
            {

                // Set the drawerMode and drawerOpened if
                if (matchingAliases.includes('lg'))
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else
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
