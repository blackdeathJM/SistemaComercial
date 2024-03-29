import {AfterContentInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {finalize} from 'rxjs';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {MisDocumentosService} from '@s-general/store/mis-documentos.service';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {MisDocsQuery} from '@s-general/store/mis-docs.query';

@Component({
    selector: 'app-mod-reasignacion',
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            RegistrosComponent,
            MatFormFieldModule,
            MatDatepickerModule,
            MatInputModule,
            MatSelectModule,
            ReactiveFormsModule
        ],
    providers: [MatDatepickerModule],
    templateUrl: './mod-reasignacion.component.html',
    styleUrls: ['./mod-reasignacion.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModReasignacionComponent implements OnInit, AfterContentInit
{
    formSelect: FormControl = new FormControl([], RxwebValidators.required({message: 'Es necesario que selecciones por lo menos un usuario'}));
    cargando: boolean = false;

    constructor(public dRef: MatDialogRef<ModReasignacionComponent>, private misDocumentosService: MisDocumentosService, private ngxToast: NgxToastService, public empleadoQuery: EmpleadoQuery,
                private empleadoService: EmpleadoService, private misDocsQuery: MisDocsQuery)
    {
    }

    ngOnInit(): void
    {
        // Asignamos los empleados que ya se les haya asignado algún documento para establecer de nuevo la asignacion
        this.empleadoService.empleadosConSesion().subscribe();
    }

    ngAfterContentInit(): void
    {
        if (this.misDocsQuery.getActive())
        {
            // this.formSelect.setValue(this.entityMisDocumentos.snapshot.documento.usuarios);
            this.formSelect.setValue(this.misDocsQuery.getActive().usuarios);
        }
    }

    cambiarUsuarios(): void
    {
        if (this.formSelect.value.length === 0)
        {
            this.ngxToast.alertaToast('Debes tener seleccionado por lo menos un usuario', 'Seleccion de usuarios');
            return;
        }
        this.cargando = true;
        this.misDocumentosService.reasignacionUsuarios(this.misDocsQuery.getActive()._id, this.formSelect.value).pipe(finalize(() =>
        {
            this.cargando = false;
            this.dRef.close();
        })).subscribe();
    }
}
