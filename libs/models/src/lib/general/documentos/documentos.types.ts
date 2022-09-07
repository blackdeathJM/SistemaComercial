import {Field, InputType, Int, PickType} from '@nestjs/graphql';
import {DocumentosDto} from './documentos.dto';

@InputType('DocAnoInput')
export class DocAnoDto extends PickType(DocumentosDto, ['ano'], InputType)
{
}
