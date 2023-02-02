import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkWithHref, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListaEmpleadosComponent} from '@s-shared/components/lista-empleados/lista-empleados.component';
import {FuseCardModule} from '@s-fuse/card';
import {ConsultaEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/consulta-empleado/consulta-empleado.component';
import {MatInputModule} from '@angular/material/input';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {DrawerComponent} from '@s-shared/plantillas/drawer/drawer.component';
import {DrawerService} from '@s-shared/plantillas/drawer/drawer.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {fuseAnimations} from '@s-fuse/public-api';


@Component({
    selector: 'app-empleados',
    standalone: true,
    imports:
        [
            CommonModule,
            MatIconModule,
            RouterLinkWithHref,
            MatButtonModule,
            MatTabsModule,
            MatSidenavModule,
            RouterLink,
            ListaEmpleadosComponent,
            FuseCardModule,
            ConsultaEmpleadoComponent,
            RouterOutlet,
            MatInputModule,
            DrawerComponent,
            MatSelectModule,
            NgxUiLoaderModule,
        ],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.scss'],
    animations: fuseAnimations
})
export class EmpleadosComponent implements OnInit
{
    ngxLoader = 'loaderGralInfo';


    constructor(private empleadoService: EmpleadoService, private drawerService: DrawerService, private mdr: MatDialog, public entityEmpleado: EntityEmpleadoStore)
    {
    }

    ngOnInit(): void
    {
        this.empleadoService.empleados(this.ngxLoader).subscribe();
    }


    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

}
