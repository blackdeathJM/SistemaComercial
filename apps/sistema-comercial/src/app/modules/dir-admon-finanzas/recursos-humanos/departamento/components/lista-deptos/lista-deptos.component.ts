import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-dirAdmonFinanzas/departamento/components/mod-depto/mod-depto.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {EntityDeptoStore} from '@s-dirAdmonFinanzas/departamento/store/entity-depto.store';
import {DeptoService, loaderDeptos} from '@s-dirAdmonFinanzas/departamento/store/depto.service';
import {FuseCardModule} from '@s-fuse/card';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

@Component({
    standalone: true,
    exportAs: 'app-lista-deptos',
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            NgxUiLoaderModule,
            FuseCardModule,
            MatCardModule,
            MatListModule,
            MatTooltipModule,
            MatInputModule,
            ReactiveFormsModule,
        ],
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaDeptosComponent implements OnInit
{
    idLoader = loaderDeptos;
    ctrlAgregarPuesto = new FormControl([], RxwebValidators.required({message: 'es necesario un puesto'}));

    constructor(public deptoService: DeptoService, private dRef: MatDialog, public entityDepto: EntityDeptoStore)
    {

    }

    ngOnInit(): void
    {
        this.deptoService.departamentos().subscribe();
    }

    trackByFn(index: number, item: IDepto): string
    {
        return item._id;
    }

    editar(depto: IDepto): void
    {
        this.entityDepto.patchState({depto});
        this.dRef.open(ModDeptoComponent, {width: '40%'});
    }

    nuevoPuesto(depto: IDepto): void
    {
        console.log('****', this.ctrlAgregarPuesto.value, depto);
        // this.deptoService.agregarPuesto().subscribe();
    }
}
