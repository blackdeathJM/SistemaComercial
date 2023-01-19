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
                if (columna.format !== undefined)
                {
                    mostrarValor = new DatePipe('mx').transform(mostrarValor, columna.format);
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
    }
}
