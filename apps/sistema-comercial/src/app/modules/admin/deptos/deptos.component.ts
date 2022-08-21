import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '@s-fuse/animations';
import {DeptosWebService} from '#/libs/datos/src/lib/admin/depto/deptos-web.service';
import {debounceTime, map, Subscription, tap} from 'rxjs';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-app/deptos/components/mod-depto/mod-depto.component';
import {DepartamentosGQL, EliminarDeptoGQL} from '#/libs/datos/src';
import {IDepto} from '#/libs/models/src';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {modalConfirmacionEliminar} from '@s-shared/modalConfirmacion';
import {FormControl} from '@angular/forms';
import {NgxToastService} from '#/libs/services/src';
import {cloneDeep} from 'lodash-es';

@Component({
    selector: 'app-deptos-principal',
    templateUrl: './deptos.component.html',
    styleUrls: ['./deptos.component.scss'],
    animations: [fuseAnimations]
})
export class DeptosComponent implements OnInit, OnDestroy, AfterViewInit
{
    datosCargados = true;
    subscripciones: Subscription = new Subscription();
    controlBuscar: FormControl = new FormControl();
    confirmacionDialogo: FuseConfirmationConfig = modalConfirmacionEliminar;

    constructor(private dRef: MatDialog, private deptosWebService: DeptosWebService, private deptosGQL: DepartamentosGQL,
                private confirmacionService: FuseConfirmationService, private eliminarGQL: EliminarDeptoGQL, private ngxToastService: NgxToastService)
    {
        // this.deptos$ = this.deptosGQL.watch().valueChanges.pipe(map(res => res.data.deptos));
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }

    ngOnInit(): void
    {
        this.subscripciones.add(this.deptosGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(tap((res) =>
        {
            this.datosCargados = res.loading;
            if (res.data.deptos)
            {
                STATE_DEPTOS(res.data.deptos as IDepto[]);
            }
        })).subscribe());
    }

    ngAfterViewInit(): void
    {
        // Hacemos una pequena demora para que pueda cargar el estado y lo asignamos a una variable para tener una copia y poder realizar el filtrado siempre desde una
        // copia para tener los valores disponibles y de esa manera asignar el nuevo estado dependiendo de la busqueda
        setTimeout(() =>
        {
            const stadoActual = cloneDeep(STATE_DEPTOS());
            this.controlBuscar.valueChanges.pipe(debounceTime(200),
                map(value =>
                    this.filtro(stadoActual, value)
                )).subscribe((res) =>
            {
                STATE_DEPTOS(res);
            });

            console.log('Estado actual', stadoActual);
        }, 100);
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

    private filtro(edoFiltrar: IDepto[], depto: string): IDepto[]
    {
        return edoFiltrar.filter(value => value.nombre.toLowerCase().includes(depto.toLowerCase()));
    }
}
