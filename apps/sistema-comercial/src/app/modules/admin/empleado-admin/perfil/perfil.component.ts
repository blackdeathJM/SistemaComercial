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
import {StateAuth} from '@s-core/auth/store/auth.store';
import {isNotNil} from '@angular-ru/cdk/utils';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {NgxToastService} from '@s-services/ngx-toast.service';

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports:
        [
            CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,
            MaterialFileInputModule, MatDividerModule, NgOptimizedImage, ReactiveFormsModule, RxReactiveFormsModule
        ],
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit
{
    srcImagen: string = 'assets/images/avatars/avatarDefault.jpg';
    img: File = null;
    usuario: IDatosSesion;
    deshabilitar = false;
    formCambioContrasena = this.fb.group({
        txtContrasena: ['', RxwebValidators.required({message: 'La contrasena es requerida'})],
        txtConfContrasena: ['', [RxwebValidators.required({message: 'Confirma la contrasena'}),
            RxwebValidators.compare({fieldName: 'txtContrasena', message: 'Las contrasenas no son iguales'})]]
    });

    constructor(private fb: RxFormBuilder, private actualizarAvatarGql: ActualizarAvatarGQL, private actualizarContrasena: ActualizarContrasenaAdminGQL
        , private generalService: GeneralService, private stateAuth: StateAuth, private empleadoService: EmpleadoService, private ngxToast: NgxToastService)
    {
    }

    ngOnInit(): void
    {
        if (isNotNil(this.stateAuth.snapshot.avatar))
        {
            this.srcImagen = this.stateAuth.snapshot.avatar;
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
        this.deshabilitar = true;
        try
        {
            if (this.stateAuth.snapshot.avatar)
            {
                await this.generalService.eliminarDocFirabase(this.stateAuth.snapshot.avatar);
            }
            const ruta = GeneralService.rutaGuardar('perfil', this.img.name, 'empleado');
            const imagen = await this.generalService.subirFirebase(this.img, ruta);
            const url = await getDownloadURL(imagen.ref);

            this.empleadoService.actualizarAvatar(this.stateAuth.snapshot._id, url).pipe(finalize(() => this.deshabilitar = false)).subscribe();
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
                fecha: GeneralService.fechaHoraActual(),
                usuario: this.stateAuth.snapshot._id,
                valorActual: null,
                valorAnterior: null
            };
        this.empleadoService.actualizarContrasena(this.stateAuth.snapshot._id, txtContrasena, modificadoPor).pipe(finalize(() => this.formCambioContrasena.enable())).subscribe();
    }
}
