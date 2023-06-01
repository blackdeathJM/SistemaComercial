import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrosComponent} from "@s-shared/registros/registros.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from "@rxweb/reactive-form-validators";
import {MatInputModule} from "@angular/material/input";

@Component({
    selector: 'app-mod-componente-tabla',
    standalone: true,
    imports: [CommonModule, RegistrosComponent, RxReactiveFormsModule, ReactiveFormsModule, MatInputModule],
    templateUrl: './mod-componente-tabla.component.html',
    styleUrls: ['./mod-componente-tabla.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModComponenteTablaComponent
{
    formComun: FormGroup = this.fb.group({
        idIndicador: ['Id variable', RxwebValidators.required({message: 'Es requerido este campo'})],
        dato: ['Descripcion', RxwebValidators.required({message: 'Es necesario asignar una descripcion para el DATO'})],
        trim1: ['Trimestre 1', RxwebValidators.required({message: 'Es necesario asignar como deseas mostrar la informacion del trimestre'})],
        valorAdicional: [],
    });

    constructor(private mdr: MatDialogRef<ModComponenteTablaComponent>, private fb: RxFormBuilder, @Inject(MAT_DIALOG_DATA) private data: [boolean, boolean, number])
    {
    }

    regColumnasTabla(): void
    {
        console.log(this.data);
        this.mdr.close('Valor recibido')
    }
}
