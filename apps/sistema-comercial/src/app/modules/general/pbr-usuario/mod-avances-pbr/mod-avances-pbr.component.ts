import {ChangeDetectionStrategy, Component, effect, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AvancesPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/Pbr';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {PlaneacionService} from '@s-dir-general/store/planeacion.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TRegAvancesPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {finalize} from 'rxjs';
import {isNotNil} from "@angular-ru/cdk/utils";
import {TipoOperaciones} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {ToastrService} from "ngx-toastr";

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
    tipoOperacion: TipoOperaciones;

    constructor(private fb: RxFormBuilder, private planeacionQuery: PlaneacionQuery, public mdr: MatDialogRef<ModAvancesPbrComponent>, private planeacionService: PlaneacionService,
                @Inject(MAT_DIALOG_DATA) private habilitarCtrl: boolean, private toastrService: ToastrService)
    {
        effect(() =>
        {
            const pbr = this.planeacionQuery.cuestionarioPbr();
            if (isNotNil(pbr))
            {
                this.formAvances.patchValue(pbr);
                const valoresMeses: number[] = [];
                Object.keys(this.formAvances.controls).forEach(x =>
                {
                    const ctrlNombre = this.formAvances.get(x);
                    const ctrlValor = this.formAvances.get(x).value;
                    if (habilitarCtrl)
                    {
                        return;
                    }

                    if (ctrlValor !== 0)
                    {
                        valoresMeses.push(ctrlValor);
                        ctrlNombre.disable();
                    }
                });

                if (pbr.tipoOperacion === TipoOperaciones.unicoValor)
                {
                    this.tipoOperacion = pbr.tipoOperacion;
                    if (habilitarCtrl)
                    {
                        return;
                    }

                    if (valoresMeses.length > 1)
                    {
                        this.formAvances.disable();
                    }
                }
            }
        })
    }

    regAvancePbr(): void
    {
        const pbr = this.planeacionQuery.cuestionarioPbr();
        const planeacion = this.planeacionQuery.getActive();
        this.cargando = true;
        //Se comentó esta línea porque el formulario reactivo no obtiene los valores cuando está deshabilitado y recordar que se deshabilita cuando los valores son diferentes de 0
        // const {enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre} = this.formAvances.value;
        const enero = this.formAvances.get('enero').value;
        const febrero = this.formAvances.get('febrero').value;
        const marzo = this.formAvances.get('marzo').value;
        const abril = this.formAvances.get('abril').value;
        const mayo = this.formAvances.get('mayo').value;
        const junio = this.formAvances.get('junio').value;
        const julio = this.formAvances.get('julio').value;
        const agosto = this.formAvances.get('agosto').value;
        const septiembre = this.formAvances.get('septiembre').value;
        const octubre = this.formAvances.get('octubre').value;
        const noviembre = this.formAvances.get('noviembre').value;
        const diciembre = this.formAvances.get('diciembre').value;
        const meses: number[] = [enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre];
        const mesesConValor: number[] = meses.filter(valorMes => valorMes !== 0);

        if (TipoOperaciones.unicoValor === this.tipoOperacion)
        {
            if (mesesConValor.length > 1)
            {
                this.toastrService.warning(`Solo se puede tener un valor, porque en el tipo de calculo esta establecida como unico valor, no se puede continuar`, 'Registro de avandces');
                return;
            }
        }

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
