import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {finalize, Subscription} from 'rxjs';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Mir} from '#/libs/models/src/lib/dir-general/planeacion/mir/Mir';
import {MirType} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {AscDesc} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';
import {MirService} from '@s-dir-general/mir/store/mir.service';
import {SeleccionType} from "#/libs/datos/src";

@Component({
    selector: 'app-mod-mir',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule],
    providers: [MirService],
    templateUrl: './mod-mir.component.html',
    styleUrls: ['./mod-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModMirComponent implements OnInit, OnDestroy
{
    @Output() panel = new EventEmitter<boolean>();

    selecciones: SeleccionType;
    centrosGestores: string[] = [];
    unidades: string[] = [];
    dimensiones: string[] = [];
    tipos: string[] = [];
    frecuencias: string[] = [];
    formMir: FormGroup;
    sentidoIndicador = Object.values(AscDesc);
    sub = new Subscription();
    cargando = false;

    constructor(private seleccionStore: SeleccionStore, private fb: RxFormBuilder, private mirService: MirService)
    {
    }

    ngOnInit(): void
    {
        this.formMir = this.fb.formGroup(new Mir());
        this.formMir.get('ano').setValue(new Date().getFullYear());
        this.sub.add(this.seleccionStore.state$.subscribe((res) =>
        {
            if (isNotNil(res))
            {
                this.selecciones = $cast<SeleccionType>(res);
            }
        }));
    }

    regMir(): void
    {
        this.cargando = true;
        const {ano, avanceAnual, avanceTrim1, avanceTrim2, avanceTrim3, avanceTrim4, lineaBaseValor, meta, semefAmarillo, semefRojo, semefVerde, ...resto} = this.formMir.value;

        const input: MirType =
            {
                ano: parseInt(ano, 10),
                avanceAnual: +avanceAnual,
                avanceTrim1: +avanceTrim1,
                avanceTrim2: +avanceTrim2,
                avanceTrim3: +avanceTrim3,
                lineaBaseValor: +lineaBaseValor,
                meta: +meta,
                semefAmarillo: +semefAmarillo,
                semefRojo: +semefRojo,
                semefVerde: +semefVerde,
                ...resto
            };

        this.mirService.agregarMir(input).pipe(finalize(() =>
        {
            this.cargando = false;
            Object.keys(this.formMir.controls).forEach((ctrlNombre) =>
            {
                const ctrl = this.formMir.get(ctrlNombre);
                if (ctrlNombre !== 'centroGestor')
                {
                    ctrl.reset();
                }
            });
        })).subscribe();
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
