import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NgxToastService
{
    constructor(private toastr: ToastrService)
    {
    }

    satisfactorioToast(msj: string, titulo: string, config?: Partial<IndividualConfig>): void
    {
        this.toastr.success(msj, titulo, config);
    }

    errorToast(msj: string, titulo: string, config?: Partial<IndividualConfig>): void
    {
        this.toastr.error(msj, titulo, config);
    }

    alertaToast(msj: string, titulo: string, config?: Partial<IndividualConfig>): void
    {
        this.toastr.warning(msj, titulo, config);
    }

    infoToast(msj: string, titulo: string, config?: Partial<IndividualConfig>): void
    {
        this.toastr.info(msj, titulo, config);
    }
}
