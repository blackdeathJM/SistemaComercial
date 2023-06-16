import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from "@angular-ru/cdk/utils";
import {TipoValores} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
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
            case TipoValores.NUMERO:
                mostrarValor = Math.round(Number(mostrarValor)).toString();
                break;
            case TipoValores.PORCENTAJE:
                mostrarValor = new PercentPipe('en-US').transform(parseFloat(mostrarValor) / 100, '1.2-2');
                // mostrarValor = Number(mostrarValor).toFixed(2).toString() + '%';
                break;
            case TipoValores.DECIMAL:
                mostrarValor = new DecimalPipe('en-US').transform(mostrarValor, '1.2-2');
                break;
            case TipoValores.PESOS:
                mostrarValor = new CurrencyPipe('en-US').transform(mostrarValor, 'USD', 'symbol', '1.2-2');
                break;
            case TipoValores.MT3:
                mostrarValor = new DecimalPipe('en-us').transform(mostrarValor, '1.2-2') + 'Mt3';
                break;
            case TipoValores.LTS:
                mostrarValor = new DecimalPipe('en-us').transform(mostrarValor, '1.2-2') + 'Lts';
                break;
        }
        return mostrarValor;
    }
}
