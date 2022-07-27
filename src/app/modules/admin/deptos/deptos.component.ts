import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@app/modules/admin/deptos/components/mod-depto/mod-depto.component';
import {fuseAnimations} from '@fuse/animations';
import {DeptosService} from '@app/modules/admin/deptos/deptos.service';
import {tap} from 'rxjs';
import {STATE_DEPTOS} from '@app/modules/admin/deptos/deptos.state';

@Component({
    selector: 'app-deptos-principal',
    templateUrl: './deptos.component.html',
    styleUrls: ['./deptos.component.scss'],
    animations: fuseAnimations
})
export class DeptosComponent implements OnInit
{
    datosCargados = true;

    constructor(private dRef: MatDialog, private deptosService: DeptosService)
    {
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }

    ngOnInit(): void
    {
        this.deptosService.deptos().pipe(tap((res) =>
        {
            this.datosCargados = res.loading;
            STATE_DEPTOS(res.data['deptos']);
        })).subscribe();
    }
}
