import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthQuery} from "@s-core/auth/store/auth.query";
import {ToastrService} from "ngx-toastr";

export const planeacionGuard: CanActivateFn = () =>
{
    let usuario = inject(AuthQuery);
    const toast = inject(ToastrService);
    if (usuario.getValue()._id === '63862985c8a23337dbe6ed31' || usuario.getValue().auth.usuario === 'administrador')
    {
        return true;
    } else
    {
        toast.warning('No tienes permiso para acceder a esta ruta', 'Permiso denegado');
        return false
    }
};
