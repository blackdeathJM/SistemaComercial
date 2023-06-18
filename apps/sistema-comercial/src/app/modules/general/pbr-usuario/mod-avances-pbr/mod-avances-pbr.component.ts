import {ChangeDetectionStrategy, Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AvancesPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {MatDialogRef} from '@angular/material/dialog';
import {TRegAvancesPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {finalize} from 'rxjs';
import {isNotNil} from "@angular-ru/cdk/utils";

@Component({
    selector: 'app-mod-avances-pbr',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule],
    templateUrl: './mod-avances-pbr.component.html',
    styleUrls: ['./mod-avances-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModAvancesPbrComponent
{
    formAvances: FormGroup = this.fb.formGroup(new AvancesPbr());
    cargando = false;
    constructor(private fb: RxFormBuilder, private planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModAvancesPbrComponent>, private planeacionService: PlaneacionService)
    {
        effect(() =>
        {
            const pbr = this.planeacionQuery.cuestionarioPbr();
            if (isNotNil(pbr))
            {
                this.formAvances.patchValue(pbr);
                Object.keys(this.formAvances.controls).forEach(x =>
                {
                    const ctrlNombre = this.formAvances.get(x);
                    const ctrlValor = this.formAvances.get(x).value;
                    if (ctrlValor !== 0)
                    {
                        ctrlNombre.disable();
                    }
                });
            }
        })
    }

    regAvancePbr(): void
    {
        const pbr = this.planeacionQuery.cuestionarioPbr();
        const planeacion = this.planeacionQuery.getActive();
        this.cargando = true;
        const {enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre} = this.formAvances.value;
        const datos: TRegAvancesPbr =
            {
                _id: planeacion._id,
                centroGestor: pbr.centroGestor,
                tipoOperacion: pbr.tipoOperacion,
                idIndicador: pbr.idIndicador,
                enero: +enero,
                febrero: +febrero,
                marzo: +marzo,
                abril: +abril,
                mayo: +mayo,
                junio: +junio,
                julio: +julio,
                agosto: +agosto,
                septiembre: +septiembre,
                octubre: +octubre,
                noviembre: +noviembre,
                diciembre: +diciembre
            };
        this.formAvances.disable();

        this.planeacionService.regAvancePbr(datos).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formAvances.enable();
            this.mdr.close();
        })).subscribe();
    }
}
