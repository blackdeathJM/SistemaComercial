import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {ListaDeptosComponent} from '@s-dirAdmonFinanzas/departamento/components/lista-deptos/lista-deptos.component';
import {MatInputModule} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, Subscription, switchMap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DeptoService} from '@s-dirAdmonFinanzas/departamento/store/depto.service';
import {ModDeptoComponent} from '@s-dirAdmonFinanzas/departamento/components/mod-depto/mod-depto.component';
import {DeptoQuery} from '@s-dirAdmonFinanzas/departamento/store/depto.query';

@Component({
    selector: 'app-departamento',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, ListaDeptosComponent, MatInputModule, ReactiveFormsModule],
    templateUrl: './departamento.component.html',
    styleUrls: ['./departamento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartamentoComponent implements OnInit, OnDestroy
{
    controlBuscar: FormControl = new FormControl();
    private sub = new Subscription();

    constructor(private dRef: MatDialog, private deptosService: DeptoService, private deptoQuery: DeptoQuery)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.controlBuscar.valueChanges.pipe(debounceTime(300), switchMap((res: string) =>
            this.deptosService.filtarDeptos(res))).subscribe());
    }

    registro(): void
    {
        this.deptoQuery.selectActive(null);
        this.dRef.open(ModDeptoComponent, {width: '40%'});
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
