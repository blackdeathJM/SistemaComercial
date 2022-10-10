import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'convertirTimestamUnix'
})
export class ConvertirTimestamUnixPipe implements PipeTransform
{

    transform(value: number): string
    {
        return moment.unix(value).format('DD/MM/YYYY');
    }
}
