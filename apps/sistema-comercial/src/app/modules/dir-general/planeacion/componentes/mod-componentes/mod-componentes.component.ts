import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRadioModule} from "@angular/material/radio";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TRegComp} from "@s-dir-general/store/planeacion.interface";
import {RegistrosComponent} from "#/apps/sistema-comercial/src/shared/registros/registros.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {Componente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/Componente";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";

@Component({
    selector: 'app-mod-componentes',
    standalone: true,
    imports: [CommonModule, MatRadioModule, FormsModule, MatInputModule, RegistrosComponent, MatGridListModule, MatTooltipModule, MatButtonModule,
        MatIconModule, RxReactiveFormsModule, ReactiveFormsModule, MatDividerModule, MatSelectModule],
    templateUrl: './mod-componentes.component.html',
    styleUrls: ['./mod-componentes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModComponentesComponent
{
    cabecera: string[] = [];
    valores: string[] = [];
    meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    formComponente: FormGroup = this.fb.formGroup(new Componente());
    cuestionarioPbr = this.planeacionQuery.compCuestionarioPbr;
    pbrSeleccionado = this.planeacionQuery.cuestionarioPbr;
    mostrarMes = false;
    mostrarTrim = false;
    tipoValor: number = 0;

    constructor(private planeacionQuery: PlaneacionQuery, @Inject(MAT_DIALOG_DATA) private data: TRegComp, private fb: RxFormBuilder)
    {
    }

    agregarElemCabecera(): void
    {
        this.cabecera.push(this.formComponente.get('cabecera').value);
        this.valores.push(this.formComponente.get('valor').value)
        this.formComponente.reset();
    }

    eliminarElemCabecera(): void
    {
        if (this.cabecera.length > 0)
        {
            this.cabecera.pop();
        }
    }

    registro(): void
    {
        console.log(this.formComponente.value);
    }

    cambioSeleccionPbr(e: IPbrCuestionario): void
    {
        this.planeacionQuery.cuestionarioPbr.set(e);
        if (this.tipoValor === 0)
        {
            const idVariable = this.pbrSeleccionado().idIndicador;
            this.formComponente.get('valor').setValue(idVariable);
        }
        if (this.tipoValor === 1)
        {
            const descripcion = this.pbrSeleccionado().dato;
            this.formComponente.get('valor').setValue(descripcion);
        }
    }

    cambioTipoValor(e: number): void
    {
        this.mostrarMes = e === 2;
        this.mostrarTrim = e === 3;
        this.tipoValor = e;
    }

    cambioMes(e: string): void
    {
        // Buscamos el valor en el pbr seleccionado en este caso traemos el valor del mes que se haya seleccionado;
        const valorMes = this.pbrSeleccionado()[e.toLowerCase()];
        this.formComponente.get('valor').setValue(valorMes);
    }

    cambioTrim(e: string): void
    {

        const valorTrim = this.pbrSeleccionado()[e.toLowerCase()];
        this.formComponente.get('valor').setValue(valorTrim);
    }
}
