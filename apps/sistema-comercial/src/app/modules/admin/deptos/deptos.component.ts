import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {DrawerComponent} from '@s-shared/plantillas/drawer/drawer.component';
import {ListaDeptosComponent} from '@s-admin/../../dir-admon-finanzas/recursos-humanos/departamento/components/lista-deptos/lista-deptos.component';
import {fuseAnimations} from '@s-fuse/public-api';
import {ModDeptoComponent} from '@s-admin/../../dir-admon-finanzas/recursos-humanos/departamento/components/mod-depto/mod-depto.component';
import {AsyncPipe} from '@angular/common';
import {debounceTime, Subscription, switchMap} from 'rxjs';
import {DeptoService} from '@s-admin/../../dir-admon-finanzas/recursos-humanos/departamento/store/depto.service';

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
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeptosComponent implements OnInit, OnDestroy
{
    controlBuscar: FormControl = new FormControl();
    private sub = new Subscription();

    constructor(private dRef: MatDialog, private deptosService: DeptoService)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.controlBuscar.valueChanges.pipe(debounceTime(300), switchMap((res: string) =>
        this.deptosService.filtarDeptos(res))).subscribe());
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
