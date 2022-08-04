import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-app/modules/admin/deptos/components/mod-depto/mod-depto.component';
import {fuseAnimations} from '@s-fuse/animations';
import {DeptosService} from '@s-app/modules/admin/deptos/deptos.service';
import {finalize, Subscription, tap} from 'rxjs';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';

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

    constructor(private dRef: MatDialog, private deptosService: DeptosService)
    {
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }

    ngOnInit(): void
    {
        this.subscripciones.add(this.deptosService.deptos().pipe(tap((res) =>
        {
            if (res.data !== undefined)
            {
                this.datosCargados = false;
                STATE_DEPTOS(res.data['deptos']);
            }
        }, finalize(() => console.log('Todo termino correctamente')))).subscribe());
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
