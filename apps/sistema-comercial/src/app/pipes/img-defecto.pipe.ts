import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({standalone: true, name: 'imgDefecto'})
export class ImgDefectoPipe implements PipeTransform
{
    transform(value: string): string
    {
        console.log('=====', value);
        if (isNil(value))
        {
            return 'assets/images/avatars/no-img.jpeg';
        }
        return value;
    }
}
