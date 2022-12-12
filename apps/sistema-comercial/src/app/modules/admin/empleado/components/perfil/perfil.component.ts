import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatDividerModule} from '@angular/material/divider';
import {STATE_DATOS_SESION} from '@s-core/auth/auth.state';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule, RxwebValidators} from '@rxweb/reactive-form-validators';
import {ActualizarAvatarGQL, ActualizarContrasenaAdminGQL} from '#/libs/datos/src';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {tap} from 'rxjs';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {getDownloadURL} from "@angular/fire/storage";

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
    formCambioContrasena = this.fb.group({
        txtContrasena: ['', RxwebValidators.required({message: 'La contrasena es requerida'})],
        txtConfContrasena: ['', [RxwebValidators.required({message: 'Confirma la contrasena'}),
            RxwebValidators.compare({fieldName: 'txtContrasena', message: 'Las contrasenas no son iguales'})]]
    });

    constructor(private fb: RxFormBuilder, private actualizarAvatarGql: ActualizarAvatarGQL, private actualizarContrasena: ActualizarContrasenaAdminGQL,
                private ngxToastService: NgxToastService, private generalService: GeneralService)
    {
    }

    ngOnInit(): void
    {
        if (STATE_DATOS_SESION().avatar)
        {
            this.srcImagen = STATE_DATOS_SESION().avatar;
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
        if (STATE_DATOS_SESION().avatar)
        {
            await this.generalService.eliminarDocFirabase(STATE_DATOS_SESION().avatar);
        }
        const url = GeneralService.rutaGuardar('perfil', this.img.name, 'empleado');
        const imagen = await this.generalService.subirFirebase(this.img, url);
        const urlImg = await getDownloadURL(imagen.ref);
    }

    cambiarContrasena(): void
    {
        this.formCambioContrasena.disable();
        const {contrasena} = this.formCambioContrasena.value;
        const modificadoPor: IModificado =
            {
                accion: 'Cambio de contrasena',
                fecha: GeneralService.fechaHoraActual(),
                usuario: STATE_DATOS_SESION()._id,
                valorActual: null,
                valorAnterior: null
            };
        this.actualizarContrasena.mutate({datos: {_id: STATE_DATOS_SESION()._id, contrasena}, modificadoPor}).pipe(tap((res) =>
        {
            if (res.data)
            {
                this.ngxToastService.satisfactorioToast('La contrasena se ha cambiado con exito', 'Cambio de contrasena');
                this.formCambioContrasena.enable();
            }
        })).subscribe();
    }
}
