import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '@s-fuse/animations';
import {DeptosWebService} from '#/libs/datos/src/lib/admin/depto/deptos-web.service';
import {finalize, Subscription, tap} from 'rxjs';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-app/deptos/components/mod-depto/mod-depto.component';
import {DepartamentosGQL, EliminarDeptoGQL} from '#/libs/datos/src';
import {IDepto} from '#/libs/models/src';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {modalConfirmacionEliminar} from '@s-shared/modalConfirmacion';

@Component({
    selector: 'app-deptos-principal',
    templateUrl: './deptos.component.html',
    styleUrls: ['./deptos.component.scss'],
    animations: fuseAnimations
})
export class DeptosComponent implements OnInit, OnDestroy
{
    datosCargados = true;
    subscripciones: Subscription = new Subscription();
    confirmacionDialogo: FuseConfirmationConfig = modalConfirmacionEliminar;
    stateDepto: IDepto[];

    constructor(private dRef: MatDialog, private deptosWebService: DeptosWebService, private deptosGQL: DepartamentosGQL,
                private confirmacionService: FuseConfirmationService, private eliminarGQL: EliminarDeptoGQL)
    {
        // this.deptos$ = this.deptosGQL.watch().valueChanges.pipe(map(res => res.data.deptos));
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }

    ngOnInit(): void
    {
        this.subscripciones.add(this.deptosGQL.watch({},
            {
                notifyOnNetworkStatusChange: true
            }).valueChanges.pipe(finalize(() => this.datosCargados = false)).subscribe((res) =>
        {
            this.datosCargados = res.loading;
            this.stateDepto = STATE_DEPTOS(res.data.deptos as IDepto[]);
        }));
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
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
                    }
                })).subscribe());
            }
        });
    }
}
