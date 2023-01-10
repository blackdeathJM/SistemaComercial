import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'paginacion',
})
export class PaginacionPipe implements PipeTransform
{
    transform(array: any[], pageSize: number, pageNumber: number): any[]
    {
        if (!array.length)
        {
            return [];
        }
        // if (pageSize === 'all')
        // {
        //     return array;
        // }
        pageSize = pageSize || 5;
        pageNumber = pageNumber || 1;
        --pageNumber;
        return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    }
}
