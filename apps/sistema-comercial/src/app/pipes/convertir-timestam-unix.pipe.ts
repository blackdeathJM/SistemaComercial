import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, DateTimeFormatOptions} from 'luxon';

@Pipe({
    standalone: true,
    name: 'convertirTimestamUnix'
})
export class ConvertirTimestamUnixPipe implements PipeTransform
{

    transform(value: number, args: boolean = true): string
    {
        if (value > 0)
        {
            const fechaCompleta: DateTimeFormatOptions =
                {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                };
            if (args)
            {
                Object.assign(fechaCompleta, {hour: '2-digit', minute: '2-digit'});
            }
            return DateTime.fromSeconds(value, {zone: 'America/Mexico_City'})
                .toLocaleString(fechaCompleta);
        }
    }
}
