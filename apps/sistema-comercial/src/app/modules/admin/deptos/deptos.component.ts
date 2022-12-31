import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {ListaDeptosComponent} from '@s-admin/components/lista-deptos/lista-deptos.component';
import {fuseAnimations} from '@s-fuse/public-api';
import {ModDeptoComponent} from '@s-admin/components/mod-depto/mod-depto.component';
import {DeptoStore} from '@s-admin/depto.store';
import {Select} from '@ngxs/store';

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
            ListaDetalleComponent,
        ],
    selector: 'app-deptos-principal',
    templateUrl: './deptos.component.html',
    styleUrls: ['./deptos.component.scss'],
    animations: [fuseAnimations]
})
export class DeptosComponent implements OnInit
{
    @Select(DeptoStore.deptos) deptos$: Observable<IDepto[]>;
    @Select(DeptoStore.estaCargando) estaCargando$: Observable<boolean>;
    controlBuscar: FormControl = new FormControl();

    constructor(private dRef: MatDialog, public deptoStore: DeptoStore)
    {
    }

    ngOnInit(): void
    {
        this.deptoStore.cargarDeptos();
        // this.subscripciones.add(this.deptosGQL.watch().valueChanges.pipe(switchMap((res) =>
        // {
        //     if (res.data)
        //     {
        //         STATE_DEPTOS(cloneDeep(res.data.deptos as IDepto[]));
        //     }
        //     return this.controlBuscar.valueChanges.pipe(debounceTime(200), map(value => res.data.deptos.filter(v => v.nombre.toLowerCase().includes(value.toLowerCase()))));
        // })).subscribe((res) =>
        // {
        //     this.datosCargados = false;
        //     STATE_DEPTOS(res as IDepto[]);
        // }));
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
        return item._id || index;
    }
}
