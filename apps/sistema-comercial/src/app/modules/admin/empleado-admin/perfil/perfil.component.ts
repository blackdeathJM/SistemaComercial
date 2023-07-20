import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from '@rxweb/reactive-form-validators';
import {ActualizarAvatarGQL, ActualizarContrasenaAdminGQL} from '#/libs/datos/src';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {GeneralService} from '@s-services/general.service';
import {finalize} from 'rxjs';
import {getDownloadURL} from '@angular/fire/storage';
import {IDatosSesion} from '#/libs/models/src/lib/admin/empleado/auth/auth.interface';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {AuthQuery} from '@s-core/auth/store/auth.query';
import {isNotNil} from "@angular-ru/cdk/utils";
import {ImgDefectoPipe} from "#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe";

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports:
        [
            CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,
            MaterialFileInputModule, MatDividerModule, NgOptimizedImage, ReactiveFormsModule, RxReactiveFormsModule, ImgDefectoPipe
        ],
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit
{
    srcImagen: string = null;
    img: File = null;
    usuarioSesionActual: IDatosSesion = null;
    deshabilitar = false;
    formCambioContrasena = this.fb.group({
        txtContrasena: ['', RxwebValidators.required({message: 'La contrasena es requerida'})],
        txtConfContrasena: ['', [RxwebValidators.required({message: 'Confirma la contrasena'}),
            RxwebValidators.compare({fieldName: 'txtContrasena', message: 'Las contrasenas no son iguales'})]]
    });

    constructor(private fb: RxFormBuilder,
                private generalService: GeneralService, private authQuery: AuthQuery, private empleadoService: EmpleadoService, private ngxToast: NgxToastService)
    {
    }

    ngOnInit(): void
    {
        this.usuarioSesionActual = this.authQuery.getValue();
        // if (isNotNil(this.stateAuth.snapshot.avatar))
        // {
        //     this.srcImagen = this.stateAuth.snapshot.avatar;
        // }

        if (isNotNil(this.usuarioSesionActual.avatar))
        {
            this.srcImagen = this.usuarioSesionActual.avatar;
        }
    }

    cambioImagen(e: Event): void
    {
        const leer = new FileReader();
        const [file] = e.target['files'];
        leer.readAsDataURL(file);
        leer.onload = (): string => this.srcImagen = leer.result as string;
        this.img = e.target['files'][0];
    }

    async cambiarImagen(): Promise<void>
    {
        if (!this.img)
        {
            this.ngxToast.alertaToast('Necesitas seleccionar una imagen para poder mostrar', 'Selecciona imagen');
            return;
        }
        this.deshabilitar = true;
        try
        {
            if (this.usuarioSesionActual.avatar)
            {
                await this.generalService.eliminarDocFirabase(this.usuarioSesionActual.avatar);
            }
            const ruta = GeneralService.rutaGuardar('perfil', this.img.name, 'empleado');
            const imagen = await this.generalService.subirFirebase(this.img, ruta);
            const url = await getDownloadURL(imagen.ref);

            this.empleadoService.actualizarAvatar(this.usuarioSesionActual._id, url).pipe(finalize(() => this.deshabilitar = false)).subscribe();
        } catch (e)
        {
            this.ngxToast.errorToast('Ocurrio un error al tratar de cambiar tu avatar', 'Error cambio de avatar');
            this.deshabilitar = false;
        }
    }

    cambiarContrasena(): void
    {
        this.formCambioContrasena.disable();
        const {txtContrasena} = this.formCambioContrasena.value;
        const modificadoPor: IModificado =
            {
                accion: 'Cambio de contrasena',
                fecha: GeneralService.fechaHoraActualUnix(),
                usuario: this.usuarioSesionActual._id,
                valorActual: null,
                valorAnterior: null
            };
        this.empleadoService.actualizarContrasena(this.usuarioSesionActual._id, txtContrasena, modificadoPor).pipe(finalize(() => this.formCambioContrasena.enable())).subscribe();
    }
}
