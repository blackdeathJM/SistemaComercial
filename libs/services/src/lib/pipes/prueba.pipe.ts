import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {IDepto} from '@sistema-comercial/modelos/depto.interface';

@Injectable()
export class PruebaPipe implements PipeTransform
{
    transform(value: IDepto, metadata: ArgumentMetadata): IDepto
    {
        value.nombre = value.nombre + ' Utilizando pipe';
        return value;
    }
}
