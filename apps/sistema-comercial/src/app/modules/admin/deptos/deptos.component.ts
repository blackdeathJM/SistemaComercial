import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '@s-fuse/animations';
import {debounceTime, map, Subscription, switchMap} from 'rxjs';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-app/deptos/components/mod-depto/mod-depto.component';
import {DepartamentosGQL} from '#/libs/datos/src';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {cloneDeep} from 'lodash-es';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ListaDeptosComponent} from '@s-app/deptos/components/lista-deptos/lista-deptos.component';

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
            ListaDeptosComponent
        ],
    selector: 'app-deptos-principal',
    templateUrl: './deptos.component.html',
    styleUrls: ['./deptos.component.scss'],
    animations: [fuseAnimations]
})
export class DeptosComponent implements OnInit, OnDestroy
{
    datosCargados = true;
    subscripciones: Subscription = new Subscription();
    controlBuscar: FormControl = new FormControl();

    constructor(private dRef: MatDialog, private deptosGQL: DepartamentosGQL)
    {
        // this.deptos$ = this.deptosGQL.watch().valueChanges.pipe(map(res => res.data.deptos));
    }

    ngOnInit(): void
    {
        this.subscripciones.add(this.deptosGQL.watch().valueChanges.pipe(switchMap((res) =>
        {
            if (res.data)
            {
                STATE_DEPTOS(cloneDeep(res.data.deptos as IDepto[]));
            }
            return this.controlBuscar.valueChanges.pipe(debounceTime(200), map(value => res.data.deptos.filter(v => v.nombre.toLowerCase().includes(value.toLowerCase()))));
        })).subscribe((res) =>
        {
            this.datosCargados = false;
            STATE_DEPTOS(res as IDepto[]);
        }));
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }

    editar(data: IDepto): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data});
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
