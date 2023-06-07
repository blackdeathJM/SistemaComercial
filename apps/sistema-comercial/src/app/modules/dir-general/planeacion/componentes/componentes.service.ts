import {Injectable} from '@angular/core';
import {TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";

@Injectable({
    providedIn: 'root'
})
export class ComponentesService
{
    constructor()
    {
    }

    static formula(ids: string[], tipoForm: TiposFormulario): string
    {
        if (ids.length === 1 && tipoForm === TiposFormulario.COMUN)
        {
            return ids[0];
        }
        if (ids.length === 2 && tipoForm === TiposFormulario.COMUN)
        {
            return '(' + ids[0] + '/' + ids[1] + ')' + '*100';
        }

        if (ids.length > 2 && tipoForm === TiposFormulario.COMUN)
        {
            return '(' + ids.join('+') + ')';
        }

        if (ids.length === 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            return ids[0] + '/' + 'trimAnt';
        }

        if (ids.length > 1 && tipoForm === TiposFormulario.PERIODO_ANT)
        {
            return '(' + ids.join('+') + ')' + '/sumTrim'
        }
        return '';
    }
}
