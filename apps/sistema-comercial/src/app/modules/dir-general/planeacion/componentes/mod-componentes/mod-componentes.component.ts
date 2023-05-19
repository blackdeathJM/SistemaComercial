import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRadioModule} from "@angular/material/radio";
import {FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TRegComp} from "@s-dir-general/store/planeacion.interface";
import {RegistrosComponent} from "#/apps/sistema-comercial/src/shared/registros/registros.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'app-mod-componentes',
    standalone: true,
    imports: [CommonModule, MatRadioModule, FormsModule, MatInputModule, RegistrosComponent, MatGridListModule, MatTooltipModule, MatButtonModule,
        MatIconModule, ReactiveFormsModule, MatDividerModule, MatSelectModule],
    templateUrl: './mod-componentes.component.html',
    styleUrls: ['./mod-componentes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModComponentesComponent
{
    cabeceras: object[] = [];
    titulos: string[] = [];
    formComponente = this.fb.group({
        titulo: ['', [Validators.required, Validators.minLength(3)]],
        valor: this.fb.array([], [Validators.required])
    });
    ctrlValor: FormControl = new FormControl<string>('', Validators.required);

    constructor(private planeacionQuery: PlaneacionQuery, @Inject(MAT_DIALOG_DATA) private data: TRegComp, private fb: FormBuilder)
    {
    }

    registro(): void
    {

    }

    get valor()
    {
        return this.formComponente.get('valor') as FormArray;
    }

    removerValor(index: number): void
    {
        this.valor.removeAt(index);
    }

    agTitulo(): void
    {
        // this.cabeceras.push();
        if (this.ctrlValor.invalid) return;
        const nvoValor = this.ctrlValor.value;

        this.valor.push(this.fb.control(nvoValor, Validators.required));
        this.ctrlValor.reset();
    }

    agregarAlArreglo():void
    {
        this.cabeceras.push(this.formComponente.value);
        this.titulos.push(this.formComponente.get('titulo').value);
        console.log(this.cabeceras);
    }
}
