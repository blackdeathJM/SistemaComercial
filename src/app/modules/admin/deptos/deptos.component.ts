import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@app/modules/admin/deptos/components/mod-depto/mod-depto.component';

@Component({
    selector: 'app-deptos-principal',
    templateUrl: './deptos.component.html',
    styleUrls: ['./deptos.component.scss']
})
export class DeptosComponent
{

    constructor(private dRef: MatDialog)
    {
    }

    registro(): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: null});
    }
}
