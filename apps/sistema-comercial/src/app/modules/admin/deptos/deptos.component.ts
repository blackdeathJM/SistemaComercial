import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {DrawerComponent} from '@s-shared/plantillas/lista-detalle/drawer.component';
import {ListaDeptosComponent} from '@s-admin/components/lista-deptos/lista-deptos.component';
import {fuseAnimations} from '@s-fuse/public-api';
import {ModDeptoComponent} from '@s-admin/components/mod-depto/mod-depto.component';
import {AsyncPipe} from '@angular/common';
import {ListaDetalleService} from '@s-shared/plantillas/lista-detalle/lista-detalle.service';

@Component({
    standalone: true,
    imports:
        [
            MatFormFieldModule,
            MatIconModule,
            RxReactiveFormsModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatInputModule,
            ListaDeptosComponent,
            DrawerComponent,
            MatInputModule,
            MatButtonModule,
            AsyncPipe,
        ],
    selector: 'app-deptos-principal',
    templateUrl: './deptos.component.html',
    styleUrls: ['./deptos.component.scss'],
    animations: [fuseAnimations]
})
export class DeptosComponent implements OnInit
{
    controlBuscar: FormControl = new FormControl();

    constructor(private dRef: MatDialog, private panelService: ListaDetalleService)
    {
    }

    ngOnInit(): void
    {
        this.panelService.setPanel = false;
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }

    trackByFn(index: number, item: any): any
    {
        return item._id || index;
    }
}
