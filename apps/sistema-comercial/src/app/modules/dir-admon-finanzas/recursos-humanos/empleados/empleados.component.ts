import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Subject} from 'rxjs';
import {MenuEmpleadosComponent} from '@s-dirAdmonFinanzas/empleados/menu-empleados/menu-empleados.component';
import {ListaEmpleadosComponent} from '@s-shared/components/lista-empleados/lista-empleados.component';
import {FuseCardModule} from '@s-fuse/card';
import {ConsultaEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/consulta-empleado/consulta-empleado.component';
import {MatInputModule} from '@angular/material/input';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {DrawerComponent} from "@s-shared/plantillas/drawer/drawer.component";
import {DrawerService} from "@s-shared/plantillas/drawer/drawer.service";

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports:
        [
            CommonModule, MatIconModule, RouterLinkWithHref, MatButtonModule, MatTabsModule, MatSidenavModule, RouterLink, MenuEmpleadosComponent, ListaEmpleadosComponent, FuseCardModule,
            ConsultaEmpleadoComponent, RouterOutlet, MatInputModule, DrawerComponent
        ],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit
{
    constructor(private empleadoService: EmpleadoService, private drawerService: DrawerService)
    {
    }


    // registroEmpleado(): void
    // {
    //     this.mdr.open(ModRegistroEmpleadoComponent, {data: null, width: '45%'});
    // }

    ngOnInit(): void
    {
        this.drawerService.setPanelIzq = true;
        this.empleadoService.empleados().subscribe();
    }


    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
