import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '@s-fuse/animations';
import {DeptosWebService} from '#/libs/datos/src/lib/admin/depto/deptos-web.service';
import {finalize, map, Subscription} from 'rxjs';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-app/deptos/components/mod-depto/mod-depto.component';
import {DepartamentosGQL, deptos} from '#/libs/datos/src';
import {IDepto} from '#/libs/models/src';
import {STATE_GRAPHQL} from '@s-apollo/graphql.state';

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

    constructor(private dRef: MatDialog, private deptosWebService: DeptosWebService, private deptosGQL: DepartamentosGQL)
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
            STATE_DEPTOS(res.data.deptos as IDepto[]);
        }));
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
