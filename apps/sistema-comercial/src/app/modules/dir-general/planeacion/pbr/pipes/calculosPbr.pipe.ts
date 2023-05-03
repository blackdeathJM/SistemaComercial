import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: true, name: 'calculoPbr'})
export class CalculosPipePbr implements PipeTransform
{
    transform(value: [number], campo: boolean): number
    {
        const sumatoria = value.reduce((previousValue, currentValue) => previousValue + currentValue);

        if (!campo)
        {
            return sumatoria === 0 ? sumatoria : value.find(ultimoValor => ultimoValor !== 0);
        }
        return sumatoria;
    }
}
