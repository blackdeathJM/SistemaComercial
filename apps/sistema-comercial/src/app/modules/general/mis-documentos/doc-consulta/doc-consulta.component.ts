import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MisDocumentosService} from '@s-general/store/mis-documentos.service';

@Component({
    selector: 'app-doc-consulta',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCheckboxModule],
    templateUrl: './doc-consulta.component.html',
    styleUrls: ['./doc-consulta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocConsultaComponent implements OnInit
{
    formBuscarFechas = new FormGroup({fechaInicio: new FormControl(), fechaFin: new FormControl()});
    txtBuscar = new FormControl();
    chkBuscar = new FormControl(false);

    constructor(private misDocumentosService: MisDocumentosService)
    {
    }

    ngOnInit(): void
    {
        this.txtBuscar.valueChanges.pipe(debounceTime(1000), distinctUntilChanged(), switchMap(consulta =>
            this.misDocumentosService.docsBuscarGral(this.chkBuscar.value, consulta))).subscribe();
    }

    proceso(proceso: 'pendiente' | 'terminado'): void
    {
        this.misDocumentosService.docUsuarioProceso(proceso, this.chkBuscar.value).subscribe();
    }

    consultaFechasUsuario(): void
    {
        const {fechaInicio, fechaFin} = this.formBuscarFechas.value;
        if (!fechaInicio || !fechaFin)
        {
            return;
        }
        const esEnviadoPor = this.chkBuscar.value;
        const fechaInicial = GeneralService.convertirUnix(fechaInicio.c, fechaInicio.ts);
        const fechaFinal = GeneralService.convertirUnix(fechaFin.c, fechaFin.ts);
        this.misDocumentosService.consultaFechas(fechaInicial, fechaFinal, esEnviadoPor).subscribe();
    }
}
