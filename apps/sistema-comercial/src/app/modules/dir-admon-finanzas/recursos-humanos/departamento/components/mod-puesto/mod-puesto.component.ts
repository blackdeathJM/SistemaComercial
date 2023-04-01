import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {DeptoEntity} from '@s-dirAdmonFinanzas/departamento/store/depto.entity';
import {CapitalizarDirective} from '@s-directives/capitalizar.directive';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {DeptoService} from '@s-dirAdmonFinanzas/departamento/store/depto.service';
import {IRegPuesto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {finalize} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-mod-puesto',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, CapitalizarDirective, ReactiveFormsModule],
    templateUrl: './mod-puesto.component.html',
    styleUrls: ['./mod-puesto.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModPuestoComponent
{
    ctrlPuesto = new FormControl('', RxwebValidators.required({message: 'El puesto es requerido'}));
    cargandoDatos = false;

    constructor(public entityDepto: DeptoEntity, private deptoService: DeptoService, public mdr: MatDialogRef<ModPuestoComponent>)
    {
    }

    registro(): void
    {
        this.cargandoDatos = true;
        const puesto: IRegPuesto =
            {
                _id: this.entityDepto.snapshot.depto._id,
                puesto: this.ctrlPuesto.value,
            };
        this.deptoService.agregarPuesto(puesto).pipe(finalize(() =>
        {
            this.cargandoDatos = false;
            this.mdr.close();
        })).subscribe();
    }
}
