import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {Subscription} from 'rxjs';
import {isNotNil} from '@angular-ru/cdk/utils';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Mir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir';

@Component({
    selector: 'app-mod-mir',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
    templateUrl: './mod-mir.component.html',
    styleUrls: ['./mod-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModMirComponent implements OnInit, OnDestroy
{
    @Output() panel = new EventEmitter<boolean>();
    centrosGestores: string[] = [];
    unidades: string[] = [];
    variablesOrigen: string[] = [];
    formMir: FormGroup;
    sub = new Subscription();

    constructor(private seleccionStore: SeleccionStore, private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
        this.formMir = this.fb.formGroup(new Mir());
        this.sub.add(this.seleccionStore.state$.subscribe((res) =>
        {
            if (isNotNil(res))
            {
                this.centrosGestores = res.centroGestor;
                this.unidades = res.unidad;
                this.variablesOrigen = res.variableOrigen;
            }
        }));
    }

    regMir(): void
    {
        console.log('****', this.formMir.value);
    }

    cerrar(): void
    {
        this.panel.emit(false);
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
