import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from "@angular-ru/cdk/utils";
import {TipoValores} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {CurrencyPipe, DatePipe, DecimalPipe, PercentPipe} from "@angular/common";

@Pipe({
    name: 'multiplesFormatos',
    standalone: true,
})
export class MultiplesFormatosPipe implements PipeTransform
{
    transform(valor: string, formato: string): string
    {
        let mostrarValor = valor;

        if (isNil(formato))
        {
            return mostrarValor;
        }

        switch (formato)
        {
            case TipoValores.FECHA:
                mostrarValor = new DatePipe('MX').transform(mostrarValor, 'DDMMYYYY');
                break;
            case TipoValores.NUMERO:
                mostrarValor = Math.round(Number(mostrarValor)).toString();
                break;
            case TipoValores.PORCENTAJE:
                mostrarValor = new PercentPipe('en-US').transform(mostrarValor, '2.2-2');
                break;
            case TipoValores.DECIMAL:
                mostrarValor = new DecimalPipe('en-US').transform(mostrarValor, '1.2-2');
                break;
            case TipoValores.PESOS:
                mostrarValor = new CurrencyPipe('en-US').transform(mostrarValor, 'USD', 'symbol', '1.2-2');
                break;
        }
        return mostrarValor;
    }
}
