import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'convertirTimestamUnix'
})
export class ConvertirTimestamUnixPipe implements PipeTransform
{

    transform(value: number): any
    {
        return moment.unix(value);
    }
}
