import {Injectable} from '@angular/core';
import {IFormComun, TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {IDatosTablaComun} from "#/libs/models/src/lib/tabla.interface";

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

    static objFormula(pbr: IPbrCuestionario[], ids: string[]): object[]
    {
        const trim1 = {};
        const trim2 = {};
        const trim3 = {};
        const trim4 = {};
        for (const ele of pbr)
        {
            if (ids.includes(ele.idIndicador))
            {
                trim1[ele.idIndicador] = ele.trim1;
                trim2[ele.idIndicador] = ele.trim2;
                trim3[ele.idIndicador] = ele.trim3;
                trim4[ele.idIndicador] = ele.trim4;
            }
        }
        return [trim1, trim2, trim3, trim4];
    }

    static construirDatosTabla(pbr: IPbrCuestionario[], form: IFormComun[]): IDatosTablaComun[]
    {
        const tabla: IDatosTablaComun[] = [];
        pbr.forEach(Element =>
        {
            form.forEach(v =>
            {
                if (Element.idIndicador === v.idIndicador)
                {
                    tabla.push({
                        idIndicador: Element.idIndicador,
                    });
                }
            });
        });
        return [];
    }
}
