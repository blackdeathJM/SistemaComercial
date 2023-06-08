import {Pipe, PipeTransform} from '@angular/core';
import {ITabla} from '#/libs/models/src/lib/tabla.interface';
import {CurrencyPipe, DatePipe, DecimalPipe, PercentPipe} from '@angular/common';
import {TipoValores} from '#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({name: 'valorColumnaPipe', standalone: true})
export class ValorColumnaPipe implements PipeTransform
{
    transform(fila: string, formato: string): string
    {
        //Alacenamos el valor que se mostrara en la celda de la tabla
        // La fila trae todos los valores
        let mostrarValor = fila;

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
                mostrarValor = new PercentPipe('MX').transform(mostrarValor, '2.1-2');
                break;
            case TipoValores.DECIMAL:
                mostrarValor = new DecimalPipe('MX').transform(mostrarValor, '2.1-2');
                break;
            case TipoValores.PESOS:
                mostrarValor = new CurrencyPipe('MX').transform(mostrarValor, 'MEX');
                break;
        }
        return mostrarValor;
    }
}
