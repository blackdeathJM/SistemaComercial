import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { RegistrosComponent } from '@s-shared/registros/registros.component';
import { NumericValueType, RxFormBuilder, RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxToastService } from '@s-services/ngx-toast.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface ICalculo
{
    semVerde: number;
    semAmarillo: number;
    semRojo: number;
}

@Component({
    selector: 'app-mod-avances-mir',
    standalone: true,
    imports: [CommonModule, MatInputModule, RegistrosComponent, ReactiveFormsModule, RxReactiveFormsModule, MatButtonModule, MatIconModule],
    providers: [],
    templateUrl: './mod-avances-mir.component.html',
    styleUrls: ['./mod-avances-mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModAvancesMirComponent implements OnInit
{
    formModAvances: FormGroup;
    calculoLocal = 'calculoSem';
    cargando = false;
    valoreReqCalculo = [0, [RxwebValidators.required({ message: 'Este campo es requerido' }), RxwebValidators.numeric({
        acceptValue: NumericValueType.PositiveNumber, allowDecimal: true, message: 'El valor debe ser numerico'
    })]];
    formCalculo: FormGroup = this.fb.group({
        semVerde: this.valoreReqCalculo,
        semAmarillo: this.valoreReqCalculo,
        semRojo: this.valoreReqCalculo
    });

    constructor(private fb: RxFormBuilder, private ngxToast: NgxToastService, public mdr: MatDialogRef<ModAvancesMirComponent>)
    {
    }

    ngOnInit(): void
    {
        // this.formModAvances = this.fb.formGroup(new MirActAvances());
        // this.formModAvances.patchValue(this.mirQuery.getActive());

        const valoresCalculo = localStorage.getItem(this.calculoLocal);
        if (valoresCalculo)
        {
            this.formCalculo.patchValue(JSON.parse(valoresCalculo));
        }
    }

    guardarValoresSem(): void
    {
        const guardarCalculo = JSON.stringify(this.calculo());
        localStorage.setItem(this.calculoLocal, guardarCalculo);
        this.ngxToast.infoToast('Se han establecido valores para el calculo de semaforizacion', 'Calculos establecidos');
    }

    guardarAvances(): void
    {
        this.cargando = true;
        const meta = parseFloat(this.formModAvances.get('meta').value);
        // const input: TMirsActAvances =
        //     {
        //         _id: this.mirQuery.getActive()._id,
        //         lineaBaseAno: parseFloat(this.formModAvances.get('lineaBaseAno').value),
        //         lineaBaseValor: this.formModAvances.get('lineaBaseValor').value,
        //         meta,
        //         semefVerde: (meta * this.calculo().semVerde) / 100,
        //         semefAmarillo: (meta * this.calculo().semAmarillo) / 100,
        //         semefRojo: (meta * this.calculo().semRojo) / 100
        //     };
        this.formModAvances.disable();
        this.formCalculo.disable();
        // this.mirService.mirsActAvances(input).pipe(finalize(() =>
        // {
        //     this.formModAvances.enable();
        //     this.formCalculo.enable();
        //     this.cargando = false;
        //     this.mdr.close();
        // })).subscribe();
    }

    private calculo(): ICalculo
    {
        return {
            semVerde: parseFloat(this.formCalculo.get('semVerde').value),
            semAmarillo: parseFloat(this.formCalculo.get('semAmarillo').value),
            semRojo: parseFloat(this.formCalculo.get('semRojo').value)
        };
    }
}
