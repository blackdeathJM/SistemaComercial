import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '@s-fuse/animations';
import {debounceTime, map, mergeMap, Subscription, tap} from 'rxjs';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-app/deptos/components/mod-depto/mod-depto.component';
import {DepartamentosGQL, EliminarDeptoGQL} from '#/libs/datos/src';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {modalConfirmacionEliminar} from '@s-shared/modalConfirmacion';
import {FormControl} from '@angular/forms';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {NgxToastService} from '#/libs/services/src/lib/services/ngx-toast.service';
import {cloneDeep} from 'lodash-es';

@Component({
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
    confirmacionDialogo: FuseConfirmationConfig = modalConfirmacionEliminar;

    constructor(private dRef: MatDialog, private deptosGQL: DepartamentosGQL, private confirmacionService: FuseConfirmationService,
                private eliminarGQL: EliminarDeptoGQL, private ngxToastService: NgxToastService)
    {
        // this.deptos$ = this.deptosGQL.watch().valueChanges.pipe(map(res => res.data.deptos));
    }

    ngOnInit(): void
    {
        this.subscripciones.add(this.deptosGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(mergeMap((res) =>
        {
            this.datosCargados = false;
            if (res.data)
            {
                STATE_DEPTOS(cloneDeep(res.data.deptos) as IDepto[]);
            }
            return this.controlBuscar.valueChanges.pipe(debounceTime(200), map(value => res.data.deptos.filter(v => v.nombre.toLowerCase().includes(value.toLowerCase()))));
        })).subscribe((res) =>
        {
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

    eliminar(data: IDepto): void
    {
        // para eliminar el registro del estado podemos utilizar pull de lodas checar sus variaciones del pull
        const dialogRef = this.confirmacionService.open(this.confirmacionDialogo);

        dialogRef.afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {
                this.subscripciones.add(this.eliminarGQL.mutate({_id: data._id}).pipe(tap((respuesta) =>
                {
                    if (respuesta.data)
                    {
                        const nvoState = STATE_DEPTOS().filter(value => value._id !== respuesta.data.eliminarDepto._id);
                        STATE_DEPTOS(nvoState);
                        this.ngxToastService.satisfactorioToast('El departamento fue eliminado con exito', 'Eliminar registro');
                    }
                })).subscribe());
            }
        });
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
