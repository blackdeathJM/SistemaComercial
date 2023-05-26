import {Pipe, PipeTransform} from '@angular/core';
import {ITabla} from '@s-shared/components/tabla-mat/tabla-interface';
import {DatePipe} from '@angular/common';

@Pipe({name: 'valorColumnaPipe', standalone: true})
export class ValorColumnaPipe implements PipeTransform
{
    transform(fila: any, columna: ITabla): any
    {
        let mostrarValor = fila[columna.llaveDato];
        switch (columna.tipoDeDato)
        {
            case 'date':
                if (columna.formato !== undefined)
                {
                    mostrarValor = new DatePipe('mx').transform(mostrarValor, columna.formato);
                }
                break;
            case 'object':
                const arregloDeLlaves = columna.llaveDato.split('.');
                let valorActual: any;
                arregloDeLlaves.forEach((llave) =>
                {
                    if (valorActual === undefined)
                    {
                        valorActual = fila[llave];
                        return;
                    }
                    valorActual = valorActual[llave];
                });
                mostrarValor = valorActual;
        }

        return mostrarValor;
    }
}
