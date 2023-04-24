import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { finalize, Subscription } from 'rxjs';
import { ReactiveFormConfig, RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Mir } from '#/libs/models/src/lib/dir-general/planeacion/mir/Mir';
import { SeleccionType } from '#/libs/datos/src';
import { TrimDirective } from '@s-directives/trim.directive';
import { TrimInputModule } from '@angular-ru/cdk/directives';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SeleccionQuery } from '@s-dir-general/selecciones/store/seleccion.query';
import { AscDesc } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import { TRegMir } from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import { idPlaneacion, PlaneacionService } from '@s-dir-general/store/planeacion.service';

@Component({
    selector: 'app-mod-mir',
    standalone: true,
    imports: [
        CommonModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, RxReactiveFormsModule, TrimDirective, TrimInputModule, NgxTrimDirectiveModule],
    providers: [],
    templateUrl: './mod-mir.component.html',
    styleUrls: ['./mod-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModMirComponent implements OnInit, OnDestroy
{
    @Output() panel = new EventEmitter<boolean>();

    selecciones: SeleccionType;
    formMir: FormGroup;
    sentidoIndicador = Object.values(AscDesc);
    sub = new Subscription();
    cargando = false;

    constructor(private seleccionQuery: SeleccionQuery, private fb: RxFormBuilder, private planeacionService: PlaneacionService, private cdr: ChangeDetectorRef)
    {
        ReactiveFormConfig.set({
            'validationMessage': {
                'required': 'Este campo es requerido',
                'numeric': 'El valor debe ser numerico'
            }
        });
    }

    ngOnInit(): void
    {
        this.formMir = this.fb.formGroup(new Mir());
        this.sub.add(this.seleccionQuery.select().subscribe((res) =>
        {
            if (res)
            {
                this.selecciones = res;
            }
        }));
    }

    regMir(): void
    {
        this.cargando = true;
        const { semefVerdeV, semefAmarilloV, semefRojoV, meta, lineaBaseAno, ...resto } = this.formMir.value;
        const datos: TRegMir =
            {
                _id: idPlaneacion(),
                semefVerdeV: parseFloat(String(semefVerdeV / 100)),
                semefAmarilloV: parseFloat(String(semefAmarilloV / 100)),
                semefRojoV: parseFloat(String(semefRojoV / 100)),
                meta: parseFloat(meta),
                lineaBaseAno: parseInt(lineaBaseAno, 10),
                ...resto
            };

        this.planeacionService.regMir(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            this.cdr.detectChanges();
            // Object.keys(this.formMir.controls).forEach((ctrl) =>
            // {
            //     const ctrlNombre = this.formMir.get(ctrl);
            //     if (ctrl !== 'centroGestor')
            //     {
            //         ctrlNombre.reset();
            //     }
            // });
        })).subscribe();
    }

    cerrar(): void
    {
        this.panel.emit(false);
    }

    trackByFn(index: number, elemento: any): number | string
    {
        return index || elemento;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
