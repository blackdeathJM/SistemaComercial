import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from "@angular-ru/cdk/utils";
import {TipoValoresTrim} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {CurrencyPipe, DecimalPipe, PercentPipe} from "@angular/common";

@Pipe({
    name: 'multiplesFormatos',
    standalone: true,
})
export class MultiplesFormatosPipe implements PipeTransform
{
    transform(valor: string, tipoDeDato: string): string
    {
        let mostrarValor = valor;

        if (isNil(tipoDeDato))
        {
            return mostrarValor;
        }

        switch (tipoDeDato)
        {
            case TipoValoresTrim.NUMERO:
                mostrarValor = Math.round(Number(mostrarValor)).toString();
                break;
            case TipoValoresTrim.PORCENTAJE:
                mostrarValor = new PercentPipe('en-US').transform(+mostrarValor / 100, '1.0-2');
                mostrarValor += ' %';
                // mostrarValor = Number(mostrarValor).toFixed(2).toString() + '%';
                break;
            case TipoValoresTrim.DECIMAL:
                mostrarValor = new DecimalPipe('en-US').transform(mostrarValor, '1.0-2');
                break;
            case TipoValoresTrim.PESOS:
                mostrarValor = new CurrencyPipe('en-US').transform(mostrarValor, 'USD', 'symbol', '1.0-2');
                break;
            case TipoValoresTrim.MT3:
                mostrarValor = new DecimalPipe('en-us').transform(mostrarValor, '1.0-2') + ' Mt3';
                break;
            case TipoValoresTrim.LTS:
                mostrarValor = new DecimalPipe('en-us').transform(mostrarValor, '1.0-2') + ' Lts';
                break;
        }
        return mostrarValor;
    }
}
