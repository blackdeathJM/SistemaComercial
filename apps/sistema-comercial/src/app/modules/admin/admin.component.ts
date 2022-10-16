import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Subject, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy
{
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'deptos';

    private eliminarSubscripcion: Subject<any> = new Subject<any>();

    constructor(private cdr: ChangeDetectorRef, private fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }

    ngOnInit(): void
    {
        this.panels =
            [
                {
                    id: 'deptos',
                    icon: 'heroicons_outline:library',
                    title: 'Departamentos',
                    description: 'Agrega informacion de los departamentos existentes en el organismo'
                },
                {
                    id: 'empleado',
                    icon: 'heroicons_outline:user-circle',
                    title: 'Empleados',
                    description: 'Adminitra los permisos de los empleados y asigna permisos para cada uno de los departamentos'
                }
            ];
        this.fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this.eliminarSubscripcion)).subscribe(({matchingAliases}) =>
        {
            if (matchingAliases.includes('lg'))
            {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else
            {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }
            this.cdr.markForCheck();
        });
    }

    irAlPanel(panel: string): void
    {
        this.selectedPanel = panel;
        if (this.drawerMode === 'over')
        {
            this.drawer.close().then();
        }
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    ngOnDestroy(): void
    {
        this.eliminarSubscripcion.next(null);
        this.eliminarSubscripcion.complete();
    }
}
